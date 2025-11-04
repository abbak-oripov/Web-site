import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className='bg-black text-white py-10 px-5 md:px-20 font-poppins'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
                <div className='flex flex-col gap-3'>
                    <h1 className="text-xl font-bold">Exclusive</h1>
                    <span className="text-gray-400">{t("Get 10% off your first order")}</span>
                    <div className="relative mt-2">
                        <input
                            type="email"
                            placeholder={t("Enter your email")}
                            className="w-full p-2 pr-10 rounded-md text-white placeholder-gray-400 bg-transparent border border-white"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-md hover:text-gray-300 transition">
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className="text-xl font-bold">{t("Support")}</h1>
                    <p className="text-gray-400">111 Bijoy Sarani, Dhaka, <br /> DH 1515, Bangladesh</p>
                    <p className="text-gray-400">exclusive@gmail.com</p>
                    <p className="text-gray-400">+88015-88888-9999</p>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <h1 className="text-xl font-bold">{t("Account")}</h1>
                    <Link to="/profile" className="text-gray-400 hover:text-white">{t("My Account")}</Link>
                    <Link to="/Cart" className="text-gray-400 hover:text-white">{t("Cart")}</Link>
                    <Link to="/Wishlist" className="text-gray-400 hover:text-white">{t("Wishlist")}</Link>
                    <Link to="/shop" className="text-gray-400 hover:text-white">{t("Shop")}</Link>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <h1 className="text-xl font-bold">{t("Quick Link")}</h1>
                    <p className="text-gray-400 hover:text-white cursor-pointer">{t("Privacy Policy")}</p>
                    <p className="text-gray-400 hover:text-white cursor-pointer">{t("Terms Of Use")}</p>
                    <p className="text-gray-400 hover:text-white cursor-pointer">{t("FAQ")}</p>
                    <Link to="/Contact" className="text-gray-400 hover:text-white cursor-pointer">{t("Contact")}</Link>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className="text-xl font-bold">{t("Social")}</h1>
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="hover:text-blue-500"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-blue-400"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-pink-500"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-blue-700"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

