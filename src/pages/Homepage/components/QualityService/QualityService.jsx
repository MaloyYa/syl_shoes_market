import { QualityItem } from './QualityItem/QualityItem';
import styles from './QualityService.module.css';
export const QualityService = () => {
    return (
        <section className={styles.quality_service}>
            <QualityItem
                image="/src/assets/icons/svg/Quality.svg"
                text="Гарантируем качество товара"
            />
            <QualityItem
                image="/src/assets/icons/svg/ Consultation.svg"
                text="Поможем подобрать размер"
            />
            <QualityItem
                image="/src/assets/icons/svg/Delivery.svg"
                text="Быстро доставим покупку"
            />
        </section>
    );
};
