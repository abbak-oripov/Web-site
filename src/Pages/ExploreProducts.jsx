// src/Pages/ExploreProducts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Убедитесь, что у вас есть этот компонент

const ExploreProducts = () => {
  // Состояния для хранения списка продуктов, категорий и выбранной категории
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null означает "All products"

  // Загружаем категории при первом рендере компонента
  useEffect(() => {
    axios.get("https://sto-dceb698b9ac9.herokuapp.com/api/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  // Этот useEffect будет срабатывать каждый раз, когда меняется selectedCategoryId
  useEffect(() => {
    let url = "https://sto-dceb698b9ac9.herokuapp.com/api/products"; // URL по умолчанию для всех продуктов

    // Если выбрана конкретная категория, меняем URL
    if (selectedCategoryId) {
      url = `https://sto-dceb698b9ac9.herokuapp.com/api/products/category/${selectedCategoryId}`;
    }

    // Запрашиваем продукты по сформированному URL
    axios.get(url)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error("Error fetching products:", error));

  }, [selectedCategoryId]); // Зависимость от selectedCategoryId

  // Функция для обработки клика по категории
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- Боковая панель с фильтрами --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-bold mb-4">Category</h2>
          <nav className="flex flex-col gap-2">
            {/* Кнопка для сброса фильтра и показа всех продуктов */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(null);
              }}
              className={`p-2 rounded-md hover:bg-red-100 ${!selectedCategoryId ? 'bg-red-500 text-white' : 'text-gray-700'}`}
            >
              All products
            </a>
            {/* Рендерим список категорий */}
            {categories.map(category => (
              <a 
                key={category.id} 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }}
                className={`p-2 rounded-md hover:bg-red-100 ${selectedCategoryId === category.id ? 'bg-red-500 text-white' : 'text-gray-700'}`}
              >
                {category.name}
              </a>
            ))}
          </nav>
          {/* Здесь можно будет добавить другие фильтры (Brands, Price, etc.) */}
        </aside>

        {/* --- Основной контент с карточками товаров --- */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          {/* Тут можно добавить заголовок и сортировку */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Loading products...</p> // Сообщение во время загрузки
            )}
          </div>
        </main>

      </div>
    </div>
  );
};

export default ExploreProducts;