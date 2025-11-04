import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✨ Импортируем хук
import axios from 'axios';

// Иконка Google
const GoogleIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.978,36.223,44,30.62,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


const Sign_up = () => {
    const { t } = useTranslation(); // ✨ Получаем функцию перевода
    const [formData, setFormData] = useState({ name: '', email_phone: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Сбрасываем сообщение
        try {
            const response = await axios.post('https://sto-dceb698b9ac9.herokuapp.com/api/signup', formData);
            setMessage(t('Account created successfully!'));
            console.log('User created:', response.data);
            // Здесь можно добавить перенаправление на страницу входа
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(t(error.response.data.detail)); // Переводим сообщение об ошибке с сервера
            } else {
                setMessage(t('An error occurred. Please try again.'));
            }
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center w-full max-w-md mx-auto">
                <div className="mb-8">
                    {/* ✨ Переводим тексты */}
                    <h2 className="text-4xl font-medium text-gray-900 dark:text-white tracking-wider">
                        {t('Create an account')}
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        {t('Enter your details below')}
                    </p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full py-3 text-gray-700 dark:text-gray-200 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                            placeholder={t('Name')}
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            id="email_phone"
                            name="email_phone"
                            type="text"
                            required
                            className="w-full py-3 text-gray-700 dark:text-gray-200 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                            placeholder={t('Email or phone number')}
                            value={formData.email_phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full py-3 text-gray-700 dark:text-gray-200 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                            placeholder={t('Password')}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600"
                        >
                            {t('Create Account')}
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                        >
                            <GoogleIcon />
                            {t('Sign up with Google')}
                        </button>
                    </div>
                </form>

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}

                <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                    {t('Already have account?')}
                    <Link to="/login" className="font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 underline ml-2">
                        {t('Log in')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Sign_up;

