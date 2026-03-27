import styles from '../Profile.module.css';

import { ChangeMessanger } from './ChangeMessanger';
import { ChangeEmailAndPhone } from './ChangeEmailAndPhone';

export const ChangeContact = () => {
    return (
        <div className={styles.blockCategoryInfo}>
            <ChangeEmailAndPhone />
            <ChangeMessanger />
        </div>
    );
};
