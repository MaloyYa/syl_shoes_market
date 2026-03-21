import { Homepage } from './pages/Homepage/components/Homepage';
import { Catalog } from './pages/Catalog/Catalog';
import { Reviews } from './pages/Reviews/Reviews';
import { Delivery } from './pages/Delivery/Delivery';
import { Routes, Route } from 'react-router';
import { MainLayout } from './MainLayout';
import { FavoriteProducts } from './pages/FavoriteProducts/FavoriteProducts';
import { ShoppingCart } from './pages/ShoppingCart/ShoppingCart';
import { AuthForm } from './modules/auth/AuthForm/AuthForm';
import { Profile } from './pages/Profile/Profile';
import { useAuthStore } from './modules/auth/useAuthStore';
const App = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<MainLayout />}>
                    <Route
                        index
                        element={<Homepage />}
                    />
                    <Route
                        path="catalog"
                        element={<Catalog />}
                    />
                    <Route
                        path="reviews"
                        element={<Reviews />}
                    />
                    <Route
                        path="delivery"
                        element={<Delivery />}
                    />

                    {isAuth && (
                        <>
                            <Route
                                path="shopping_cart"
                                element={<ShoppingCart />}
                            />
                            <Route
                                path="favorites"
                                element={
                                    <FavoriteProducts />
                                }
                            />
                            <Route
                                path="me"
                                element={<Profile />}
                            />
                        </>
                    )}
                </Route>
            </Routes>
            <AuthForm />
        </>
    );
};

export default App;
