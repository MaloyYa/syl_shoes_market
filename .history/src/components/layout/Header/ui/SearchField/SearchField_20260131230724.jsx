import styles from './SearchField.module.css';
const SearchField = () => {
    return (
        <form
            className={styles.search_form}
            action="">
            <input
                type="text"
                placeholder="Поиск"
                id="search-input"
            />
            <button
                type="submit"
                id="search-button">
                <img
                    src="/src/assets/icons/search-loop.svg"
                    alt=""
                />
            </button>
        </form>
    );
};
export default SearchField;
