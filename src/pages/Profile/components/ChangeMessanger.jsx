import { useState } from 'react';
import styles from '../Profile.module.css';
import { useFormContext } from 'react-hook-form';
import { COMMUNICATION_OPTIONS } from '../constants/communicationOptions.js';

export const ChangeMessanger = () => {
    const {
        register,
        formState: { errors },
        getValues,
    } = useFormContext();
    //получить соц ссылку, чтобы сравнивать паттерны
    const social_link = getValues('social_link') || '';
    let indexInitialPattern = -1;
    if (social_link && typeof social_link === 'string') {
        indexInitialPattern =
            COMMUNICATION_OPTIONS.findIndex((option) =>
                option.pattern.test(social_link),
            );
    }

    const defaultOption = COMMUNICATION_OPTIONS[0];
    const initialOption =
        indexInitialPattern >= 0
            ? COMMUNICATION_OPTIONS[indexInitialPattern]
            : defaultOption;
    const [socialOption, setSocialOption] =
        useState(initialOption);
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
