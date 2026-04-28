import HeroLink from '../HeroLink/HeroLink';
import styles from './HeroBottom.module.css';
const HeroBottom = () => {
    return (
        <div className={styles.hero_bottom}>
            <HeroLink
                href={'/catalog'}
                text="Adidas Yeezy Boost"
                src="/assets/images/yellow_shoes.svg"
            />
            <HeroLink
                href={'/catalog'}
                text="Nike Air Max"
                src="/assets/images/white_shoes.svg"
            />
        </div>
    );
};
export default HeroBottom;
