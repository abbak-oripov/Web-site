import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { CheckCircle } from 'lucide-react';

const Notification = () => {
    const { notification } = useNotification();

    if (!notification) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out z-50">
            <CheckCircle />
            <span>{notification}</span>
        </div>
    );
};




export default Notification;
