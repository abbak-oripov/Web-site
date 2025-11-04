import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Import your ProductCard

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Get the search query from URL (?q=...)
    const { t, i18n } = useTranslation();

    const [results, setResults] = useState([]); // State to hold search results
    const [isLoading, setIsLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        // Fetch results only if there's a query
        if (query) {
            setIsLoading(true); // Start loading
            setResults([]); // Clear previous results
            const apiHeaders = { headers: { 'Accept-Language': i18n.language } };

            // ✨ MAKE API CALL TO YOUR NEW SEARCH ENDPOINT ✨
            // (You'll need to create this endpoint in your FastAPI backend)
            axios.get(`https://sto-dceb698b9ac9.herokuapp.com/api/products/search?q=${encodeURIComponent(query)}`, apiHeaders)
                .then(response => {
                    setResults(response.data); // Store the found products
                })
                .catch(error => {
                    console.error("Error fetching search results:", error);
                    setResults([]); // Clear results on error
                })
                .finally(() => {
                    setIsLoading(false); // Stop loading
                });
        } else {
            // If no query, show nothing or a prompt to search
            setIsLoading(false);
            setResults([]);
        }
    // Re-run the effect if the query or language changes
    }, [query, i18n.language]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-10">
            {/* Breadcrumbs */}
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                <Link to="/" className="hover:text-red-500">{t('Home')}</Link> /
                <span>{t('Search Results')}</span>
            </p>

            <h1 className="text-3xl font-semibold mb-8">
                {query ? `${t('Search Results for')}: "${query}"` : t('Please enter a search term')}
            </h1>

            {/* Display Logic */}
            {isLoading ? (
                // Loading State
                <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                    {t('Loading search results...')}
                </p>
            ) : results.length > 0 ? (
                // Results Found State
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                // No Results State (and also if query was empty)
                <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                    {query ? t('No products found matching your search.') : t('Enter a term in the search bar above.')}
                    {/* Add translation keys for these messages */}
                </p>
            )}
        </div>
    );
};

export default SearchResults;