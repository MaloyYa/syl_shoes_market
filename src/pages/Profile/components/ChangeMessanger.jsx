import { useState } from 'react';
import styles from '../Profile.module.css';
import { useFormContext } from 'react-hook-form';

const COMMUNICATION_OPTIONS = [
    {
        pattern:
            /^(https?:\/\/)?(www\.)?vk\.com\/(id\d+|[a-zA-Z0-9_]+)(\/.*)?$/,
        img: '/src/assets/icons/links-icon/vk_logo.svg',
        name: 'VK',
    },
    {
        pattern:
            /^(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_+]+)(\/.*)?$/,
        img: '/src/assets/icons/links-icon/telegram_logo.svg',
        name: 'Telegram',
    },
    {
        pattern:
            /^(https?:\/\/)?(www\.)?max\.ru\/u\/[a-zA-Z0-9]+(\/.*)?$/,
        img: '/src/assets/icons/links-icon/max_logo.png',
        name: 'Max',
    },
];
export const ChangeMessanger = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const [socialOption, setSocialOption] = useState(
        COMMUNICATION_OPTIONS[0],
    );
    const handleChangeSocialOption = (newSocialOption) => {
        setSocialOption(newSocialOption);
    };

    return (
        <div className={styles.changeMessanger}>
            <h4 className={styles.titleList}>
                Выберите удобный способ связи
            </h4>
            <ul className={styles.comOptionsList}>
                {COMMUNICATION_OPTIONS.map(
                    (option, index) => (
                        <li
                            className={`${styles.comOptionItem} `}
                            key={index}
                            onClick={() =>
                                handleChangeSocialOption(
                                    option,
                                )
                            }>
                            <img
                                src={option.img}
                                alt={option.name}
                                className={` ${
                                    styles.optionImg
                                } ${
                                    option.name ===
                                        socialOption.name &&
                                    styles.activeOption
                                }`}
                            />
                        </li>
                    ),
                )}
            </ul>
            <label className={styles.inputBox}>
                <input
                    type="text"
                    placeholder="Ссылка на соц. сеть"
                    className={styles.inputField}
                    {...register('social_link', {
                        required:
                            'Введите ссылку на соцсеть',
                        pattern: {
                            value: socialOption.pattern,
                            message:
                                'Некорректная ссылка на выбранную соцсеть',
                        },
                    })}
                />
                {errors.social_link && (
                    <span className={styles.error}>
                        {errors.social_link.message}
                    </span>
                )}
            </label>
        </div>
    );
};
