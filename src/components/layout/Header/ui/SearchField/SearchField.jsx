import { SvgSearchLoop } from '../../../../ui/SearchLoop';
import styles from './SearchField.module.css';
const SearchField = () => {
    return (
        <form
            className={styles.search_form}
            action="">
            <input
                type="text"
                placeholder="Поиск"
                className={styles.search_input}
            />
            <button
                type="submit"
                className={styles.search_button}>
                <SvgSearchLoop
                    className={styles.loop_icon}
                />
            </button>
        </form>
    );
};
export default SearchField;
