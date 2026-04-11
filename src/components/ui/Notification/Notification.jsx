import { createPortal } from 'react-dom';

import styles from './Notification.module.css';
import { SvgErrorIcon } from '../ErrorIcon';
import { SvgSuccesfullyIcon } from '../SuccesfullyIcon';
import { useEffect } from 'react';

export const Notification = ({
    isOpen,
    onClose,
    isFailed,
    text,
    duration = 4000,
}) => {
    const portal = document.getElementById('portal');
    const barColor = isFailed
        ? '#ff4d4f'
        : 'var(--light-green-color)';

    useEffect(() => {
        const timer = setTimeout(onClose, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose, duration]);
    if (!portal || !isOpen) {
        return null;
    }

    return createPortal(
        <div className={styles.overlay}>
            <div className={styles.notification}>
                {isFailed ? (
                    <SvgErrorIcon />
                ) : (
                    <SvgSuccesfullyIcon />
                )}
                <div className={styles.textNotification}>
                    {text}
                </div>
                <span
                    className={styles.progressBar}
                    style={{
                        backgroundColor: barColor,
                        animationDuration: `${duration}ms`,
                    }}></span>
            </div>
        </div>,
        portal,
    );
};
