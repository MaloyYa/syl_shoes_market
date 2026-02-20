import styles from './QualityItem.module.css';
export const QualityItem = (props) => {
    const { image, text } = props;
    return (
        <div className={styles.quality_body}>
            <img
                src={image}
                className={styles.quality_image}
            />
            <p className={styles.quality_text}>{text}</p>
        </div>
    );
};
