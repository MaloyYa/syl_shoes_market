import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.css';
export const MainLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Header />

            <Outlet />

            <Footer />
        </div>
    );
};
