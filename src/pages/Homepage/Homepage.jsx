import { BestProducts } from './components/BestProducts/BestProducts';
import { Brands } from './components/Brands/Brands';
import { HeroBunner } from './components/HeroBunner/HeroBunner';
import { QualityService } from './components/QualityService/QualityService';
import { mockProducts } from '../../mock/mockProducts';
import { brands } from '/src/mock/mockBrands';

export const Homepage = () => {
    return (
        <>
            <main className="main">
                <HeroBunner />
                <BestProducts bestProducts={mockProducts} />
                <QualityService />
                <Brands brands={brands} />
            </main>
        </>
    );
};
