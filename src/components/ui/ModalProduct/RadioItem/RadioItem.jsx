import styles from './RadioItem.module.css';
export const RadioItem = (props) => {
    const { selectSize, size, onChange } = props;
    return (
        <label
            htmlFor={`size-${size}`}
            className={`${styles.sizeLabel} ${
                selectSize === size
                    ? styles.selectedSize
                    : ''
            }`}>
            <input
                id={`size-${size}`}
                type="radio"
                value={size}
                name="size"
                onChange={onChange}
                checked={selectSize === size}
                className={styles.sizeItem}
            />
            {size} EUR
        </label>
    );
};
