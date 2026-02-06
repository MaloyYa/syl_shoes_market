import HeroLink from '../HeroLink/HeroLink';
import styles from './HeroBottom.module.css';
const HeroBottom = () => {
    return (
        <div className={styles.hero_bottom}>
            <HeroLink
                text="Adidas Yeezy Boost"
                src="/src/assets/images/yellow_shoes.svg"
            />
            <HeroLink
                text="Nike Air Max"
                src="/src/assets/images/white_shoes.svg"
            />
        </div>
    );
};
export default HeroBottom;
