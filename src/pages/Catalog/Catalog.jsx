import { FilterSidebar } from './components/FilterSidebar/FilterSidebar';
import { BodyCatalog } from './components/BodyCatalog/BodyCatalog';
import { useCallback, useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import { getFilters } from './hooks/getFilters';

export const Catalog = () => {
    const [filterData, setFilterData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        selectedSizes: [],
        price: {
            minPrice: 0,
            maxPrice: 20000,
        },
        selectedBrands: [],
        selectedCategories: [],
        selectedColors: [],
    });

    useEffect(() => {
        let isMounted = true;

        const fetchFiltersData = async () => {
            setLoading(true);
            console.log();
            try {
                const data = await getFilters();

                if (isMounted) {
                    setFilterData(data);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(
                        'Ошибка при загрузке фильтров:',
                        err,
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchFiltersData();

        return () => {
            isMounted = false; // Очистка эффекта
        };
    }, []);

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
    const handlePriceChange = useCallback(
        (newMin, newMax) => {
            if (window.priceDebounceTimer) {
                clearTimeout(window.priceDebounceTimer);
            }

            window.priceDebounceTimer = setTimeout(() => {
                setFilters((prev) => ({
                    ...prev,
                    price: {
                        minPrice: newMin,
                        maxPrice: newMax,
                    },
                }));
            }, 500);
        },
        [],
    );
    const handleCheckBoxChange = useCallback(
        (nameFilter, newValue) => {
            if (window.checkboxDebounceTimer) {
                clearTimeout(window.checkboxDebounceTimer);
            }
            window.checkboxDebounceTimer = setTimeout(
                () => {
                    setFilters((prev) => {
                        const currentArray =
                            prev[nameFilter] || [];
                        return {
                            ...prev,
                            [nameFilter]:
                                currentArray.includes(
                                    newValue,
                                )
                                    ? currentArray.filter(
                                          (value) =>
                                              value !==
                                              newValue,
                                      )
                                    : [
                                          ...currentArray,
                                          newValue,
                                      ],
                        };
                    });
                },
                500,
            );
        },
        [],
    );

    const clearAllFilters = () => {
        setFilters({
            selectedSizes: [],
            price: {
                minPrice: 0,
                maxPrice: 0,
            },
            selectedBrands: [],
            selectedCategories: [],
            selectedColors: [],
        });
    };
    return (
        <main className={styles.main}>
            {loading ? (
                <p style={{ alignContent: 'center' }}>
                    Загрузка фильтров...
                </p>
            ) : (
                <FilterSidebar
                    filterOptions={{
                        availableSizes:
                            filterData?.availableSizes ||
                            [],
                        brands: filterData?.brands || [],
                        categories:
                            filterData?.categories || [],
                        colors: filterData?.colors || [],
                    }}
                    handleSizeSelect={handleSizeSelect}
                    handlePriceChange={handlePriceChange}
                    handleCheckBoxChange={
                        handleCheckBoxChange
                    }
                    handleClearFilter={clearAllFilters}
                    filters={filters}
                />
            )}
            <BodyCatalog filters={filters} />
        </main>
    );
};
