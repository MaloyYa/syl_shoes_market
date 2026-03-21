import { useState, useRef, memo, useEffect } from 'react';
import styles from './DropdownSort.module.css';
import { SortIcon } from '../../../../components/ui/SortICon';
import { useFocus } from '../../../../hooks/useFocus';

export const DropdownSort = memo(
    ({
        sortBy,
        onSortChange,
        options = [
            { value: 'default', label: 'По умолчанию' },
            { value: 'newest', label: 'Сначала новые' },
            { value: 'oldest', label: 'Сначала старые' },
            { value: 'rating', label: 'По рейтингу' },
        ],
    }) => {
        const [isOpen, setOpen] = useState(false);

        const listOptionsRef = useRef(null);

        const [sizeIcon, setSizeIcon] = useState(30);

        useEffect(() => {
            const handleResize = () => {
                const width = window.innerWidth;

                if (width < 768) {
                    setSizeIcon(20);
                } else {
                    setSizeIcon(30);
                }
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener(
                    'resize',
                    handleResize,
                );
            };
        }, []);

        useFocus(isOpen, listOptionsRef, setOpen);

        const currentOption = options.find(
            (option) => option.value === sortBy,
        );
        const handleClick = (value) => {
            onSortChange(value);
            setOpen(false);
        };

        return (
            <div
                className={styles.dropDownSort}
                ref={listOptionsRef}>
                <button
                    className={styles.sortButton}
                    onClick={() => setOpen(!isOpen)}>
                    <span className={styles.sortButtonText}>
                        {currentOption?.label ||
                            'Сортировать по'}
                    </span>
                    <SortIcon
                        width={sizeIcon}
                        height={sizeIcon}
                        fill={'var(--blue-color)'}
                    />
                </button>
                {isOpen && (
                    <ul className={styles.sortMenu}>
                        {options.map((option) => {
                            return (
                                <li key={option.value}>
                                    <button
                                        onClick={() =>
                                            handleClick(
                                                option.value,
                                            )
                                        }
                                        className={`${
                                            styles.sortListItem
                                        } ${
                                            option.value ===
                                                sortBy &&
                                            styles.activeItem
                                        }`}>
                                        {option.label}
                                        {sortBy ===
                                            option.value && (
                                            <span
                                                className={
                                                    styles.checkmark
                                                }>
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    },
);
