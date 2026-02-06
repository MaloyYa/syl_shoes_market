import styles from './HeroInfo.module.css';
const HeroInfo = () => {
    return (
        <div className={styles.wrapper_info}>
            <h2 className={styles.hero_title}>
                Adidas <br />
                Nite Jogger
            </h2>
            <h3 className={styles.hero_description}>
                Городские кроссовки в ярком стиле 80-х
            </h3>
            <a
                href=""
                className={styles.green_icon_link}>
                Смотреть все
            </a>
        </div>
    );
};
export default HeroInfo;
