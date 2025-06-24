import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const btnRef = useRef(null);

  const isActive = (path) =>
    location.pathname === path ? "text-purple-600 font-semibold" : "text-gray-700";

  const navLinks = [
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
    { path: "/profile", label: "Profile" },
    { path: "/userList", label: "UserList" },
    // { path: "/httpmodule", label: "HttpModules" },
  ];

  // Animate mobile menu open/close
  useEffect(() => {
    if (menuOpen) {
      // Slide menu down
      gsap.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Animate links fading and sliding up
          gsap.fromTo(
            linksRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        },
      });

      // Rotate hamburger icon (optional)
      gsap.to(btnRef.current, {
        rotation: 90,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      // Slide menu up and hide
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      // Reset icon rotation
      gsap.to(btnRef.current, {
        rotation: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-600">
          <Link to="/">AUTHORYX</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${isActive(path)} hover:text-purple-800 transition-colors duration-200`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
        className="md:hidden px-4 pb-4 space-y-2 bg-white shadow"
      >
        {navLinks.map(({ path, label }, index) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMenuOpen(false)} // close on link click
            ref={(el) => (linksRef.current[index] = el)}
            className={`block ${isActive(path)} hover:text-purple-800 transition-colors duration-200`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
