import BestProducts from './BestProducts';
import Brands from './Brands';
import HeroBunner from './HeroBunner';
import QualityService from './QualityService';

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
