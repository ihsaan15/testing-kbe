import React, { useState } from "react";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email dan password harus diisi");
      }

      // Contoh autentikasi dummy (ganti dengan API call nyata)
      await new Promise((res) => setTimeout(res, 700));

      if (email === "admin@example.com" && password === "admin123") {
        // Ganti dengan redirect ke dashboard Anda
        alert("Login berhasil!");
      } else {
        throw new Error("Email atau password salah");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen    bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 lg:p-10">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Admin Login
          </h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            Masuk menggunakan akun admin Anda
          </p>

          {error && (
            <div
              role="alert"
              className="mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm  text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                placeholder="you@example.com"
                aria-describedby="email-desc"
              />
              <p id="email-desc" className="sr-only">
                Masukkan email yang terdaftar sebagai admin.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-xs text-green-600 hover:text-green-800 focus:outline-none"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                placeholder="Masukkan password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 ">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-0 bg-white"
                />
                <span className="text-gray-600">Ingat saya</span>
              </label>
              <button
                type="button"
                className="text-green-600 hover:underline text-sm focus:outline-none"
                onClick={() => alert("Fitur lupa password belum tersedia.")}
              >
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} PT. Kaltim Banua Etam Semua hak
            dilindungi.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
