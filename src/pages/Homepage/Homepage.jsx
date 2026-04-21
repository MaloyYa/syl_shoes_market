import { BestProducts } from './components/BestProducts/BestProducts';
import { Brands } from './components/Brands/Brands';
import { HeroBunner } from './components/HeroBunner/HeroBunner';
import { QualityService } from './components/QualityService/QualityService';

import { useEffect, useState } from 'react';
import { BASE_URL } from '../../api/api';

export const Homepage = () => {
    const [products, setProducts] = useState([]);

    const [brands, setBrands] = useState([]);

    const fetchBestProducts = async () => {
        try {
            const request = `${BASE_URL}/products/?page=1&limit=10`;
            const response = await fetch(request, {
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchBrands = async () => {
        const request = `${BASE_URL}/brands/`;
        try {
            const response = await fetch(request, {
                headers: {
                    accept: 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setBrands(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBestProducts();
        fetchBrands();
    }, []);
    return (
        <>
            <main className="main">
                <HeroBunner />
                <BestProducts bestProducts={products} />
                <QualityService />
                <Brands brands={brands} />
            </main>
        </>
    );
};
