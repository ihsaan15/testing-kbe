export default function StrukturOrganisasi() {
  // Data struktur organisasi
  const anggota = [
    { id: 1, nama: "Yusuf T Silambi", jabatan: "Direktur Utama" },
    { id: 2, nama: "Novianti S Datuan", jabatan: "Sekertaris" },
    { id: 3, nama: "Sukiyarno", jabatan: "Site Manager" },
    { id: 4, nama: "Frans S ", jabatan: "Manajer HR" },
    { id: 5, nama: "Aris K", jabatan: "Manager Services" },
    // { id: 6, nama: "Sari Putri", jabatan: "Staf Administrasi" },
  ];

  // Data supervisor khusus
  const supervisors = [
    { id: 1, nama: "Meri Tandililing", jabatan: "Supervisor GA" },
    { id: 2, nama: "Benyamin", jabatan: "Supervisor Purchasing" },
    { id: 3, nama: "Andre", jabatan: "Supervisor Finance" },
    { id: 4, nama: "Ratu", jabatan: "Supervisor Finance" },
    { id: 5, nama: "Pian Sopian", jabatan: "Supervisor Fabrikasi" },
    { id: 6, nama: "Faktkhur", jabatan: "Supervisor General Services" },
    { id: 7, nama: "Tri Ramto", jabatan: "Supervisor Water Treatment" },
    { id: 8, nama: "Ellysa E", jabatan: "Supervisor Minor Infras" },
    { id: 9, nama: "Nurahmat P", jabatan: "Supervisor Safety" },
  ];

  // const backgroundUrl = "src/assets/bg-green.jpg";

  return (
    <div
      className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      id="TentangKami"
    >
      <div className="max-w-5xl mx-auto mt-12 ">
        {/* Visi dan Misi */}
        <section className="mb-16 text-center">
          <h1 className="text-3xl font-bold text-black mb-6 mt-16">
            Membangun Indonesia <span className="text-green-600">Bersama</span>
          </h1>
          <p className="text-black text-center mx-32">
            Penyedia tenaga kerja profesional dan kontraktor terpercaya untuk
            proyek konstruksi sipil dan pertambangan di seluruh Indonesia.
          </p>

          <div className="flex flex-col md:flex-row md:justify-center md:space-x-12 space-y-8 md:space-y-0 text-black mt-16">
            <div className="md:w-1/2 bg-white rounded-lg shadow-2xl p-6">
              <h2 className="text-4xl font-bold mb-4 mt-6">Visi</h2>
              <p className="text-lg font-stretch-90% mt-10 text-gray-900 text-center mx-5">
                Menjadi Perusahaan manufaktur, jasa dan tenaga kerja yang
                terbaik di Indonesia
              </p>
            </div>
            <div className="md:w-1/2 bg-white rounded-lg shadow-2xl p-6 ">
              <h2 className="text-4xl font-bold mb-4 mt-4">Misi</h2>
              <ul className="list-disc list-inside space-y-2 text-lg text-left font-stretch-90%  text-gray-900 mt-10 mx-5 mb-10">
                <p className="my-4">
                  Selalu mengutamakan kualitas dan kepuasan konsumen
                </p>
                <p className="my-4">
                  Memupuk budaya yang mengutamakan keselamatan, kesehatan, dan
                  lingkungan dalam segala aktivitasnya
                </p>
              </ul>
            </div>
          </div>
        </section>

        {/* Sejarah Perusahaan */}
        <section className="mb-16 max-w-screen mx-auto text-justify bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 ">
          <div>
            <h2 className="text-3xl font-semibold text-black mb-16 text-center mt-1">
              Sejarah Perusahaan
            </h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              PT. Kaltim Banua Etam adalah perusahaan lokal yang bergerak di
              bidang usaha jasa pertambangan yang didirikan pada tanggal 19
              September 1999 oleh DR. Drs. Yusuf T. Silambi, MM., MBA.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              Dalam usahanya PT. Kaltim Banua Etam selalu melakukan inovasi
              untuk menciptakan lingkungan usaha yang moderen dengan tetap
              mengedepankan ide-ide baru, sesuai dengan tren usaha yang sedang
              ada guna mendapatkan kepuasan pelanggan sebagai sasaran optimal
              yang mengutamakan akurasi serta kualitas hasil secara total.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              PT. Kaltim Banua Etam pada awalnya didirikan di wilayah sangatta
              kutai timur, melalui pengalaman kerja Founder yang tumbuh serta
              belajar bersama dengan perusahaan jasa pertambangan lainnya, dan
              berpegang pada nilai-nilai berusaha yang menjadi ciri khusus PT.
              Kaltim Banua Etam.{" "}
            </p>
            <p className="text-gray-700 leading-relaxed mb-20">
              PT. Kaltim Banua Etam saat ini telah didukung oleh lebih dari 1000
              karyawan dari berbagai keterampilan dan pengetahuan, saat ini PT.
              Kaltim Banua Etam juga telah beroperasi di area bontang,
              kaliurang, separi dan bengalon.{" "}
            </p>
          </div>
        </section>

        {/* Upload Gambar Struktur Organisasi */}
        <section className="mb-16 max-w-screen mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-black mb-8 mt-10">
            Struktur Organisasi
          </h2>
          <img
            src="src/assets/strukturorganisasi2.png" // Ganti dengan link gambar asli
            alt="Struktur Organisasi PT. Kaltim Banua Etam"
            className="mx-auto max-w-full h-auto rounded-lg shadow-md"
          />
        </section>

        {/* Struktur Organisasi */}
        <section>
          <h1 className="text-3xl font-bold text-black mb-20 text-center mt-32">
            Dewan Direksi
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
            {anggota.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow justify-center"
              >
                <div className="mb-4">
                  {/* Inisial nama sebagai placeholder foto */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-blue-300 flex items-center justify-center text-white text-xl font-semibold">
                    {person.nama
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {person.nama}
                </h2>
                <p className="text-gray-600 mt-1">{person.jabatan}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Supervisor */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">
            Supervisor
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {supervisors.map((sup) => (
              <div
                key={sup.id}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-green-400 flex items-center justify-center text-white text-xl font-semibold">
                    {sup.nama
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {sup.nama}
                </h2>
                <p className="text-gray-600 mt-1">{sup.jabatan}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
