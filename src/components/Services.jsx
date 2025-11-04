import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Headset, ShieldCheck } from 'lucide-react';

// Компонент для одной карточки сервиса
const ServiceCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gray-200 dark:bg-gray-700">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black text-white dark:bg-gray-900 dark:text-white">
                {icon}
            </div>
        </div>
        <h4 className="font-bold text-xl uppercase text-gray-900 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{description}</p>
    </div>
);

const Services = () => {
    // ✨ ШАГ 1: Получаем функцию перевода
    const { t } = useTranslation();
    const iconProps = { className: "w-8 h-8" };
    
    // ✨ ШАГ 2: Создаем массив данных ВНУТРИ компонента, чтобы использовать t()
    const servicesData = [
        { 
            icon: <Truck {...iconProps} />,
            title: t('FREE AND FAST DELIVERY'), 
            description: t('Free delivery for all orders over $140')
        },
        { 
            icon: <Headset {...iconProps} />,
            title: t('24/7 CUSTOMER SERVICE'), 
            description: t('Friendly 24/7 customer support')
        },
        { 
            icon: <ShieldCheck {...iconProps} />,
            title: t('MONEY BACK GUARANTEE'), 
            description: t('We return money within 30 days')
        },
    ];

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 md:my-24">
            {/* ✨ ШАГ 3: Отображаем переведенные данные */}
            {servicesData.map(service => (
                <ServiceCard key={service.title} {...service} />
            ))}
        </section>
    );
};

export default Services;