import React from 'react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Пример бесплатной доставки
    const total = subtotal + shipping;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                <Link to="/" className="hover:text-red-500">{t('Home')}</Link> / <span>{t('Cart')}</span>
            </p>

            {cartItems.length > 0 ? (
                <>
                    {/* Таблица для ПК */}
                    <div className="shadow-md rounded-md overflow-hidden hidden md:block">
                        <div className="grid grid-cols-4 gap-4 p-4 font-semibold bg-white dark:bg-gray-800 text-left">
                            <div>{t('Product')}</div>
                            <div>{t('Price')}</div>
                            <div>{t('Quantity')}</div>
                            <div className="text-right">{t('Subtotal')}</div>
                        </div>
                        {cartItems.map(item => (
                            <div key={item.id} className="grid grid-cols-4 gap-4 p-4 items-center border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/64x64/e9e9e9/B0B0B0?text=...'; }}/>
                                        <button onClick={() => removeFromCart(item.id)} className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                                    </div>
                                    <span>{item.name}</span>
                                </div>
                                <div>${item.price.toFixed(2)}</div>
                                <div>
                                    <input 
                                        type="number" 
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                                        className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        min="1"
                                    />
                                </div>
                                <div className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Карточки для мобильных */}
                     <div className="md:hidden space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="p-4 border rounded-md shadow-md dark:border-gray-700 space-y-3">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/64x64/e9e9e9/B0B0B0?text=...'; }}/>
                                    <span className="font-semibold flex-1">{item.name}</span>
                                    <button onClick={() => removeFromCart(item.id)}><Trash2 className="text-red-500"/></button>
                                </div>
                                <div className="flex justify-between items-center"><span>{t('Price')}:</span> <span>${item.price.toFixed(2)}</span></div>
                                <div className="flex justify-between items-center">
                                    <span>{t('Quantity')}:</span>
                                     <input 
                                        type="number" 
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                                        className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        min="1"
                                    />
                                </div>
                                <div className="flex justify-between items-center font-semibold"><span>{t('Subtotal')}:</span> <span>${(item.price * item.quantity).toFixed(2)}</span></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button onClick={() => navigate('/')} className="border border-gray-400 rounded px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">{t('Return To Shop')}</button>
                        <div className="flex gap-4">
                            <button onClick={() => window.location.reload()} className="border border-gray-400 rounded px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">{t('Update Cart')}</button>
                            {/* ✨ НОВАЯ КНОПКА */}
                            <button onClick={clearCart} className="border border-red-500 bg-red-500 text-white rounded px-6 py-3 hover:bg-red-600 transition-colors">{t('Remove All')}</button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between mt-12 gap-8">
                        {/* ✨ ИЗМЕНЕННЫЙ БЛОК КУПОНА */}
                        <div className="flex items-center gap-4 h-fit">
                            <input type="text" placeholder={t('Coupon Code')} className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 w-full md:w-auto"/>
                            <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition">{t('Apply Coupon')}</button>
                        </div>
                        <div className="border-2 border-black dark:border-gray-600 rounded p-6 w-full md:w-96">
                            <h3 className="text-xl font-semibold mb-4">{t('Cart Total')}</h3>
                            <div className="flex justify-between py-3 border-b dark:border-gray-700"><span>{t('Subtotal')}:</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between py-3 border-b dark:border-gray-700"><span>{t('Shipping')}:</span><span>{shipping > 0 ? `$${shipping.toFixed(2)}` : t('Free')}</span></div>
                            <div className="flex justify-between py-3 font-bold"><span>{t('Total')}:</span><span>${total.toFixed(2)}</span></div>
                            <div className="text-center mt-4">
                                <button 
                                    className="bg-red-500 text-white px-8 py-3 rounded w-full hover:bg-red-600 transition"
                                    onClick={() => navigate('/checkout')} // ✨ ИСПРАВЛЕНИЕ: Добавлен этот onClick
                                >
                                    {t('Procees to checkout')}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl mb-4">{t('Your cart is empty.')}</p>
                    <Link to="/" className="mt-4 inline-block bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition">{t('Return To Shop')}</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;