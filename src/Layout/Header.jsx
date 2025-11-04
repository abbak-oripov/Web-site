import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Make sure useNavigate is imported
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Search, Heart, ShoppingCart, User, Menu, X, Sun, Moon } from "lucide-react";
import Logo from '../assets/Logo.png'; // Ensure this path is correct
import { Select, MenuItem, FormControl } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

const Header = () => {
  const { i18n, t } = useTranslation();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate
  const [lang, setLang] = useState(i18n.language);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const handleLangChange = (event) => {
    const selectedLang = event.target.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    setMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const isDark = !prevMode;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return isDark;
    });
  };

  // Handler for submitting the search form
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchQuery.trim()) { // Check if query is not just whitespace
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear the input field
      setMenuOpen(false); // Close mobile menu if open
    }
  };

  const navItems = ["Home", "Contact", "About", "Sign up"];
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'tj', name: 'Тоҷикӣ' }
  ];

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // Header is sticky
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
      <div className="w-[90%] mx-auto flex items-center justify-between py-4 gap-4 relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between w-full md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/"><img src={Logo} alt="logo" className="h-10" /></Link>
            <div className="flex items-center gap-4">
                <button onClick={toggleDarkMode}>{darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}</button>
                <Link to="/Wishlist" className="relative">
                    <Heart className="w-6 h-6" />
                    {wishlistItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{wishlistItems.length}</span>
                    )}
                </Link>
                <Link to="/Cart" className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartItemCount}</span>
                    )}
                </Link>
                <Link to="/account" className="relative">
                    <User className="w-6 h-6" />
                </Link>
            </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center gap-8">
                <Link to="/"><img src={Logo} alt="logo" className="h-10" /></Link>
                <nav className="flex items-center gap-6 font-medium">
                    {navItems.map((item) => (
                        <Link key={item} to={`/${item === "Home" ? "" : item.replace(" ", "_")}`} className="relative group">
                            {t(item)}
                            <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-4">
                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                        type="text"
                        placeholder={t("What are you looking for?")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 text-[12px] h-[38px] w-[240px] pr-10 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Search className="w-5 h-5" />
                    </button>
                </form>
                {/* Language Select */}
                <select value={lang} onChange={handleLangChange} className="h-[38px] rounded-md bg-gray-100 dark:bg-gray-800 border-none focus:outline-none">
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                    <option value="tj">TJ</option>
                </select>
                {/* Icons */}
                <div className="flex items-center gap-4">
                    <button onClick={toggleDarkMode}>{darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}</button>
                    <Link to="/Wishlist" className="relative">
                        <Heart className="w-6 h-6 hover:text-red-500 transition" />
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistItems.length}</span>
                        )}
                    </Link>
                    <Link to="/Cart" className="relative">
                        <ShoppingCart className="w-6 h-6 hover:text-blue-500 transition" />
                         {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                        )}
                    </Link>
                    <Link to="/account"><User className="w-6 h-6 hover:text-green-500 transition" /></Link>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-white dark:bg-black flex flex-col md:hidden p-4 gap-4 shadow-md z-50">
            {/* Mobile Search Form */}
             <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input
                    type="text"
                    placeholder={t("What are you looking for?")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pr-10 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Search className="w-5 h-5" />
                </button>
            </form>
            {/* Mobile Nav Links */}
            {navItems.map((item) => (
              <Link key={item} to={`/${item === "Home" ? "" : item.replace(" ", "_")}`} onClick={() => setMenuOpen(false)}>
                {t(item)}
              </Link>
            ))}
            {/* Mobile Language Select */}
            <div className='flex items-center gap-3 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700'>
                <TranslateIcon sx={{ color: darkMode ? 'white' : 'black' }} />
                <FormControl fullWidth variant="standard" sx={{ '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:after': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, }}>
                    <Select value={lang} onChange={handleLangChange} sx={{ color: darkMode ? 'white' : 'black', '.MuiSelect-icon': { color: darkMode ? 'white' : 'black' } }}>
                        {languages.map((language) => (
                            <MenuItem key={language.code} value={language.code}>{language.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;