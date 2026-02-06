import { SvgSylLogo } from '../../ui/SylLogo.jsx';
import { Feedback } from './Feedback/Feedback';
import styles from './Footer.module.css';
import { ListLinkPage } from './ListLinkPage/ListLinkPage.jsx';
import { SocialLinks } from './SocialLinks/SocialLinks.jsx';
export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <SvgSylLogo className={styles.logo} />
            <Feedback />
            <ListLinkPage />
        </footer>
    );
};
