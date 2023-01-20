import { useState, useEffect } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState(0);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(document.body.clientWidth);
        };

        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return windowSize;
}

export default useWindowSize;