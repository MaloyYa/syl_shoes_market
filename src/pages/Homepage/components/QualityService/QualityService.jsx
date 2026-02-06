import { SvgConsultation } from './Сonsultation';
import { SvgQuality } from './Quality';
import { SvgDelivery } from './Delivery';
import styles from './QualityService.module.css';
export const QualityService = () => {
    return (
        <section className={styles.quality_service}>
            <SvgQuality />
            <SvgConsultation />
            <SvgDelivery />
        </section>
    );
};
