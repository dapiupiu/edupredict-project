const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// POST /api/auth/register
const register = async (req, res) => {
  const {
    email,
    password,
    namaLengkap,
    username,
  } = req.body;

  const nama = namaLengkap || username;

  if (!nama || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Nama, email, dan password wajib diisi.",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password minimal 8 karakter.",
    });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (nama, email, password_hash, role)
       VALUES (?, ?, ?, 'guru')`,
      [nama, email, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil. Silakan login.",
      data: {
        id: result.insertId,
        nama,
        email,
        role: "guru",
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat registrasi. Silakan coba lagi nanti.",
    });
  }
};

// POST /api/auth/login

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi.",
    });
  }

  try {
    // Cari user berdasarkan email
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND role = 'guru' LIMIT 1",
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    const user = rows[0];

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, nama: user.nama, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" },
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil.",
      data: {
        token,
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login. Silakan coba lagi nanti.",
    });
  }
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email wajib diisi.",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, email FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    // Untuk alasan keamanan, response dibuat tetap umum.
    // Jadi email tidak terdaftar pun tidak membocorkan data user.
    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message:
          "Jika email terdaftar, instruksi reset password akan dikirimkan.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Jika email terdaftar, instruksi reset password akan dikirimkan.",
      note:
        "Fitur pengiriman email reset password belum diaktifkan. Endpoint ini masih placeholder untuk integrasi frontend.",
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat memproses permintaan reset password.",
    });
  }
};

// GET /api/auth/me

const getMe = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nama, email, role, created_at FROM users WHERE id = ? LIMIT 1",
      [req.user.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error("Get Me Error:", err);
    res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat mengambil data user. Silakan coba lagi nanti.",
    });
  }
};

// PUT /api/auth/profile

const updateProfile = async (req, res) => {
  const { nama, password_lama, password_baru } = req.body;

  if (!nama) {
    return res.status(400).json({
      success: false,
      message: "Nama wajib diisi.",
    });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [
      req.user.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan.",
      });
    }

    const user = rows[0];

    // Jika ingin ganti password, cek password lama
    if (password_baru) {
      if (!password_lama) {
        return res.status(400).json({
          success: false,
          message: "Password lama wajib diisi untuk mengganti password.",
        });
      }

      const isMatch = await bcrypt.compare(password_lama, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Password lama salah.",
        });
      }

      const hashed = await bcrypt.hash(password_baru, 10);
      await db.query(
        "UPDATE users SET nama = ?, password_hash = ? WHERE id = ?",
        [nama, hashed, req.user.id],
      );
    } else {
      await db.query("UPDATE users SET nama = ? WHERE id = ?", [
        nama,
        req.user.id,
      ]);
    }

    res.status(200).json({
      success: true,
      message: "Profil berhasil diperbarui.",
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat memperbarui profil. Silakan coba lagi nanti.",
    });
  }
};

//POST /api/auth/logout

const logout = async (req, res) => {
  // Karena kita menggunakan JWT stateless, logout hanya perlu dilakukan di client dengan menghapus token.
  res.status(200).json({
    success: true,
    message: "Logout berhasil.",
  });
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  forgotPassword,
};
