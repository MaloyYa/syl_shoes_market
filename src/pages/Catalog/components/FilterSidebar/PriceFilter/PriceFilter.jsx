import { useState, useEffect } from 'react';
import styles from './PriceFilter.module.css';
//TODO переделать все к хуям собачим с нуля
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

    useEffect(() => {
        setLocalMin(priceRange.minPrice);
        setLocalMax(priceRange.maxPrice);
    }, [priceRange.minPrice, priceRange.maxPrice]);

    const handleMinPrice = (event) => {
        const value = event.target.value;
        let newMinPrice = value === '' ? 0 : Number(value);

        if (newMinPrice < absoluteMin) {
            newMinPrice = absoluteMin;
        }
        if (newMinPrice >= localMax) {
            newMinPrice = localMax - 1;
        }

        setLocalMin(newMinPrice);
        onPriceChange(newMinPrice, localMax);
    };

    const handleMaxPrice = (event) => {
        const newMax = event.target.value;
        setLocalMax(newMax);
        onPriceChange(localMin, newMax);
    };

    return (
        <div className={styles.filterPriceBox}>
            <h4 className={styles.title}>Цена</h4>
            <div className={styles.priceInputsWrapper}>
                <input
                    type="number"
                    className={styles.filterField}
                    value={localMin}
                    onChange={handleMinPrice}
                    step={1}
                />
                <span className={styles.separator}>—</span>
                <input
                    type="number"
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
