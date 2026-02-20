import style from './SizeFilter.module.css';
import { SizeButton } from './SizeButton/SizeButton';
export const SizeFilter = (props) => {
    const {
        selectedSizes = [],
        onSizeSelect,
        sizes,
    } = props;
    const handleSizeClick = (size) => {
        onSizeSelect(size);
    };
    return (
        <div className={style.sizeSection}>
            <h4 className={style.title}>Размеры</h4>
            <div className={style.sizeGrid}>
                {sizes.map((size) => (
                    <li
                        key={size}
                        className={style.li}>
                        <SizeButton
                            size={size}
                            isSelected={selectedSizes.includes(
                                size,
                            )}
                            onClick={() =>
                                handleSizeClick(size)
                            }
                        />
                    </li>
                ))}
            </div>
        </div>
    );
};
