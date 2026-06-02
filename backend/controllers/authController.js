const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

const isStrongPassword = (password) => {
  return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password || "");
};

const getPasswordValidationMessage = () => {
  return "Password minimal 8 karakter dan harus mengandung kombinasi huruf serta angka.";
};

// POST /api/auth/register
const register = async (req, res) => {
  const { email, password, namaLengkap, username } = req.body;
  const nama = namaLengkap || username;

  if (!nama || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Nama, email, dan password wajib diisi.",
    });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      message: getPasswordValidationMessage(),
    });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email],
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
      [nama, email, hashedPassword],
    );

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil. Silakan login.",
      data: { id: result.insertId, nama, email, role: "guru" },
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

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi.",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND role = 'guru' LIMIT 1",
      [email],
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah." });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah." });
    }

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
  const { email, password_baru, confirm_password } = req.body;

  if (!email || !password_baru || !confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Email, password baru, dan konfirmasi password wajib diisi.",
    });
  }

  if (!isStrongPassword(password_baru)) {
    return res.status(400).json({
      success: false,
      message: getPasswordValidationMessage(),
    });
  }

  if (password_baru !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Konfirmasi password tidak cocok.",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, password_hash FROM users WHERE email = ? AND role = 'guru' LIMIT 1",
      [email],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Email tersebut belum terdaftar. Silakan daftar akun dulu.",
      });
    }

    const user = rows[0];

    const isSamePassword = await bcrypt.compare(
      password_baru,
      user.password_hash,
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "Password baru tidak boleh sama dengan password lama.",
      });
    }

    const hashedPassword = await bcrypt.hash(password_baru, 10);

    await db.query(
      "UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [hashedPassword, user.id],
    );

    return res.status(200).json({
      success: true,
      message:
        "Password berhasil direset. Silakan login menggunakan password baru.",
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses reset password.",
    });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
         id, nama, email, role, created_at,
         nip, nuptk, ttl, pendidikan_terakhir,
         no_hp, alamat, nama_sekolah, school_type,
         kelas, jenjang, foto_profil
       FROM users WHERE id = ? LIMIT 1`,
      [req.user.id],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Get Me Error:", err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data user.",
    });
  }
};

// PUT /api/auth/profile  (menerima multipart/form-data dari multer)
const updateProfile = async (req, res) => {
  const {
    nama,
    email,
    nip,
    nuptk,
    ttl,
    pendidikan_terakhir,
    no_hp,
    alamat,
    nama_sekolah,
    school_type,
    kelas,
    jenjang,
    password_lama,
    password_baru,
  } = req.body;

  if (!nama) {
    return res
      .status(400)
      .json({ success: false, message: "Nama wajib diisi." });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [
      req.user.id,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan." });
    }

    const user = rows[0];

    // ── Ganti password jika diminta ──────────────────────────
    let newPasswordHash = null;
    if (password_baru) {
      if (!password_lama) {
        return res.status(400).json({
          success: false,
          message: "Password lama wajib diisi untuk mengganti password.",
        });
      }

      if (!isStrongPassword(password_baru)) {
        return res.status(400).json({
          success: false,
          message: getPasswordValidationMessage(),
        });
      }

      const isMatch = await bcrypt.compare(password_lama, user.password_hash);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Password lama salah." });
      }
      newPasswordHash = await bcrypt.hash(password_baru, 10);
    }

    // ── Tangani upload foto profil ───────────────────────────
    let fotoProfil = user.foto_profil; // default: tetap yang lama

    if (req.file) {
      // Hapus foto lama kalau ada
      if (user.foto_profil) {
        const oldPath = path.join(__dirname, "../../", user.foto_profil);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      // Simpan path relatif (disajikan sebagai static oleh server)
      fotoProfil = `uploads/${req.file.filename}`;
    }

    // ── Update ke DB ─────────────────────────────────────────
    if (newPasswordHash) {
      await db.query(
        `UPDATE users SET
           nama = ?, email = ?, password_hash = ?,
           nip = ?, nuptk = ?, ttl = ?,
           pendidikan_terakhir = ?, no_hp = ?, alamat = ?,
           nama_sekolah = ?, school_type = ?, kelas = ?, jenjang = ?,
           foto_profil = ?
         WHERE id = ?`,
        [
          nama,
          email,
          newPasswordHash,
          nip || null,
          nuptk || null,
          ttl || null,
          pendidikan_terakhir || null,
          no_hp || null,
          alamat || null,
          nama_sekolah || null,
          school_type || null,
          kelas || null,
          jenjang || null,
          fotoProfil,
          req.user.id,
        ],
      );
    } else {
      await db.query(
        `UPDATE users SET
           nama = ?, email = ?,
           nip = ?, nuptk = ?, ttl = ?,
           pendidikan_terakhir = ?, no_hp = ?, alamat = ?,
           nama_sekolah = ?, school_type = ?, kelas = ?, jenjang = ?,
           foto_profil = ?
         WHERE id = ?`,
        [
          nama,
          email,
          nip || null,
          nuptk || null,
          ttl || null,
          pendidikan_terakhir || null,
          no_hp || null,
          alamat || null,
          nama_sekolah || null,
          school_type || null,
          kelas || null,
          jenjang || null,
          fotoProfil,
          req.user.id,
        ],
      );
    }

    res.status(200).json({
      success: true,
      message: "Profil berhasil diperbarui.",
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui profil.",
    });
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  res.status(200).json({ success: true, message: "Logout berhasil." });
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  forgotPassword,
};
