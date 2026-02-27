import { FilterSidebar } from './components/FilterSidebar/FilterSidebar';
import { BodyCatalog } from './components/BodyCatalog/BodyCatalog';
import { mockProducts } from '../../mock/mockProducts';
import { useState } from 'react';
import styles from './Catalog.module.css';
import { useFilterOptions } from './hooks/useFilterOptions';

export const Catalog = () => {
    //здесь потом сделать ручку для получения всех товаров
    const allProducts = mockProducts;

    const filterOptions = useFilterOptions(allProducts);

    const [filters, setFilters] = useState({
        selectedSizes: [],
        price: {
            minPrice: filterOptions.minPrice,
            maxPrice: filterOptions.maxPrice,
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
            price: { minPrice: newMin, maxPrice: newMax },
        }));
        console.log(newMin, newMax);
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
    const clearAllFilters = () => {
        setFilters({
            selectedSizes: [],
            price: {
                minPrice: filterOptions.minPrice,
                maxPrice: filterOptions.maxPrice,
            },
            selectedBrands: [],
            selectedCategories: [],
            selectedColors: [],
        });
    };
    return (
        <main className={styles.main}>
            <FilterSidebar
                filterOptions={filterOptions}
                handleSizeSelect={handleSizeSelect}
                handlePriceChange={handlePriceChange}
                handleCheckBoxChange={handleCheckBoxChange}
                handleClearFilter={clearAllFilters}
                filters={filters}
            />
            <BodyCatalog filtes={filters} />
        </main>
    );
};
