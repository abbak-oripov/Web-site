import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 2000); // Уведомление исчезнет через 2 секунды
    }, []);

    const value = { showNotification, notification };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
