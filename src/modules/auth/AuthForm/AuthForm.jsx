import styles from './AuthForm.module.css';
import { createPortal } from 'react-dom';
// import { useAuthStore } from '../useAuthStore';
import { useFocus } from '../../../hooks/useFocus';
import { useRef, useState } from 'react';
import { LoginForm } from './Forms/LoginForm';

import { RegistrationForm } from './Forms/RegistrationForm';
import { useBlockScrollWindow } from '../../../hooks/useBlockScrollWindow';
import { useAuthFormStore } from './useAuthFormStore';

export const AuthForm = () => {
    const portal = document.getElementById('portal');

    const isOpen = useAuthFormStore(
        (state) => state.isVisibleForm,
    );

    useBlockScrollWindow(isOpen);

    const setVisibleAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );
    const [currentForm, setCurrentForm] = useState('login');

    const [isBlocked, setIsBlocked] = useState(false);

    const authModalRef = useRef(null);

    const changeCurrentFormWithDelay = (newForm) => {
        if (isBlocked || currentForm === newForm) return;

        setIsBlocked(true);
        setCurrentForm(newForm);

        setTimeout(() => {
            setIsBlocked(false);
        }, 700);
        clearTimeout();
    };

    useFocus(isOpen, authModalRef, () =>
        setVisibleAuthForm(false),
    );

    if (!portal) {
        return null;
    }

    if (!isOpen) {
        return null;
    } else {
        return createPortal(
            <div className={styles.overlay}>
                <div
                    ref={authModalRef}
                    className={styles.authBlock}>
                    <button
                        disabled={isBlocked}
                        className={styles.btnClose}
                        onClick={() => {
                            event.preventDefault();
                            setVisibleAuthForm(false);
                        }}>
                        ×
                    </button>
                    <div className={styles.selectAction}>
                        <button
                            disabled={isBlocked}
                            className={`${
                                styles.btnSwapForm
                            } ${
                                currentForm === 'login'
                                    ? styles.active
                                    : ''
                            }`}
                            onClick={() =>
                                changeCurrentFormWithDelay(
                                    'login',
                                )
                            }>
                            Авторизация
                        </button>
                        {' | '}
                        <button
                            disabled={isBlocked}
                            className={`${
                                styles.btnSwapForm
                            } ${
                                currentForm ===
                                'registration'
                                    ? styles.active
                                    : ''
                            }`}
                            onClick={() =>
                                changeCurrentFormWithDelay(
                                    'registration',
                                )
                            }>
                            Регистрация
                        </button>
                    </div>

                    {currentForm === 'login' ? (
                        <LoginForm />
                    ) : (
                        <RegistrationForm />
                    )}
                </div>
            </div>,
            portal,
        );
    }
};
