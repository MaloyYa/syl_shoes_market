import { BestProducts } from './BestProducts/BestProducts';
import { Brands } from './Brands/Brands';
import { HeroBunner } from './HeroBunner/HeroBunner';
import { QualityService } from './QualityService/QualityService';
import { mockProducts } from '../../../mock/mockProducts';
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
