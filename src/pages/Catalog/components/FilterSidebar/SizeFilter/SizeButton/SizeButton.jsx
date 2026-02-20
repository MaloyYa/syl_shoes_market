import { memo } from 'react';
import style from './SizeButton.module.css';
export const SizeButton = memo((props) => {
    const { size, isSelected = false, onClick } = props;
    return (
        <button
            type="button"
            className={`${style.btnSize} ${
                isSelected ? style.btnSizeActive : ''
            }`}
            onClick={onClick}>
            {size} eur
        </button>
    );
});
