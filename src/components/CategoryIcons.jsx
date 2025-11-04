import React from 'react';

// Импортируем иконки из MUI и СРАЗУ ПЕРЕИМЕНОВЫВАЕМ их, чтобы избежать конфликта имен
import MuiPhoneIcon from '@mui/icons-material/PhoneIphone';
import MuiComputerIcon from '@mui/icons-material/Computer';
import MuiWatchIcon from '@mui/icons-material/Watch';
import MuiCameraIcon from '@mui/icons-material/CameraAltOutlined';
import MuiHeadphonesIcon from '@mui/icons-material/HeadphonesOutlined';
import MuiGamingIcon from '@mui/icons-material/SportsEsportsOutlined';

// Общие стили для всех иконок, чтобы соответствовать размеру w-12 h-12 (48px)
const iconStyle = {
    width: 48,
    height: 48,
    color: '#333' // Можете задать любой цвет по умолчанию
};

// Теперь мы экспортируем наши компоненты с оригинальными именами,
// а внутри используем переименованные иконки из MUI.
export const PhoneIcon = () => <MuiPhoneIcon sx={iconStyle} />;

export const ComputerIcon = () => <MuiComputerIcon sx={iconStyle} />;

export const SmartWatchIcon = () => <MuiWatchIcon sx={iconStyle} />;

export const CameraIcon = () => <MuiCameraIcon sx={iconStyle} />;

export const HeadPhonesIcon = () => <MuiHeadphonesIcon sx={iconStyle} />;

export const GamingIcon = () => <MuiGamingIcon sx={iconStyle} />;