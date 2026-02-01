import styles from './QualityIcon.module.css';
const QualityIcon = (props) => {
    const { src, text } = props;
    return (
        <div className={styles.quality_body}>
            <img
                src={src}
                className={styles.quality_image}
            />
            <p className={styles.quality_text}>{text}</p>
        </div>
    );
};
export default QualityIcon;
