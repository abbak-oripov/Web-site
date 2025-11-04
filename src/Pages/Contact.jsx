import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✨ Импортируем хук

// Иконка телефона
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

// Иконка письма
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);


const Contact = () => {
  const { t } = useTranslation(); // ✨ Получаем функцию перевода

  return (
    <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-gray-800 dark:hover:text-white">{t('Home')}</Link>
          <span className="mx-2">/</span>
          <span>{t('Contact')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 shadow-md rounded-md border border-gray-200 dark:border-gray-700">
            
            <div className="flex flex-col mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 rounded-full p-2 text-white">
                  <PhoneIcon />
                </div>
                {/* ✨ Переводим тексты */}
                <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-white">{t('Call To Us')}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{t('We are available 24/7, 7 days a week.')}</p>
              <p className="text-gray-600 dark:text-gray-300">Phone: +8801611112222</p>
            </div>
            
            <hr className="my-8 border-gray-200 dark:border-gray-600" />
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 rounded-full p-2 text-white">
                  <MailIcon />
                </div>
                <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-white">{t('Write To US')}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{t('Fill out our form and we will contact you within 24 hours.')}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Emails: customer@exclusive.com</p>
              <p className="text-gray-600 dark:text-gray-300">Emails: support@exclusive.com</p>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 shadow-md rounded-md border border-gray-200 dark:border-gray-700">
            <form action="#" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder={t('Your Name')} 
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md py-3 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder={t('Your Email')} 
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md py-3 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  placeholder={t('Your Phone')} 
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md py-3 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div className="mb-6">
                <textarea 
                  name="message" 
                  id="message" 
                  rows="8" 
                  placeholder={t('Your Message')} 
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md py-3 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              
              <div className="text-right">
                <button 
                  type="submit" 
                  className="bg-red-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  {t('Send Message')}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;