import styles from './HeroBunner.module.css';
import HeroBody from './HeroBody/HeroBody';
import HeroBottom from './HeroBottom/HeroBottom';
export const HeroBunner = () => {
    return (
        <section className={styles.hero_bunner}>
            <HeroBody />
            <HeroBottom />
        </section>
    );
};
