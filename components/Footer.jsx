import Image from "next/image";
import Link from "next/link";
import { FaSquareFacebook, FaSquareYoutube, FaSquareInstagram, FaWhatsapp  } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className=" text-gray-300 py-12 shadow-[inset_0_0_1000px_1000px_rgba(0,0,0,0.747)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        <Link href="/" className="flex flex-col col-span-4 md:col-span-1">
          <Image
            src="/logo.jpg"
            alt="RCCG Amazing Grace Courts Logo"
            width={120}
            height={100}
            className="mb-4 w-30 h-auto" 
            priority
          />
          <h3 className="text-white text-lg font-bold mb-4">
            RCCG Amazing Grace Courts
          </h3>
        </Link>
        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 ">
            <li><Link href="/" className="hover:underline hover:font-semibold">Home</Link></li>
            <li><Link href="/about" className="hover:underline hover:font-semibold">About</Link></li>
            <li><Link href="/blog" className="hover:underline hover:font-semibold">Blog</Link></li>
            <li><Link href="/contact" className="hover:underline hover:font-semibold">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Service Times
          </h3>
          <ul className="space-y-2">
            <li>Sunday: 12:00PM</li>
            <li>Wednesday: 5:00PM - 7:00PM</li>
            <li>Saturday: 6:00PM - 7:00PM</li>
          </ul>
        </div>

        {/* Social */}
        <div className='col-span-4 md:col-span-1'>
          <h3 className="text-white font-semibold mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/profile.php?id=100092176750256&sk=about&locale=en_GB" title="Facebook" className="inline-block">
              <div className="bg-white rounded-full p-2 hover:scale-110 transform transition-transform shadow-md">
                <FaSquareFacebook className="w-6 h-6 text-blue-600" />
              </div>
            </Link>
            <Link href="https://www.youtube.com/@RccgamazinggracecourtsSeaham" title="Youtube" className="inline-block">
              <div className="bg-white rounded-full p-2 hover:scale-110 transform transition-transform shadow-md">
                <FaSquareYoutube className="w-6 h-6 text-red-500" />
              </div>
            </Link>
            <Link href="https://www.instagram.com/amaz.inggracecourt" title="Instagram" className="inline-block">
              <div className="bg-white rounded-full p-2 hover:scale-110 transform transition-transform shadow-md">
                <FaSquareInstagram className="w-6 h-6 text-pink-500" />
              </div>
            </Link>
            <Link href="https://wa.me/+447926559208" title="WhatsApp" className="inline-block">
              <div className="bg-white rounded-full p-2 hover:scale-110 transform transition-transform shadow-md">
                <FaWhatsapp className="w-6 h-6 text-green-500" />
              </div>
            </Link>
          </div>
        </div>

      </div>
      <div className="text-center text-gray-500 mt-10">
        © {new Date().getFullYear()} Lollykrown. All rights reserved.
      </div>
    </footer>
  );
}