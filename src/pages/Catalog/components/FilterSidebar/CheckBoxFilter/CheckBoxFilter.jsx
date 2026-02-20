import styles from './CheckBoxFilter.module.css';

export const CheckBoxFilter = ({
    title,
    options,
    selectedValueParameters = [],
    onToggle,
}) => {
    return (
        <div className={styles.checkboxFilter}>
            <h4 className={styles.titleFilterBox}>
                {title}
            </h4>
            <ul className={styles.checkboxList}>
                {options.map((option) => (
                    <li key={option}>
                        <label
                            className={
                                styles.checkboxContainer
                            }>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedValueParameters.includes(
                                    option,
                                )}
                                className={
                                    styles.inputCheckbox
                                }
                                onChange={() => {
                                    onToggle(option);
                                }}
                            />
                            <span
                                className={
                                    styles.checkboxText
                                }>
                                {option}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
