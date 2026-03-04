import { createPortal } from 'react-dom';
import { useAuthStore } from '../useAuthStore';
import styles from './AuthForm.module.css';
import { useFocus } from '../../../hooks/useFocus';
import { useRef, useState } from 'react';
import { LoginForm } from './Forms/LoginForm';
import { useForm } from 'react-hook-form';
import { RegistrationForm } from './Forms/RegistrationForm';
import { useBlockScrollWindow } from '../../../hooks/useBlockScrollWindow';

export const AuthForm = () => {
    const portal = document.getElementById('portal');

    const { handleSubmit } = useForm();

    const isOpen = useAuthStore(
        (state) => state.isVisibleForm,
    );

    useBlockScrollWindow(isOpen);

    const setVisibleAuthForm = useAuthStore(
        (state) => state.setVisibilityForm,
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
    };

    useFocus(isOpen, authModalRef, () =>
        setVisibleAuthForm(false),
    );

    if (!portal) {
        return null;
    }

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
    };

    if (!isOpen) {
        return null;
    } else {
        return createPortal(
            <div className={styles.overlay}>
                <div
                    onSubmit={handleSubmit(onSubmit)}
                    ref={authModalRef}
                    className={styles.authBlock}>
                    <button
                        disabled={isBlocked}
                        className={styles.btnClose}
                        onClick={() =>
                            setVisibleAuthForm(false)
                        }>
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
