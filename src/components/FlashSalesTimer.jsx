import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // ✨ ШАГ 1: Импортируем хук

const FlashSalesTimer = () => {
    const { t } = useTranslation(); // ✨ ШАГ 2: Получаем функцию перевода

    const calculateTimeLeft = () => {
        // Установите здесь вашу дату окончания акции
        const difference = +new Date("2025-10-20T23:59:59") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const addLeadingZero = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    return (
        <div className="my-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-10 bg-red-500 rounded"></div>
                {/* ✨ ШАГ 3: Переводим тексты */}
                <p className="text-red-500 font-semibold">{t("Today's")}</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wider">{t('Flash Sales')}</h2>
                <div className="flex items-end gap-4 text-center font-mono">
                    <div>
                        <p className="text-xs font-semibold">{t('Days')}</p>
                        <p className="text-3xl font-bold">{addLeadingZero(timeLeft.days || 0)}</p>
                    </div>
                    <span className="text-2xl font-bold text-red-500 pb-1">:</span>
                    <div>
                        <p className="text-xs font-semibold">{t('Hours')}</p>
                        <p className="text-3xl font-bold">{addLeadingZero(timeLeft.hours || 0)}</p>
                    </div>
                    <span className="text-2xl font-bold text-red-500 pb-1">:</span>
                    <div>
                        <p className="text-xs font-semibold">{t('Minutes')}</p>
                        <p className="text-3xl font-bold">{addLeadingZero(timeLeft.minutes || 0)}</p>
                    </div>
                    <span className="text-2xl font-bold text-red-500 pb-1">:</span>
                    <div>
                        <p className="text-xs font-semibold">{t('Seconds')}</p>
                        <p className="text-3xl font-bold">{addLeadingZero(timeLeft.seconds || 0)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSalesTimer;