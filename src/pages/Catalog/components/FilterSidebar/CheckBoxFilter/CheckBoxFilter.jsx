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
                {options.map((option) => {
                    const optionValue =
                        option?.value || option;

                    return (
                        <li key={optionValue}>
                            <CheckboxItem
                                value={optionValue}
                                isChecked={selectedValueParameters.includes(
                                    optionValue,
                                )}
                                action={() =>
                                    onToggle(optionValue)
                                }
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
