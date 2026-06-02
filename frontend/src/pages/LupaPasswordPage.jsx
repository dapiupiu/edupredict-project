import React, { useState } from "react";
import BASE_URL from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import logoEdupredict from "../assets/logo-edupredict.png";

function LupaPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
    password_baru: "",
    confirm_password: "",
  });

  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (apiError) setApiError("");
    if (apiSuccess) setApiSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password_baru) {
      newErrors.password_baru = "Password baru tidak boleh kosong";
    } else if (!passwordRegex.test(formData.password_baru)) {
      newErrors.password_baru =
        "Password minimal 8 karakter dan harus mengandung huruf serta angka";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Konfirmasi password tidak boleh kosong";
    } else if (formData.password_baru !== formData.confirm_password) {
      newErrors.confirm_password = "Konfirmasi password tidak cocok";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError("");
      setApiSuccess("");
      return;
    }

    setErrors({});
    setApiError("");
    setApiSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || "Terjadi kesalahan saat mereset password.");
        setApiSuccess("");
        return;
      }

      setApiSuccess(
        data.message ||
          "Password berhasil direset. Silakan login menggunakan password baru.",
      );

      setFormData({
        email: "",
        password_baru: "",
        confirm_password: "",
      });

      setTimeout(() => {
        navigate("/login-guru");
      }, 1800);
    } catch (error) {
      setApiError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setApiSuccess("");
      console.error("Error forgot password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-xl px-6 py-10 sm:px-8 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={logoEdupredict}
              alt="logo"
              className="w-16 h-16 object-contain flex-shrink-0"
            />
          </Link>
          <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold mt-4">
          Reset Password
        </h1>

        <p className="text-base sm:text-lg mt-4 opacity-75">
          Masukkan email terdaftar dan buat password baru untuk akun guru.
        </p>

        {apiError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            <p className="text-sm">{apiError}</p>
          </div>
        )}

        {apiSuccess && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-center gap-2">
            <i className="ri-check-line"></i>
            <p className="text-sm">{apiSuccess}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-8">
            <label className="text-base sm:text-lg font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className={`w-full border-2 ${
                errors.email ? "border-red-500" : "border-gray-100"
              } shadow-md rounded-xl p-4 mt-1 bg-transparent outline-none transition-colors`}
              placeholder="masukkan email anda"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mt-5">
            <label className="text-base sm:text-lg font-medium">
              Password Baru
            </label>

            <div className="relative">
              <input
                type={showPasswordBaru ? "text" : "password"}
                value={formData.password_baru}
                onChange={handleInputChange("password_baru")}
                className={`w-full border-2 ${
                  errors.password_baru ? "border-red-500" : "border-gray-100"
                } shadow-md rounded-xl p-4 mt-1 bg-transparent outline-none transition-colors pr-12`}
                placeholder="minimal 8 karakter, huruf dan angka"
              />

              <button
                type="button"
                onClick={() => setShowPasswordBaru(!showPasswordBaru)}
                className="absolute right-4 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500"
              >
                <i
                  className={
                    showPasswordBaru ? "ri-eye-off-line" : "ri-eye-line"
                  }
                ></i>
              </button>
            </div>

            {errors.password_baru && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password_baru}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label className="text-base sm:text-lg font-medium">
              Konfirmasi Password Baru
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirm_password}
                onChange={handleInputChange("confirm_password")}
                className={`w-full border-2 ${
                  errors.confirm_password ? "border-red-500" : "border-gray-100"
                } shadow-md rounded-xl p-4 mt-1 bg-transparent outline-none transition-colors pr-12`}
                placeholder="ulangi password baru"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500"
              >
                <i
                  className={
                    showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"
                  }
                ></i>
              </button>
            </div>

            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm_password}
              </p>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Password wajib minimal 8 karakter dan mengandung kombinasi huruf
            serta angka.
          </p>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900 flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <i
                className={
                  isLoading ? "ri-loader-4-line animate-spin" : "ri-lock-line"
                }
              ></i>
              {isLoading ? "Memproses..." : "Reset Password"}
            </button>

            <div className="mt-4 text-center flex items-center justify-center gap-2">
              <i className="ri-arrow-left-long-line"></i>
              <Link
                to="/login-guru"
                className="font-medium text-base text-blue-500"
              >
                Kembali ke login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LupaPasswordPage;
