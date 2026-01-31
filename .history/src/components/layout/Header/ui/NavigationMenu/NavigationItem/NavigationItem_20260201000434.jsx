import styles from './NavigationItem.module.css';
const NavigationItem = (props) => {
    const { href, title } = props;
    return (
        <li className={styles.navigation_item}>
            <a href={href !== '' ? href : ''}>{title}</a>
        </li>
    );
};
export default NavigationItem;
