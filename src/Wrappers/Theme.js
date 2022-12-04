import React from 'react';
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function Theme(props) {
    const [theme, setTheme] = useState('Light');

    const toggleTheme = () => {
        setTheme((curTheme) => curTheme === "Light" ? "Dark" : "Light");
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default Theme;