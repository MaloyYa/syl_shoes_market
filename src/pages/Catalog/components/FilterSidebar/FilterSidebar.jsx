import { useState } from 'react';
import styles from './FilterSidebar.module.css';
import { SizeFilter } from './SizeFilter/SizeFilter';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { CheckBoxFilter } from './CheckBoxFilter/CheckBoxFilter';

export const FilterSidebar = (props) => {
    const {
        filterOptions,
        handleSizeSelect,
        handleCheckBoxChange,
        handlePriceChange,
        handleClearFilter,
        filters,
    } = props;
    const {
        availableSizes,
        brands,
        categories,
        colors,
        minPrice,
        maxPrice,
    } = filterOptions;

    const [isOpen, setOpen] = useState(false);

    return (
        <aside className={styles.sidebar}>
            {!isOpen && (
                <button
                    className={styles.sidebarButton}
                    onClick={() => setOpen(!isOpen)}>
                    Фильтры
                </button>
            )}
            <div
                className={`${styles.filters} ${
                    isOpen && styles.mobileFilters
                }`}>
                {isOpen && (
                    <button
                        className={`${
                            styles.sidebarButton
                        } ${isOpen && styles.openSidebar}`}
                        onClick={() => setOpen(!isOpen)}>
                        ×
                    </button>
                )}
                <SizeFilter
                    selectedSizes={filters.selectedSizes}
                    onSizeSelect={handleSizeSelect}
                    availableSizes={availableSizes}
                />
                <PriceFilter
                    priceRange={filters.price}
                    absoluteMin={minPrice}
                    absoluteMax={maxPrice}
                    onPriceChange={handlePriceChange}
                />
                <CheckBoxFilter
                    title="Бренд"
                    options={brands}
                    selectedValueParameters={
                        filters.selectedBrands
                    }
                    onToggle={(value) =>
                        handleCheckBoxChange(
                            'selectedBrands',
                            value,
                        )
                    }
                />
                <CheckBoxFilter
                    title="Категория"
                    options={categories}
                    selectedValueParameters={
                        filters.selectedCategories
                    }
                    onToggle={(value) =>
                        handleCheckBoxChange(
                            'selectedCategories',
                            value,
                        )
                    }
                />
                <CheckBoxFilter
                    title="Цвет"
                    options={colors}
                    selectedValueParameters={
                        filters.selectedColors
                    }
                    onToggle={(value) =>
                        handleCheckBoxChange(
                            'selectedColors',
                            value,
                        )
                    }
                />

                <button
                    type="button"
                    onClick={() => handleClearFilter()}
                    className={styles.clearFiltesButton}>
                    Сбросить фильтры
                </button>
            </div>
        </aside>
    );
};
