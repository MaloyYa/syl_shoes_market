import QualityIcon from './QualityIcon./QualityIcon';
import styles from './QualityService.module.css';
const QualityService = () => {
    return (
        <section className={styles.quality_service}>
            <QualityIcon
                src="/src/assets/images/quality.svg"
                text="Гарантируем качество товара"
            />
            <QualityIcon
                src="/src/assets/images/ consultation.svg"
                text="Поможем подобрать размер"
            />
            <QualityIcon
                src="/src/assets/images/delivery.svg"
                text="Быстро доставим покупку"
            />
        </section>
    );
};
export default QualityService;
