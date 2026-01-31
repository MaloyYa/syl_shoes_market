import BestProducts from './BestProducts';
import Brands from './Brands';
import HeroBunner from './HeroBunner/HeroBunner';
import QualityService from './QualityService/QualityService';

const MainContent = () => {
    return (
        <main id="main">
            <HeroBunner />
            <BestProducts />
            <QualityService></QualityService>
            <Brands />
        </main>
    );
};
export default MainContent;
