import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n.js';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx'; // ✨ Импортируем

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* ✨ Оборачиваем все приложение в провайдеры здесь */}
        <NotificationProvider>
            <WishlistProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </WishlistProvider>
        </NotificationProvider>
    </StrictMode>,
);

