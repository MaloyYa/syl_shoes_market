import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';
import { Homepage } from './pages/Homepage/components/Homepage';
import { Catalog } from './pages/Catalog/Catalog';
import { Reviews } from './pages/Reviews/Reviews';
import { Delivery } from './pages/Delivery/Delivery';
import { Routes, Route } from 'react-router';
import { MainLayout } from './MainLayout';
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
                </Route>
            </Routes>
        </>
    );
};

export default App;
