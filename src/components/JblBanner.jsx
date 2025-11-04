import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import speaker from '../assets/speaker.png';

const TimerCircle = ({ value, label }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white text-black rounded-full w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center font-semibold">
            <span className="text-lg sm:text-xl">{value < 10 ? `0${value}` : value}</span>
            <span className="text-xs sm:text-sm">{t(label)}</span>
        </div>
    );
};

const JblBanner = () => {
    const { t } = useTranslation();

    const calculateTimeLeft = () => {
        const difference = +new Date("2025-10-25T23:59:59") - +new Date();
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

    return (
        <section className="bg-black text-white py-8 px-4 flex flex-col rounded-md my-8 md:flex-row md:py-12 md:px-8 md:my-12">
            
            <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
                <p className="text-green-500 font-semibold text-sm md:text-base">{t('Categories')}</p>
                {/* ✨ ИСПРАВЛЕНИЕ: Используем dangerouslySetInnerHTML для заголовка с переносом строки */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" dangerouslySetInnerHTML={{ __html: t('Enhance Your Music Experience HTML') }} />

                <div className="flex gap-3 sm:gap-5 justify-center md:justify-start">
                    <TimerCircle value={timeLeft.days || 0} label="Days" />
                    <TimerCircle value={timeLeft.hours || 0} label="Hours" />
                    <TimerCircle value={timeLeft.minutes || 0} label="Minutes" />
                    <TimerCircle value={timeLeft.seconds || 0} label="Seconds" />
                </div>

                <button className="bg-green-500 text-white font-semibold py-3 px-8 rounded-md w-fit hover:bg-green-600 transition-colors text-sm md:py-4 md:px-10 md:text-base">
                    {t('Buy Now!')}
                </button>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
                <img 
                    src={speaker} 
                    alt="JBL Speaker" 
                    className="w-full max-w-sm h-auto md:max-w-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x300/000000/FFFFFF?text=JBL+Image'; }}
                />
            </div>
        </section>
    );
};

export default JblBanner;

