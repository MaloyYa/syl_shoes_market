import styles from './CheckBoxFilter.module.css';
import { CheckboxItem } from './CheckboxItem/CheckboxItem';

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
                        <CheckboxItem
                            value={option}
                            isChecked={selectedValueParameters.includes(
                                option,
                            )}
                            action={() => onToggle(option)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
