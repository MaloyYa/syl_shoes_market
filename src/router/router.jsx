import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../MainLayout';
import { Homepage } from '../pages/Homepage/Homepage';
import { Catalog } from '../pages/Catalog/Catalog';
import { Reviews } from '../pages/Reviews/Reviews';
import { FavoriteProducts } from '../pages/FavoriteProducts/FavoriteProducts';
import { ShoppingCart } from '../pages/ShoppingCart/ShoppingCart';
import { Profile } from '../pages/Profile/Profile';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Homepage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'reviews', element: <Reviews /> },
            {
                path: 'shopping_cart',
                element: (
                    <ProtectedRoute>
                        <ShoppingCart />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'favorites',
                element: (
                    <ProtectedRoute>
                        <FavoriteProducts />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
