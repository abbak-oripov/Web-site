import React, {useEffect, useState} from 'react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from "axios";
import ProductCard from '../components/ProductCard'; // Используем ваш ProductCard

const Wishlist = () => {
    const { wishlistItems, toggleWishlist } = useWishlist();
    const { t, i18n } = useTranslation();
    const [justForYou, setJustForYou] = useState([]);

    useEffect(() => {
        const apiHeaders = { headers: { 'Accept-Language': i18n.language } };
        axios.get("https://sto-dceb698b9ac9.herokuapp.com/api/products", apiHeaders)
            .then(response => {
                // Берем случайные 4 товара для секции "Just For You"
                const shuffled = response.data.sort(() => 0.5 - Math.random());
                setJustForYou(shuffled.slice(0, 4));
            })
            .catch(error => console.error("Error fetching products:", error));
    }, [i18n.language]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            {/* Хлебные крошки и заголовок */}
            <div className="flex justify-between items-center mb-8">
                <p className="text-gray-500 dark:text-gray-400">
                    <Link to="/" className="hover:text-red-500">{t('Home')}</Link> / <span>{t('Wishlist')}</span>
                </p>
                <button className="border border-gray-400 rounded px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
                    {t('Move All To Bag')}
                </button>
            </div>
            
            <h2 className="text-xl mb-6">{t('Wishlist')} ({wishlistItems.length})</h2>

            {/* Сетка избранных товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                {wishlistItems.length > 0 ? (
                    wishlistItems.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center">{t('Your wishlist is empty.')}</p>
                )}
            </div>

            {/* Секция "Just For You" */}
            <div>
                 <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-10 bg-red-500 rounded"></div>
                        <h2 className="text-2xl font-semibold">{t('Just For You')}</h2>
                    </div>
                    <button className="border border-gray-400 rounded px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
                        {t('See All')}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {justForYou.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
