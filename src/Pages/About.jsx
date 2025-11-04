import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// ✨ 1. Импортируем красивые иконки из lucide-react
import { Store, DollarSign, ShoppingBag, Landmark, Twitter, Instagram, Linkedin, Truck, Headset, ShieldCheck } from 'lucide-react';

import person1 from '../assets/person1.png';
import person2 from '../assets/person2.png';
import person3 from '../assets/person3.png';
import female from '../assets/female.jpg';

// ✨ 2. Упрощенный компонент для иконок
const Icon = ({ name, className }) => {
    const iconProps = { className: className || "w-7 h-7" };
    const icons = {
        store: <Store {...iconProps} />,
        dollar: <DollarSign {...iconProps} />,
        bag: <ShoppingBag {...iconProps} />,
        money: <Landmark {...iconProps} />,
        truck: <Truck {...iconProps} />,
        headset: <Headset {...iconProps} />,
        shield: <ShieldCheck {...iconProps} />,
        twitter: <Twitter {...iconProps} />,
        instagram: <Instagram {...iconProps} />,
        linkedin: <Linkedin {...iconProps} />,
    };
    return icons[name] || null;
};

const About = () => {
    const { t } = useTranslation();

    // Данные теперь используют ключи перевода
    const stats = [
      { value: '10.5k', label: t('Sellers active our site'), icon: 'store' },
      { value: '33k', label: t('Monthly Product Sale'), icon: 'dollar' },
      { value: '45.5k', label: t('Customer active in our site'), icon: 'bag' },
      { value: '25k', label: t('Annual gross sale in our site'), icon: 'money' },
    ];

    const team = [
      { name: 'Tom Cruise', role: t('Founder & Chairman'), image: person1, social: { twitter: '#', linkedin: '#', instagram: '#' } },
      { name: 'Emma Watson', role: t('Managing Director'), image: person2, social: { twitter: '#', linkedin: '#', instagram: '#' } },
      { name: 'Will Smith', role: t('Product Designer'), image: person3, social: { twitter: '#', linkedin: '#', instagram: '#' } },
    ];

    const services = [
        { title: t('FREE AND FAST DELIVERY'), description: t('Free delivery for all orders over $140'), icon: 'truck'},
        { title: t('24/7 CUSTOMER SERVICE'), description: t('Friendly 24/7 customer support'), icon: 'headset'},
        { title: t('MONEY BACK GUARANTEE'), description: t('We return money within 30 days'), icon: 'shield'},
    ];

    return (
        <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-12">
                    <Link to="/" className="hover:text-gray-800 dark:hover:text-white">{t('Home')}</Link>
                    <span className="mx-2">/</span>
                    <span>{t('About')}</span>
                </div>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">{t('Our Story')}</h1>
                        {/* ✨ 3. Переводим текст истории */}
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {t('story_p1')}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('story_p2')}
                        </p>
                    </div>
                    <div className="h-[450px]">
                        <img src={female} alt="Happy customers" className="rounded-md w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x450/f5f5f5/a0a0a0?text=Image'; }} />
                    </div>
                </section>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {stats.map((stat) => (
                        <div key={stat.label} className="group flex flex-col items-center justify-center p-8 border rounded-md transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-red-500 hover:text-white hover:shadow-lg">
                           <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 bg-gray-200 dark:bg-gray-700 group-hover:bg-white group-hover:bg-opacity-30">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 bg-black text-white dark:bg-gray-900 dark:text-white group-hover:bg-white group-hover:text-red-500">
                                    <Icon name={stat.icon} />
                                </div>
                           </div>
                           <p className="text-3xl font-bold">{stat.value}</p>
                           <p className="text-center mt-2">{stat.label}</p>
                        </div>
                    ))}
                </section>
                <section className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="flex flex-col items-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-md mb-6 w-full h-[400px]">
                                    <img src={member.image} alt={member.name} className="w-full h-full rounded-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/f5f5f5/a0a0a0?text=Image'; }}/>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
                                <div className="flex gap-4">
                                    <a href={member.social.twitter} className="text-gray-500 hover:text-red-500"><Icon name="twitter" className="w-6 h-6"/></a>
                                    <a href={member.social.instagram} className="text-gray-500 hover:text-red-500"><Icon name="instagram" className="w-6 h-6"/></a>
                                    <a href={member.social.linkedin} className="text-gray-500 hover:text-red-500"><Icon name="linkedin" className="w-6 h-6"/></a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 gap-2">
                        <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                     {services.map((service) => (
                        <div key={service.title} className="flex flex-col items-center text-center p-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gray-200 dark:bg-gray-700">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black text-white dark:bg-gray-900 dark:text-white">
                                    <Icon name={service.icon} className="w-8 h-8" />
                                </div>
                            </div>
                            <h4 className="font-bold text-xl uppercase text-gray-900 dark:text-white">{service.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{service.description}</p>
                        </div>
                     ))}
                </section>
            </div>
        </div>
    );
};

export default About;

