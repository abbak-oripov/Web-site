import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next'; // ✨ ШАГ 1: Импортируем хук

const ProductSlider = () => {
    const { i18n } = useTranslation(); // ✨ ШАГ 2: Получаем доступ к текущему языку
    const [products, setProducts] = useState([]);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // ✨ ШАГ 3: Добавляем заголовок с языком в запрос
        const apiHeaders = {
            headers: {
                'Accept-Language': i18n.language
            }
        };

        axios.get("https://sto-dceb698b9ac9.herokuapp.com/api/products", apiHeaders)
            .then(response => {
                setProducts(response.data.slice(0, 25));
            })
            .catch(error => console.error("Error fetching products:", error));
    // ✨ ШАГ 4: Добавляем язык в зависимости, чтобы данные перезагружались
    }, [i18n.language]);

    if (products.length === 0) {
        return <div className="text-center p-8">Loading products...</div>;
    }

    const duplicatedProducts = [...products, ...products];

    return (
        <div 
            className="overflow-hidden w-full relative py-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div 
                className="flex"
                style={{
                    animation: `marquee 60s linear infinite ${isHovering ? 'paused' : 'running'}`
                }}
            >
                {duplicatedProducts.map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-64 mx-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;
