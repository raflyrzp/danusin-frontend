export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: "Login berhasil",
    LOGOUT: "Logout berhasil",
    REGISTER: "Registrasi berhasil",
  },
  PRODUCT: {
    CREATED: "Produk berhasil dibuat",
    UPDATED: "Produk berhasil diperbarui",
    DELETED: "Produk berhasil dihapus",
  },
  ORDER: {
    CREATED: "Pesanan berhasil dibuat",
    UPDATED: "Pesanan berhasil diperbarui",
    CANCELLED: "Pesanan berhasil dibatalkan",
  },
  PROFILE: {
    UPDATED: "Profil berhasil diperbarui",
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: "Email/NIM atau password salah",
    SESSION_EXPIRED: "Sesi Anda telah berakhir, silakan login kembali",
  },
  NETWORK: {
    CONNECTION_ERROR: "Gagal terhubung ke server",
    TIMEOUT: "Request timeout, silakan coba lagi",
  },
  VALIDATION: {
    REQUIRED_FIELD: "Field ini wajib diisi",
    INVALID_EMAIL: "Format email tidak valid",
    INVALID_PHONE: "Format nomor telepon tidak valid",
    PASSWORD_TOO_SHORT: "Password minimal 8 karakter",
  },
  GENERAL: {
    SOMETHING_WENT_WRONG: "Terjadi kesalahan, silakan coba lagi",
  },
} as const;
