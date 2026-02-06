import { BestProducts } from './BestProducts/BestProducts';
import { Brands } from './Brands/Brands';
import { HeroBunner } from './HeroBunner/HeroBunner';
import { QualityService } from './QualityService/QualityService';
import { bestProducts } from '/src/mock/mockBestProducts';
import { brands } from '/src/mock/mockBrands';

export const Homepage = () => {
    return (
        <>
            <main className="main">
                <HeroBunner />
                <BestProducts bestProducts={bestProducts} />
                <QualityService />
                <Brands brands={brands} />
            </main>
        </>
    );
};
