import styles from './HeroBody.module.css';
import HeroInfo from '../HeroInfo/HeroInfo';
const HeroBody = () => {
    return (
        <div className={styles.hero_body}>
            <HeroInfo />
            <div className={styles.img_background}>
                <img
                    src="/src/assets/images/adidas-Nite-Jogger-Solar-Orange-G26313-Release-Date-2 2.svg"
                    alt=""
                />
            </div>
        </div>
    );
};
export default HeroBody;
