import { useEffect } from 'react';
export const useFocus = (isOpen, element, setOpen) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                element.current &&
                !element.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);

        if (isOpen) {
            document.addEventListener(
                'mousedown',
                handleClickOutside,
            );
        }

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );
            document.removeEventListener(
                'keydown',
                handleEscape,
            );
        };
    }, [isOpen]);
};
