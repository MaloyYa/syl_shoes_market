import { SvgEmailIcon } from '../../../ui/EmailIcon';
import { SocialLinks } from '../SocialLinks/SocialLinks';
import styles from './Feedback.module.css';

export const Feedback = () => {
    return (
        <div className={styles.feedback}>
            <SocialLinks />
            <div className={styles.email_block}>
                <SvgEmailIcon
                    className={styles.email_icon}
                />
                <a className={styles.email_address}>
                    yaid9072@gmail.com
                </a>
            </div>
        </div>
    );
};
