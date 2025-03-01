
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NavbarLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "relative px-3 py-2 font-medium text-sm transition-colors duration-200",
        "hover:text-black",
        isActive ? "text-black" : "text-gray-600",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out",
        isActive && "after:origin-bottom-left after:scale-x-100"
      )}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-serif text-lg md:text-xl font-semibold tracking-tight focus:outline-none transition-opacity duration-200 hover:opacity-80"
        >
          TableWish
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/book-table">Book a Table</NavbarLink>
          <NavbarLink to="/contact">Contact Us</NavbarLink>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full text-sm font-medium transition-all hover:bg-gray-100"
          >
            Log in
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full bg-black text-white hover:bg-black/80 text-sm font-medium transition-all"
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[60px] z-40 overflow-hidden bg-white border-t transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-5 space-y-5">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-2 py-2 text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/book-table" 
              className="px-2 py-2 text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Table
            </Link>
            <Link 
              to="/contact" 
              className="px-2 py-2 text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex flex-col space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-center rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Button>
            <Button 
              variant="default" 
              className="w-full justify-center rounded-full bg-black text-white hover:bg-black/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
