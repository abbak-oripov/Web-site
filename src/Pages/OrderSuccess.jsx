import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-2xl mx-auto px-4 lg:px-8 my-20 flex flex-col items-center text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
            <h1 className="text-4xl font-bold mb-4">{t('Thank You!')}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                {t('Your order has been placed successfully.')}
            </p>
            <Link 
                to="/" 
                className="bg-red-500 text-white px-10 py-3 rounded-md hover:bg-red-600 transition-colors"
            >
                {t('Continue Shopping')}
            </Link>
        </div>
    );
};

export default OrderSuccess;