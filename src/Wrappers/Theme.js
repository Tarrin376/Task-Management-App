import React from 'react';
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function Theme(props) {
    const [theme, setTheme] = useState(false);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default Theme;