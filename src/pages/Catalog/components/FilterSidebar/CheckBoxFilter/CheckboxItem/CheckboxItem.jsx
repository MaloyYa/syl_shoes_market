import styles from './CheckboxItem.module.css';
export const CheckboxItem = ({
    value,
    isChecked = false,
    action,
}) => {
    return (
        <label className={styles.checkboxContainer}>
            <input
                type="checkbox"
                value={value}
                checked={isChecked}
                className={styles.inputCheckbox}
                onChange={() => {
                    action(value);
                }}
            />
            <span className={styles.checkboxText}>
                {value}
            </span>
        </label>
    );
};
