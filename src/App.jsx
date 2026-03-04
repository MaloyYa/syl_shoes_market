import { Homepage } from './pages/Homepage/components/Homepage';
import { Catalog } from './pages/Catalog/Catalog';
import { Reviews } from './pages/Reviews/Reviews';
import { Delivery } from './pages/Delivery/Delivery';
import { Routes, Route } from 'react-router';
import { MainLayout } from './MainLayout';
import { FavoriteProducts } from './pages/FavoriteProducts/FavoriteProducts';
import { ShoppingCart } from './pages/ShoppingCart/ShoppingCart';
import { AuthForm } from './modules/auth/AuthForm/AuthForm';
const App = () => {
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
                    <Route
                        path="shopping_cart"
                        element={<ShoppingCart />}
                    />
                    <Route
                        path="favorites"
                        element={<FavoriteProducts />}
                    />
                </Route>
            </Routes>
            <AuthForm />
        </>
    );
};

export default App;
