import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext.jsx';

// Импорты страниц
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import Sign_up from './Pages/Sign_up.jsx';
import ExploreProducts from "./Pages/ExploreProducts.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";
import Wishlist from './Pages/Wishlist.jsx';
import Cart from './Pages/Cart.jsx';
import CheckOut from './Pages/CheckOut.jsx';
import OrderSuccess from './Pages/OrderSuccess.jsx';
import OrderFailure from './Pages/OrderFailure.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import SearchResults from './Pages/SearchResults.jsx'; // ✨ 1. ИМПОРТИРУЙТЕ КОМПОНЕНТ

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "/shop", element: <ShopPage /> },
                { path: "/products", element: <ExploreProducts /> },
                { path: "/Contact", element: <Contact /> },
                { path: "/About", element: <About /> },
                { path: "/Sign_up", element: <Sign_up /> },
                { path: "/category/:categoryId", element: <CategoryPage /> },
                { path: "/Wishlist", element: <Wishlist /> },
                { path: "/Cart", element: <Cart /> },
                { path: "/checkout", element: <CheckOut /> },
                { path: "/order-success", element: <OrderSuccess /> },
                { path: "/order-failure", element: <OrderFailure /> },
                { path: "/product/:productId", element: <ProductDetail /> },
                { path: "/search", element: <SearchResults /> }, // ✨ 2. ДОБАВЬТЕ ЭТОТ МАРШРУТ
                { path: "/account", element: <AccountPage /> },
                { path: "/account/address", element: <AccountPage /> },
                { path: "/account/payment", element: <AccountPage /> },
                { path: "/orders/returns", element: <AccountPage /> },
                { path: "/orders/cancellations", element: <AccountPage /> }
            ]
        }
    ]);

    return (
        <WishlistProvider>
            <div className='bg-white dark:bg-black dark:text-white text-[#274C5B] min-h-screen'>
                <RouterProvider router={router} />
            </div>
        </WishlistProvider>
    );
}

export default App;