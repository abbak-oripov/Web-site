import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const CheckOut = () => {
    const { t } = useTranslation();
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    
    // Состояние для выбора метода оплаты
    const [paymentMethod, setPaymentMethod] = useState('bank');

    // Расчет итогов
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Как на скриншоте
    const total = subtotal + shipping;

    // Функция-обработчик для формы
    const handlePlaceOrder = (e) => {
        e.preventDefault();
        
        // --- Имитация оплаты ---
        // В реальном приложении здесь был бы запрос к API (Stripe, PayPal и т.д.)
        // Мы просто с 50% шансом решим, прошла оплата или нет.
        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
            // Если успешно:
            // 1. Очищаем корзину
            clearCart();
            // 2. Переходим на страницу успеха
            navigate('/order-success');
        } else {
            // Если ошибка:
            // 1. Переходим на страницу ошибки
            navigate('/order-failure');
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            {/* Хлебные крошки */}
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                <Link to="/" className="hover:text-red-500">{t('Home')}</Link> / 
                <Link to="/cart" className="hover:text-red-500"> {t('Cart')} </Link> / 
                <span className="font-medium"> {t('CheckOut')}</span>
            </p>

            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* --- Левая колонка: Форма --- */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-semibold mb-8">{t('Billing Details')}</h1>
                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                        {/* Поля формы */}
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('First Name')}</label>
                            <input type="text" required className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Last Name')}</label>
                            <input type="text" required className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Street address')}</label>
                            <input type="text" required className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Apartment, floor, etc. (optional)')}</label>
                            <input type="text" className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Town/City')}</label>
                            <input type="text" required className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Phone number')}</label>
                            <input type="tel" required className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Email address')}</label>
                            <input type="email" required className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="save-info" className="w-5 h-5 accent-red-500" />
                            <label htmlFor="save-info" className="text-sm">{t('Save this information for faster check-out next time')}</label>
                        </div>
                    </form>
                </div>

                {/* --- Правая колонка: Заказ --- */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* Список товаров */}
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-12 h-12 object-contain" 
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/48x48/e9e9e9/B0B0B0?text=...'; }}
                                    />
                                    <span>{item.name} x {item.quantity}</span>
                                </div>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Итоги */}
                    <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{t('Subtotal')}:</span> <span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{t('Shipping')}:</span> <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : t('Free')}</span></div>
                        <div className="flex justify-between font-semibold text-lg border-t dark:border-gray-700 pt-2 mt-2"><span >{t('Total')}:</span> <span>${total.toFixed(2)}</span></div>
                    </div>
                    
                    {/* Методы оплаты */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="radio" 
                                    id="bank" 
                                    name="payment" 
                                    value="bank" 
                                    checked={paymentMethod === 'bank'} 
                                    onChange={() => setPaymentMethod('bank')} 
                                    className="w-5 h-5 accent-black dark:accent-white"
                                />
                                <label htmlFor="bank">{t('Bank')}</label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Здесь можно вставить иконки карт, как на скриншоте */}
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                <CreditCard className="w-6 h-6 text-yellow-600" />
                                <CreditCard className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                id="cash" 
                                name="payment" 
                                value="cash"
                                checked={paymentMethod === 'cash'} 
                                onChange={() => setPaymentMethod('cash')} 
                                className="w-5 h-5 accent-black dark:accent-white"
                            />
                            <label htmlFor="cash">{t('Cash on delivery')}</label>
                        </div>
                    </div>

                    {/* Купон и кнопка */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <input type="text" placeholder={t('Coupon Code')} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" />
                            <button className="px-6 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors">{t('Apply')}</button>
                        </div>
                        {/* Связываем кнопку с формой, чтобы работал onSubmit */}
                        <button type="submit" formNoValidate="formNoValidate" onClick={handlePlaceOrder} className="w-full bg-red-500 text-white py-3 rounded-md text-lg hover:bg-red-600 transition-colors">
                            {t('Place Order')}
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CheckOut;