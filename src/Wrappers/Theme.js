import React from 'react';
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function Theme(props) {
    const defaultTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(defaultTheme ? defaultTheme : 'Dark');

    const toggleTheme = () => {
        const next = theme === "Light" ? "Dark" : "Light";
        localStorage.setItem('theme', next)
        setTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default Theme;