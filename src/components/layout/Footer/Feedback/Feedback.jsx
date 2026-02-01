import { SocialLinks } from '../SocialLinks/SocialLinks';
import styles from './Feedback.module.css';
export const Feedback = () => {
    return (
        <div className={styles.feedback}>
            <SocialLinks />
            <div className={styles.email_block}>
                <img
                    src="/src/assets/icons/email_icon.svg"
                    className={styles.email_icon}
                />
                <a className={styles.email_address}>
                    yaid9072@gmail.com
                </a>
            </div>
        </div>
    );
};
