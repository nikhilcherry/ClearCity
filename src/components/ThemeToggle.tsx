'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme !== theme) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(savedTheme);
        }
        document.documentElement.classList.remove('dark-theme', 'light-theme');
        document.documentElement.classList.add(`${savedTheme}-theme`);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('dark-theme', 'light-theme');
        document.documentElement.classList.add(`${newTheme}-theme`);
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}
