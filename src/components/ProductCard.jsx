import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { Link } from 'react-router-dom'; // 1. Импортируем Link

// Компонент для отображения звезд
const StarRating = ({ rating }) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
        stars.push(<span key={i} className={i <= roundedRating ? "text-yellow-500" : "text-gray-300"}>★</span>);
    }
    return <div>{stars}</div>;
};

const ProductCard = ({ product }) => {
    const { t } = useTranslation();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { showNotification } = useNotification(); 

    const discountPercentage = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice * 100)) : 0;
    const isLiked = isInWishlist(product.id);

    // Функция-обработчик для кнопки "Добавить в корзину"
    const handleAddToCart = () => {
        addToCart(product);
        showNotification(t('Product added to cart!'));
    };

    return (
        <div className="group flex flex-col">
            <div className="relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-md overflow-hidden h-64">
                
                {/* 2. Обертываем изображение в Link */}
                <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover mix-blend-multiply" 
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/e9e9e9/B0B0B0?text=No+Image'; }}
                    />
                </Link>

                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {discountPercentage > 0 && (
                        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                            -{discountPercentage}%
                        </span>
                    )}
                    {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
                            NEW
                        </span>
                    )}
                </div>
                
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    {/* Кнопка "Сердечко" */}
                     <button 
                        onClick={() => toggleWishlist(product)}
                        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md transition-all duration-300 
                                   hover:bg-red-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-6 w-6 transition-colors duration-300 
                                        ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500 hover:text-red-500'}`} 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    {/* Кнопка "Глаз" */}
                    <button className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md transition-all duration-300 hover:bg-blue-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-gray-500 transition-colors duration-300 hover:text-blue-500" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>

                <button 
                    onClick={handleAddToCart}
                    className="absolute bottom-0 left-0 w-full bg-black text-white py-2 transition-transform duration-300 translate-y-full group-hover:translate-y-0 z-10"
                >
                    {t('Add To Cart')}
                </button>
            </div>
            <div className="mt-4">
                
                {/* 3. Обертываем название в Link */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold truncate hover:text-red-500 transition-colors">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-3 mt-1">
                    <p className="text-red-500 font-semibold">${product.price}</p>
                    {product.oldPrice && <p className="text-gray-400 line-through">${product.oldPrice}</p>}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    {product.rating && product.reviewCount && (
                        <>
                            <StarRating rating={product.rating} />
                            <span className="text-gray-400 text-sm">({product.reviewCount})</span>
                        </>
                    )}
                </div>
                {product.colors && (
                    <div className="flex items-center gap-2 mt-2">
                        {product.colors.map((color, index) => (
                            <button key={index} className="w-5 h-5 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-black" style={{ backgroundColor: color }}></button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;