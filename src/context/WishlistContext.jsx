import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Создаем контекст
const WishlistContext = createContext();

// 2. Создаем кастомный хук для удобного использования контекста
export const useWishlist = () => {
    return useContext(WishlistContext);
};

// 3. Создаем провайдер, который будет "хранить" данные
export const WishlistProvider = ({ children }) => {
    // Используем состояние, которое будет брать начальные данные из localStorage
    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const items = localStorage.getItem('wishlist');
            return items ? JSON.parse(items) : [];
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return [];
        }
    });

    // Сохраняем изменения в localStorage каждый раз, когда wishlistItems меняется
    useEffect(() => {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }, [wishlistItems]);

    // Функция для добавления/удаления товара
    const toggleWishlist = (product) => {
        setWishlistItems(prevItems => {
            const isItemInWishlist = prevItems.find(item => item.id === product.id);
            if (isItemInWishlist) {
                // Если товар уже есть, удаляем его
                return prevItems.filter(item => item.id !== product.id);
            } else {
                // Если товара нет, добавляем его
                return [...prevItems, product];
            }
        });
    };
    
    // Функция для проверки, находится ли товар в избранном
    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    // Значение, которое будет доступно всем дочерним компонентам
    const value = {
        wishlistItems,
        toggleWishlist,
        isInWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
