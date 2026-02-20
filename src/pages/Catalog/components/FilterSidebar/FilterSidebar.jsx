import { useState } from 'react';
import styles from './Sidebar.module.css';
import { SizeFilter } from './SizeFilter/SizeFilter';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { CheckBoxFilter } from './CheckBoxFilter/CheckBoxFilter';
export const FilterSidebar = (props) => {
    const { filterOptions, onApplyFilters } = props;
    const {
        sizes,
        brands,
        categories,
        colors,
        minPrice,
        maxPrice,
    } = filterOptions;

    const [filters, setFilters] = useState({
        selectedSizes: [],
        price: {
            minPrice: minPrice,
            maxPrice: maxPrice,
        },
        selectedBrands: [],
        selectedCategories: [],
        selectedColors: [],
    });

    const handleSizeSelect = (size) => {
        setFilters((prev) => ({
            ...prev,
            selectedSizes: prev.selectedSizes.includes(size)
                ? prev.selectedSizes.filter(
                      (s) => s !== size,
                  )
                : [...prev.selectedSizes, size],
        }));
    };
    const handlePriceChange = (newMin, newMax) => {
        setFilters((prev) => ({
            ...prev,
            size: { minPrice: newMin, maxPrice: newMax },
        }));
    };
    const handleCheckBoxChange = (nameFilter, newValue) => {
        setFilters((prev) => {
            const currentArray = prev[nameFilter] || [];
            console.log(currentArray);
            return {
                ...prev,
                [nameFilter]: currentArray.includes(
                    newValue,
                )
                    ? currentArray.filter(
                          (value) => value !== newValue,
                      )
                    : [...currentArray, newValue],
            };
        });
    };

    return (
        <aside className={styles.sidebar}>
            <SizeFilter
                selectedSizes={filters.selectedSizes}
                onSizeSelect={handleSizeSelect}
                sizes={sizes}
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
        </aside>
    );
};
