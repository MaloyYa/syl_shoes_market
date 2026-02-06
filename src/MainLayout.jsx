import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';
import { Homepage } from './pages/Homepage/components/Homepage';
import { Catalog } from './pages/Catalog/Catalog';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.css';
export const MainLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
