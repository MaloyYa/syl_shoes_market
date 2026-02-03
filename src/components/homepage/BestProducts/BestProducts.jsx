import ProductCard from '../../ui/ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    Navigation,
    Pagination,
} from 'swiper/modules';
import styles from './BestProducts.module.css';
import { useRef } from 'react';

export const BestProducts = (props) => {
    const swiperRef = useRef();
    const goToPrev = () => swiperRef.current?.slidePrev();
    const goToNext = () => swiperRef.current?.slideNext();
    const { bestProducts } = props;
    return (
        <section className={styles.best_products}>
            <h2 className={styles.section_title}>
                Лучшие из лучших
            </h2>
            <div className={styles.best_products_content}>
                <button
                    onClick={goToPrev}
                    type="button"
                    ariaLabel="Предыдущий товар"
                    className={styles.nav_button}>
                    ◀
                </button>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    slidesPerView="auto"
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className={styles['swiper-wrapper']}
                    breakpoints={{
                        320: { spaceBetween: 6 },
                        480: { spaceBetween: 12 },
                        768: { spaceBetween: 16 },
                        1024: { spaceBetween: 20 },
                        1200: { spaceBetween: 24 },
                    }}>
                    {bestProducts.map((product, index) => (
                        <SwiperSlide
                            style={{ width: '260px' }}
                            key={product.article || index}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={goToNext}
                    type="button"
                    ariaLabel="Следующий товар"
                    className={styles.nav_button}>
                    ▶
                </button>
            </div>
        </section>
    );
};
