import React from 'react';
import styles from './HeroLink.module.css';
const HeroLink = (props) => {
    const { href, src, text } = props;
    const words = text.split(' ');
    const firstWord = words[0];
    const restText = words.slice(1).join(' ');

    return (
        <a
            href={href !== undefined ? href : '/'}
            className={styles.link}>
            {src && (
                <img
                    src={src}
                    className={styles.hero_link_image}
                />
            )}

            <div className={styles.text_container}>
                <p className={styles.link_text}>
                    <span className={styles.first_word}>
                        {firstWord}
                    </span>{' '}
                    {restText}
                </p>
            </div>
            <span className={styles.cta}>→</span>
        </a>
    );
};
export default HeroLink;
