import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Layout/Header'; // Импортируем новый компонент Header
import Footer from './Layout/Footer'; // Импортируем новый компонент Footer
import Notification from '../src/components/Notification'; // ✨ Импортируем

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#131c25] dark:text-[#ffffffd3] text-[#274C5B]">
      <Header />
      <main className="w-[90%] mx-auto py-5 flex-1">
        <Outlet />
      </main>
      <Footer />
      <Notification /> {/* ✨ Добавляем компонент уведомлений */}
    </div>
  );
};

export default Layout;

