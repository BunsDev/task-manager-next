"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => {
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

    return <NextTopLoader color={color} showSpinner={false} />;

}

export default TopLoader
