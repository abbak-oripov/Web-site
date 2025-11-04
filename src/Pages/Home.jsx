import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // ✨ 1. Импортируем useNavigate
import { useTranslation } from 'react-i18next';

import apple from '../assets/apple.jpg';
import img2 from '../assets/save.jpg';

// Импорт всех необходимых компонентов
import FlashSalesTimer from "../components/FlashSalesTimer";
import ProductSlider from "../components/ProductSlider";
import CategoryBrowser from "../components/CategoryBrowser";
import ProductCard from "../components/ProductCard";
import JblBanner from "../components/JblBanner";
import NewArrivals from "../components/NewArrivals";
import Services from "../components/Services";

const Home = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate(); // ✨ 2. Инициализируем useNavigate
    const [categories, setCategories] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    
    const sliderImages = [
      apple,
      img2,
      apple
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    useEffect(() => {
        const apiHeaders = {
            headers: {
                'Accept-Language': i18n.language 
            }
        };

        axios.get("https://sto-dceb698b9ac9.herokuapp.com/api/categories", apiHeaders)
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));

        axios.get("https://sto-dceb698b9ac9.herokuapp.com/api/products", apiHeaders)
            .then(response => {
                setBestSellers(response.data.slice(4, 8));
            })
            .catch(error => console.error("Error fetching best sellers:", error));
            
    }, [i18n.language]); 
    
    useEffect(() => {
        const intervalId = setInterval(nextImage, 4000); 
        return () => clearInterval(intervalId); 
    }, []); 

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
            {/* --- Поле поиска для мобильных --- */}
            <div className="block md:hidden mt-4 mb-4">
                <div className="relative">
                    <input type="text" placeholder={t("What are you looking for?")} className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-800 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>

            {/* --- Категории для мобильных в виде сетки 2xN --- */}
            <div className="block md:hidden mb-4">
                <div className="grid grid-cols-2 gap-3">
                    {categories.map(category => (
                        <Link 
                            key={category.id} 
                            to={`/category/${category.id}`}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-md w-full flex items-center justify-center text-sm"
                        >
                            <span className="flex-grow text-center">{category.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>

            <section className="flex gap-8 mt-4 md:mt-8"> 
                {/* --- Категории для ПК (скрыты на мобильных) --- */}
                <aside className="hidden md:flex md:w-[20%] border-r dark:border-gray-700 pr-4 flex-col gap-3">
                    {categories.map(category => (
                        <Link 
                            key={category.id} 
                            to={`/category/${category.id}`}
                            className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded"
                        >
                            <span className="text-md">{category.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </Link>
                    ))}
                </aside>

                {/* --- Слайдер (видимый на всех экранах) --- */}
                <main className="w-full md:w-[80%]">
                    <div className="relative h-[250px] md:h-[400px] bg-black text-white flex items-center justify-center rounded-md overflow-hidden">
                        <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full z-10 hover:bg-opacity-50 mx-4">&lt;</button>
                        <img key={currentImageIndex} src={sliderImages[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} className="w-full h-full object-cover"/>
                        <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full z-10 hover:bg-opacity-50 mx-4">&gt;</button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {sliderImages.map((_, index) => (
                                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}></button>
                            ))}
                        </div>
                    </div>
                </main>
            </section>
            
            <hr className="my-8 md:my-12 border-gray-300 dark:border-gray-700" />
            <FlashSalesTimer />
            <ProductSlider />
            <div className="text-center my-8">
                {/* ✨ 3. Добавлен onClick для кнопки "View All" */}
                <button 
                    onClick={() => navigate('/shop')}
                    className="text-white bg-red-500 px-8 py-3 md:px-12 md:py-4 rounded-md hover:bg-red-600 transition-colors"
                >
                    {t('View All')}
                </button>
            </div>
            
            <hr className="my-8 md:my-12 border-gray-300 dark:border-gray-700" />
            <CategoryBrowser />
            <hr className="my-8 md:my-12 border-gray-300 dark:border-gray-700" />

            <section className="my-8 md:my-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-2 h-8 bg-red-500 rounded"></div>
                    <p className="text-red-500">{t('This Month')}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold">{t('Best Selling Products')}</h2>
                    {/* ✨ 4. Добавлен onClick для второй кнопки "View All" */}
                    <button 
                        onClick={() => navigate('/shop')}
                        className="text-white bg-red-500 px-10 py-3 rounded-md hover:bg-red-600 transition-colors w-full md:w-auto"
                    >
                        {t('View All')}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            
            <JblBanner />
            <NewArrivals />
            <Services />
        </div>
    );
}

export default Home;