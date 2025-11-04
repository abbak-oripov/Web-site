import React from 'react';
import { useTranslation } from 'react-i18next';
import { Smartphone, Laptop, Watch, Camera, Headphones, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';

// Компонент для выбора иконки
const CategoryIcon = ({ name }) => {
    const iconProps = { className: "w-14 h-14 text-black dark:text-white group-hover:text-white transition-colors duration-300" };
    const icons = {
        Phones: <Smartphone {...iconProps} />,
        Computers: <Laptop {...iconProps} />,
        SmartWatch: <Watch {...iconProps} />,
        Camera: <Camera {...iconProps} />,
        Headphones: <Headphones {...iconProps} />,
        Gaming: <Gamepad2 {...iconProps} />,
    };
    return icons[name] || null;
};

// Компонент для одного элемента категории
const CategoryItem = ({ icon, label }) => {
    const { t } = useTranslation();
    return (
        <div className="group flex flex-col items-center justify-center gap-4 w-full h-40 border border-black/30 dark:border-white/30 rounded hover:bg-red-500 transition-colors duration-300 cursor-pointer text-black dark:text-white hover:text-white">
            <CategoryIcon name={icon} />
            <span className="font-medium">{t(label)}</span>
        </div>
    );
};

const CategoryBrowser = () => {
    const { t } = useTranslation();

    const categories = [
        { icon: 'Phones', label: 'Phones' },
        { icon: 'Computers', label: 'Computers' },
        { icon: 'SmartWatch', label: 'SmartWatch' },
        { icon: 'Camera', label: 'Camera' },
        { icon: 'Headphones', label: 'Headphones' },
        { icon: 'Gaming', label: 'Gaming' },
    ];
    
    return (
        <div className="my-8 md:my-12">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-2 h-10 bg-red-500 rounded"></div>
                        <p className="text-red-500">{t('Categories')}</p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{t('Browse By Category')}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
            
            {/* ✨ ИСПРАВЛЕНИЕ: flex заменен на grid для правильной адаптивности */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                    <CategoryItem key={cat.label} icon={cat.icon} label={cat.label} />
                ))}
            </div>
        </div>
    );
};

export default CategoryBrowser;

