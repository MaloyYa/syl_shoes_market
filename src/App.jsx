import { RouterProvider } from 'react-router';

import { AuthForm } from './modules/auth/AuthForm/AuthForm';

import { router } from './router/router';
import { useAuthUser } from './hooks/useAuthUser';
import { useAuthStore } from './modules/auth/useAuthStore';
const App = () => {
    const checked = useAuthStore((state) => state.checked);

    if (!checked) {
        <h1>Загружаем ваши данные</h1>;
    }
    useAuthUser();
    return (
        <>
            <RouterProvider router={router} />
            <AuthForm />
        </>
    );
};

export default App;
