import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Filter, X } from 'lucide-react'; // ✨ Импортируем иконки

const CategoryPage = () => {
    const { categoryId } = useParams();
    const { i18n, t } = useTranslation();

    // --- Состояния ---
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // ✨ Новое состояние для мобильных фильтров

    // --- Состояния для фильтров и сортировки ---
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedCondition, setSelectedCondition] = useState('Any');
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortOrder, setSortOrder] = useState('popularity');

    // --- Загрузка данных с API ---
    useEffect(() => {
        setIsLoading(true);
        const apiHeaders = { headers: { 'Accept-Language': i18n.language } };

        axios.get(`https://sto-dceb698b9ac9.herokuapp.com/api/products/category/${categoryId}`, apiHeaders)
            .then(response => {
                setOriginalProducts(response.data);
            })
            .catch(error => console.error("Error fetching category products:", error))
            .finally(() => setIsLoading(false));

        axios.get("https://sto-dceb698b9ac9.herokuapp.com/api/categories", apiHeaders)
            .then(response => {
                setAllCategories(response.data);
                const currentCategory = response.data.find(cat => cat.id === parseInt(categoryId));
                if (currentCategory) setCategoryName(currentCategory.name);
            });
    }, [categoryId, i18n.language]);

    // --- Применение фильтров и сортировки ---
    useEffect(() => {
        let tempProducts = [...originalProducts];
        
        tempProducts = tempProducts.filter(p => p.price <= maxPrice);
        if (selectedCondition !== 'Any') {
             tempProducts = tempProducts.filter(p => p.condition === selectedCondition);
        }
        if (selectedRating > 0) {
            tempProducts = tempProducts.filter(p => Math.round(p.rating) >= selectedRating);
        }

        if (sortOrder === 'low-to-high') {
            tempProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-to-low') {
            tempProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(tempProducts);

    }, [maxPrice, selectedCondition, selectedRating, originalProducts, sortOrder]);

    // --- Функции-обработчики ---
    const handleRatingChange = (rating) => setSelectedRating(prev => (prev === rating ? 0 : rating));
    const handleSortChange = (e) => setSortOrder(e.target.value);
    
    const handleResetFilters = () => {
        setMaxPrice(1000);
        setSelectedCondition('Any');
        setSelectedRating(0);
        setSortOrder('popularity');
        setIsFilterOpen(false); // Закрываем панель после сброса
    };

    const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items'];
    
    // Компонент сайдбара вынесен для чистоты кода
    const FilterSidebar = () => (
        <>
            {/* Categories */}
            <div className='mb-6'>
                <h3 className="font-bold text-lg mb-3">{t('Categories')}</h3>
                <nav className="flex flex-col gap-2">
                    {allCategories.map(cat => (
                        <Link 
                            key={cat.id}
                            to={`/category/${cat.id}`}
                            onClick={() => setIsFilterOpen(false)}
                            className={`p-2 rounded-md ${parseInt(categoryId) === cat.id ? 'bg-red-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Price Range */}
            <div className='mb-6'>
                <h3 className="font-bold text-lg mb-3">{t('Price range')}</h3>
                <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                <div className="flex justify-between text-sm mt-2"><span>$0</span><span>${maxPrice}</span></div>
            </div>

            {/* Condition */}
            <div className='mb-6'>
                <h3 className="font-bold text-lg mb-3">{t('Condition')}</h3>
                {conditions.map(cond => (
                     <div key={cond} className="flex items-center mb-2">
                        <input type="radio" id={cond} name="condition" value={cond} checked={selectedCondition === cond} onChange={e => setSelectedCondition(e.target.value)} className="mr-2" />
                        <label htmlFor={cond}>{t(cond)}</label>
                    </div>
                ))}
            </div>

            {/* Ratings */}
            <div className='mb-6'>
                <h3 className="font-bold text-lg mb-3">{t('Ratings')}</h3>
                {[5, 4, 3, 2, 1].map(rating => (
                     <div key={rating} onClick={() => handleRatingChange(rating)} className="flex items-center mb-2 cursor-pointer">
                        <input type="checkbox" checked={selectedRating === rating} readOnly className="mr-2 pointer-events-none" />
                        {[...Array(5)].map((_, i) => i < rating ? <FaStar key={i} className="text-yellow-400"/> : <FaRegStar key={i} className="text-gray-400"/>)}
                    </div>
                ))}
            </div>
            
            {/* Reset Button */}
            <button onClick={handleResetFilters} className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">{t('Reset Filters')}</button>
        </>
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t('Home')} / <span>{categoryName}</span></p>
                
                {/* ✨ Кнопки управления для мобильной и ПК версий */}
                <div className="flex items-center gap-4">
                    {/* Кнопка Фильтр для мобильных */}
                    <button onClick={() => setIsFilterOpen(true)} className="md:hidden flex items-center gap-2 border p-2 rounded-md">
                        <Filter size={20} />
                        <span>{t('Filter')}</span>
                    </button>
                    {/* Сортировка для ПК */}
                    <select value={sortOrder} onChange={handleSortChange} className="hidden md:block border p-2 rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option value="popularity">{t('Popularity')}</option>
                        <option value="low-to-high">{t('Price: Low to High')}</option>
                        <option value="high-to-low">{t('Price: High to Low')}</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* --- Сайдбар для ПК --- */}
                <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
                    <FilterSidebar />
                </aside>

                {/* --- Выезжающий сайдбар для мобильных --- */}
                {isFilterOpen && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)}>
                        <aside 
                            onClick={(e) => e.stopPropagation()}
                            className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-800 z-50 p-6 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold">{t('Filters')}</h2>
                                <button onClick={() => setIsFilterOpen(false)}><X/></button>
                            </div>
                            {/* Выпадающий список сортировки теперь внутри мобильного фильтра */}
                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-3">{t('Sort By')}</h3>
                                 <select value={sortOrder} onChange={handleSortChange} className="w-full border p-2 rounded-md dark:bg-gray-700 dark:border-gray-600">
                                    <option value="popularity">{t('Popularity')}</option>
                                    <option value="low-to-high">{t('Price: Low to High')}</option>
                                    <option value="high-to-low">{t('Price: High to Low')}</option>
                                </select>
                            </div>
                            <FilterSidebar />
                        </aside>
                    </div>
                )}

                {/* --- Основной контент --- */}
                <main className="w-full md:w-3/4 lg:w-4/5">
                    {isLoading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p className="col-span-full text-center">{t('No products match the selected filters.')}</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CategoryPage;