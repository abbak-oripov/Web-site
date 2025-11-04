import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import ProductCard from '../components/ProductCard'; // Ваш компонент для "похожих товаров"
import { Star, StarHalf, Heart, Truck, RefreshCw } from 'lucide-react'; // Иконки

// Мок-данные (замените на реальные изображения из API)
// Убедитесь, что у вас есть эти картинки или замените их
import gamepad1 from '../assets/ps5.png'; 
import gamepad2 from '../assets/gucci.png';
import gamepad3 from '../assets/hear.png';
import gamepad4 from '../assets/girl.jpg';

// Компонент для отображения звезд
const StarRating = ({ rating, reviewCount }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className="w-5 h-5 text-yellow-500 fill-current" />);
    }
    if (hasHalfStar) {
        stars.push(<StarHalf key="half" className="w-5 h-5 text-yellow-500 fill-current" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" />);
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex">{stars}</div>
            <span className="text-gray-500">({reviewCount} Reviews)</span>
            <span className="text-green-500 ml-2">In Stock</span>
        </div>
    );
};


const ProductDetail = () => {
    const { productId } = useParams();
    const { t, i18n } = useTranslation();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { showNotification } = useNotification();

    const [product, setProduct] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Изначально null
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    
    // Временные данные для галереи
    const productImages = [gamepad1, gamepad2, gamepad3, gamepad4];

    // --- Загрузка данных ---
    useEffect(() => {
        const apiHeaders = { headers: { 'Accept-Language': i18n.language } };
        
        axios.get(`https://sto-dceb698b9ac9.herokuapp.com/api/products/${productId}`, apiHeaders)
            .then(response => {
                setProduct(response.data);
                setSelectedImage(response.data.image); 
                
                if (response.data.categoryId) {
                    axios.get(`https://sto-dceb698b9ac9.herokuapp.com/api/products/category/${response.data.categoryId}`, apiHeaders)
                        .then(relatedResponse => {
                            const related = relatedResponse.data
                                .filter(p => p.id !== parseInt(productId))
                                .slice(0, 4);
                            setRelatedItems(related);
                        })
                        .catch(error => console.error("Error fetching related items:", error));
                }
            })
            .catch(error => console.error("Error fetching product:", error));

    }, [productId, i18n.language]);

    // Показываем заглушку во время загрузки
    if (!product || !selectedImage) {
        return <div className="text-center my-20">Loading...</div>; 
    }
    
    const isLiked = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        showNotification(t('Product added to cart!'));
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            {/* Хлебные крошки */}
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                <Link to="/" className="hover:text-red-500">{t('Home')}</Link> / 
                <span className="font-medium"> {product.name}</span>
            </p>

            {/* --- Основная информация о товаре --- */}
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* ✨ 1. Галерея изображений (ИЗМЕНЕНО)
                  flex-col-reverse lg:flex-row 
                  Означает: на мобильных - колонка (сначала [2], потом [1])
                            на ПК - ряд (сначала [1], потом [2])
                */}
                <div className="w-full lg:w-3/5 flex flex-col-reverse lg:flex-row gap-4">
                    
                    {/* [1] Миниатюры */}
                    <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
                        {(productImages.length > 0 ? productImages : [product.image]).map((img, index) => (
                            <div 
                                key={index} 
                                // Добавлен flex-shrink-0, чтобы не сжимались в ряду на мобильных
                                className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-md p-2 cursor-pointer border-2 border-transparent hover:border-red-500 flex-shrink-0" 
                                onClick={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`thumbnail ${index+1}`} className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/96x96/e9e9e9/B0B0B0?text=...'; }}/>
                            </div>
                        ))}
                    </div>

                    {/* [2] Главное изображение */}
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md p-4 flex items-center justify-center h-[300px] md:h-[500px]">
                        <img 
                            src={selectedImage} 
                            alt={product.name} 
                            className="max-h-full max-w-full object-contain" 
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/e9e9e9/B0B0B0?text=No+Image'; }}
                        />
                    </div>
                </div>

                {/* 2. Информация о товаре (без изменений) */}
                <div className="w-full lg:w-2/5">
                    <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
                    <StarRating rating={product.rating || 4.5} reviewCount={product.reviewCount || 150} />
                    
                    <p className="text-3xl font-medium my-4">${product.price.toFixed(2)}</p>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 border-b dark:border-gray-700 pb-6">
                        {product.description || 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.'}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-lg">{t('Colours')}:</span>
                        <div className="flex gap-2">
                           <input type="radio" name="color" id="color-red" className="w-6 h-6 accent-red-500" />
                           <input type="radio" name="color" id="color-blue" className="w-6 h-6 accent-blue-500" defaultChecked />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-lg">{t('Size')}:</span>
                        <div className="flex gap-2">
                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                <button 
                                    key={size} 
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 border rounded-md font-medium transition-colors 
                                        ${selectedSize === size ? 'bg-red-500 text-white border-red-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <input 
                            type="number" 
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            className="w-20 p-3 border rounded-md text-center dark:bg-gray-800 dark:border-gray-700"
                            min="1"
                        />
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
                        >
                            {t('Buy Now')}
                        </button>
                        <button 
                            onClick={() => toggleWishlist(product)}
                            className="p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`} />
                        </button>
                    </div>

                    <div className="border rounded-md dark:border-gray-700">
                        <div className="p-4 flex items-center gap-4 border-b dark:border-gray-700">
                            <Truck className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                            <div>
                                <p className="font-medium">{t('Free Delivery')}</p>
                                <p className="text-sm text-gray-500">{t('Enter your postal code for Delivery Availability')}</p>
                            </div>
                        </div>
                         <div className="p-4 flex items-center gap-4">
                            <RefreshCw className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                            <div>
                                <p className="font-medium">{t('Return Delivery')}</p>
                                <p className="text-sm text-gray-500">{t('Free 30 Days Delivery Returns. Details')}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Похожие товары --- */}
            <div className="mt-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-5 h-10 bg-red-500 rounded"></div>
                    <h2 className="text-2xl font-semibold text-red-500">{t('Related Item')}</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {relatedItems.length > 0 ? (
                        relatedItems.map(item => (
                            <ProductCard key={item.id} product={item} />
                        ))
                    ) : (
                        <p>{t('No related items found.')}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;