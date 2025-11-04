import React from 'react';
import { useTranslation } from 'react-i18next'; // ✨ ШАГ 1: Импортируем хук
import gucci from '../assets/gucci.png';
import girl from '../assets/girl.jpg';
import hear from '../assets/hear.png'; 
import ps5 from '../assets/ps5.png';

const FeatureCard = ({ image, title, description, shopLink, className, imageStyle }) => {
    const { t } = useTranslation(); // ✨ Добавляем перевод для кнопки
    return (
        <div 
            className={`relative rounded-md overflow-hidden bg-black text-white p-6 flex flex-col justify-end ${className}`}
        >
            <img 
                src={image} 
                alt={title} 
                className={`absolute ${imageStyle}`} 
            />
            
            <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-sm">{description}</p>
                <a 
                    href={shopLink || "#"} 
                    className="mt-4 inline-block font-semibold border-b-2 border-white pb-1 hover:text-gray-300 hover:border-gray-300 w-fit" 
                >
                    {t('Shop Now')}
                </a>
            </div>
        </div>
    );
};

const NewArrivals = () => {
    const { t } = useTranslation(); // ✨ ШАГ 2: Получаем функцию t для перевода

    return (
        <section className="my-8 md:my-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-8 bg-red-500 rounded"></div>
                {/* ✨ ШАГ 3: Переводим тексты */}
                <p className="text-red-500 font-semibold">{t('Featured')}</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('New Arrival')}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-8">
                
                <FeatureCard 
                    image={ps5}
                    title={t('PlayStation 5')}
                    description={t('Black and White version of the PS5 coming out on sale.')}
                    className="sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[300px]"
                    imageStyle="inset-0 w-full h-full object-contain object-center" 
                />
                
                <FeatureCard 
                    image={girl}
                    title={t("Women's Collections")}
                    description={t('Featured woman collections that give you another vibe.')}
                    className="sm:col-span-2 lg:col-span-2 min-h-[300px]"
                    imageStyle="inset-0 w-full h-full object-cover object-center" 
                />

                <FeatureCard 
                    image={hear}
                    title={t('Speakers')}
                    description={t('Amazon wireless speakers.')}
                    className="min-h-[300px]"
                    imageStyle="inset-0 w-full h-full object-contain object-center" 
                />

                <FeatureCard 
                    image={gucci}
                    title={t('Perfume')}
                    description={t('GUCCI INTENSE OUD EDP')}
                    className="min-h-[300px]"
                    imageStyle="inset-0 w-full h-full object-cover object-center" 
                />
            </div>
        </section>
    );
};

export default NewArrivals;

