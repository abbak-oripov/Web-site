import React, { useState } from 'react'; // ✨ Убедитесь, что useState импортирован
import { useTranslation } from 'react-i18next'; // ✨ Убедитесь, что useTranslation импортирован
import { Link, useLocation } from 'react-router-dom'; // ✨ Убедитесь, что Link и useLocation импортированы

const AccountPage = () => {
    const { t } = useTranslation();
    const location = useLocation();

    // Состояния для полей формы (предзаполнены, как на скриншоте)
    const [profile, setProfile] = useState({
        firstName: 'Md',
        lastName: 'Rimel',
        email: 'rimel1111@gmail.com',
        address: 'Kingston, 5236, United State'
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    // Обработчики
    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь будет логика сохранения данных
        console.log("Saving Profile:", profile);
        console.log("Saving Passwords:", passwords);
        // Очищаем поля паролей
        setPasswords({ current: '', new: '', confirm: '' });
    };

    // Компонент для боковой навигации
    const NavLink = ({ to, label }) => (
        <Link 
            to={to}
            className={`block py-2 px-4 rounded-md ${
                location.pathname === to 
                ? 'text-red-500 font-semibold' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
            {t(label)}
        </Link>
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            {/* Хлебные крошки */}
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                <Link to="/" className="hover:text-red-500">{t('Home')}</Link> / 
                <span className="font-medium"> {t('My Account')}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-12">
                
                {/* --- Левый Сайдбар --- */}
                <aside className="w-full md:w-1/4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">{t('Manage My Account')}</h3>
                            <nav className="pl-4 space-y-1">
                                <NavLink to="/account" label="My Profile" />
                                <NavLink to="/account/address" label="Address Book" />
                                <NavLink to="/account/payment" label="My Payment Options" />
                            </nav>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">{t('My Orders')}</h3>
                            <nav className="pl-4 space-y-1">
                                <NavLink to="/orders/returns" label="My Returns" />
                                <NavLink to="/orders/cancellations" label="My Cancellations" />
                            </nav>
                        </div>
                        <div>
                            {/* Ссылка на существующую страницу Wishlist */}
                            <NavLink to="/Wishlist" label="My WishList" />
                        </div>
                    </div>
                </aside>

                {/* --- Основной Контент --- */}
                <main className="w-full md:w-3/4 p-8 shadow-lg rounded-md border border-gray-100 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* --- Секция Профиля --- */}
                        <div>
                            <h2 className="text-xl font-semibold text-red-500 mb-6">{t('Profile')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('First name')}</label>
                                    <input type="text" name="firstName" value={profile.firstName} onChange={handleProfileChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Last name')}</label>
                                    <input type="text" name="lastName" value={profile.lastName} onChange={handleProfileChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Email address')}</label>
                                    <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('Street address')}</label>
                                    <input type="text" name="address" value={profile.address} onChange={handleProfileChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                </div>
                            </div>
                        </div>

                        {/* --- Секция Смены Пароля --- */}
                        <div>
                            <h2 className="text-xl font-semibold text-red-500 mb-6">{t('Password Changes')}</h2>
                            <div className="space-y-6">
                                <div>
                                    <input type="password" name="current" placeholder={t('Current passwod')} value={passwords.current} onChange={handlePasswordChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <input type="password" name="new" placeholder={t('New passwod')} value={passwords.new} onChange={handlePasswordChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                    </div>
                                    <div>
                                        <input type="password" name="confirm" placeholder={t('Confirm new passwod')} value={passwords.confirm} onChange={handlePasswordChange} className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Кнопки --- */}
                        <div className="flex justify-end gap-6 items-center">
                            <button type="button" className="px-6 py-3 rounded-md hover:underline">{t('Cancel')}</button>
                            <button type="submit" className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors">
                                {t('Save Changes')}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default AccountPage;