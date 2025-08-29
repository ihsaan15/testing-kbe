import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0e0220] text-gray-400 py-10">
      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left mb-8 md:mb-10">
          <div className="mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              PT. Kaltim Banua Etam
            </h3>
            <p className="text-sm leading-relaxed">
              Kami menyediakan tenaga kerja berkualitas tinggi untuk industri
              dengan standar keselamatan internasional dan pengalaman lebih dari
              20 tahun.
            </p>
            <p className="text-sm leading-relaxed">
              Komitmen Terhadap Kualitas dan Keselamatan
            </p>
          </div>

          <div className="mx-auto">
            <h3 className="text-lg font-bold text-white mb-3">Navigasi</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              {/* <li>
                <a
                  href="/profile"
                  className="hover:text-white transition-colors"
                >
                  Profil
                </a>
              </li> */}
              <li>
                <a
                  href="/tentang-kami"
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Kontak
                </a>
              </li>
              <li>
                <a
                  href="/lowongan-kerja"
                  className="hover:text-white transition-colors"
                >
                  Lowongan
                </a>
              </li>
              <li>
                <a
                  href="/article"
                  className="hover:text-white transition-colors"
                >
                  Artikel
                </a>
              </li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="text-lg font-bold text-white mb-3">Hubungi Kami</h3>
            <ul className="space-y-1 text-sm mb-4">
              <li className="flex items-center justify-center sm:justify-start">
                <Mail size={16} className="mr-2 text-purple-400" />
                <a
                  href="mailto:11221053@student.itk.ac.id"
                  className="hover:text-white transition-colors"
                >
                  support@kbe.co.id
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Phone size={16} className="mr-2 text-purple-400" />
                <a
                  href="https://wa.me/6281253885732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <span>+6281253885732</span>
                </a>
              </li>
            </ul>
            <h3 className="text-lg font-bold text-white mb-3">Ikuti Kami</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://facebook.com/kbe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/pt.kaltimbanuaetam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/kaltimbanuaetam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>© 2025 PT Kaltim Banua Etam Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
