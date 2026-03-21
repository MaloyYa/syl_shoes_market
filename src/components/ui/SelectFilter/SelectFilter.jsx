import styles from './SelectFilter.module.css';
export const SelectFilter = ({ value, onChange }) => {
    const options = [
        { value: 'default', label: 'По умолчанию' },
        { value: 'price-asc', label: 'Цена ↑' },
        { value: 'price-desc', label: 'Цена ↓' },
        { value: 'rating', label: 'По рейтингу' },
    ];

    return (
        <label className={styles.selectBox}>
            <span className={styles.span}>Сортировка</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.selectInput}>
                {options.map((option) => (
                    <option
                        value={option.value}
                        className={styles.option}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};
