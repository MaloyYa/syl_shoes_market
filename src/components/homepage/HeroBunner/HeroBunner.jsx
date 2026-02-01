import styles from './HeroBunner.module.css';
import HeroBody from './HeroBody/HeroBody';
import HeroBottom from './HeroBottom/HeroBottom';
const HeroBunner = () => {
    return (
        <section className={styles.hero_bunner}>
            <HeroBody />
            <HeroBottom />
        </section>
    );
};
export default HeroBunner;
