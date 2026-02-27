import { useState, useEffect } from 'react';
import styles from './PriceFilter.module.css';
export const PriceFilter = (props) => {
    const {
        priceRange,
        absoluteMin,
        absoluteMax,
        onPriceChange,
    } = props;

    const [localMin, setLocalMin] = useState(
        priceRange.minPrice,
    );
    const [localMax, setLocalMax] = useState(
        priceRange.maxPrice,
    );
    const regExpNumber = /^\d*$/;

    useEffect(() => {
        setLocalMin(priceRange.minPrice);
        setLocalMax(priceRange.maxPrice);
    }, [priceRange.minPrice, priceRange.maxPrice]);

    const handleMinPrice = (event) => {
        let newValue;
        if (regExpNumber.test(event.target.value)) {
            newValue = Number(event.target.value);
            if (newValue >= localMax) {
                newValue = localMax - 1;
                setLocalMin(newValue);
                onPriceChange(newValue, localMax);
            } else {
                setLocalMin(newValue);
                onPriceChange(newValue, localMax);
            }
        }
    };

    const handleMaxPrice = (event) => {
        let newValue;
        if (regExpNumber.test(event.target.value)) {
            newValue = Number(event.target.value);
            if (newValue > absoluteMax) {
                newValue = absoluteMax - 1;
                setLocalMax(newValue);
                onPriceChange(localMin, newValue);
            } else {
                setLocalMax(newValue);
                onPriceChange(localMin, newValue);
            }
        }
    };

    return (
        <div className={styles.filterPriceBox}>
            <h4 className={styles.title}>Цена</h4>
            <div className={styles.priceInputsWrapper}>
                <input
                    type="text"
                    minLength={String(absoluteMin).length}
                    maxLength={String(absoluteMax).length}
                    className={styles.filterField}
                    value={localMin}
                    onChange={handleMinPrice}
                />
                <span className={styles.separator}>—</span>
                <input
                    type="text"
                    minLength={String(absoluteMin).length}
                    maxLength={String(absoluteMax).length}
                    className={styles.filterField}
                    value={localMax}
                    onChange={handleMaxPrice}
                    placeholder={`До ${absoluteMax}`}
                    max={absoluteMax}
                />
            </div>
        </div>
    );
};
