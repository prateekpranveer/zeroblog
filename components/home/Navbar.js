import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi"; // Hamburger Icon from HeroIcons (you can use any)

export default function Navbar({ onSearchClick, onSidebarToggle }) {
  return (
    <div className="flex max-w-3xl mx-auto mt-4 px-4 h-full items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" aria-label="Home" className="cursor-pointer">
          <span className="">ZERO</span>{" "}
          <span className="font-extrabold">FRAMEDROP</span>
        </Link>
      </div>

      {/* Desktop Actions */}
      <div className="hidden sm:flex items-center space-x-6">
        {/* Search Button */}
        <button
          onClick={onSearchClick}
          className="hover:text-black transition cursor-pointer"
          aria-label="Open Sidebar"
        >
          <FiSearch size={18} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          className="hover:text-black transition cursor-pointer"
          aria-label="Dark Mode"
        >
          <CgDarkMode size={18} />
        </button>

        {/* Social Links */}
        <div className="flex items-center space-x-4 text-gray-600">
          <Link
            href="https://www.instagram.com/prateekpranveer/"
            target="_blank"
            className="cursor-pointer"
          >
            <FaInstagram size={18} className="hover:text-pink-600 transition" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/prateekpranveer/"
            target="_blank"
            className="cursor-pointer"
          >
            <FaLinkedin size={18} className="hover:text-blue-700 transition" />
          </Link>
          <Link
            href="https://github.com/prateekpranveer/"
            target="_blank"
            className="cursor-pointer"
          >
            <FaGithub size={18} className="hover:text-black transition" />
          </Link>
        </div>
      </div>

      {/* Mobile Hamburger (visible only on small screens) */}
      <button
        className="sm:hidden cursor-pointer p-2 rounded hover:bg-gray-200 transition"
        onClick={onSearchClick} // <-- This triggers your sidebar
        aria-label="Open Menu"
      >
        <HiOutlineMenu size={24} />
      </button>
    </div>
  );
}
