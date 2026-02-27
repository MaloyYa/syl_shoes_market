import ProductCard from '../../../../components/ui/ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    Navigation,
    Pagination,
} from 'swiper/modules';
import styles from './BestProducts.module.css';
import { useRef, useState, useEffect } from 'react';

export const BestProducts = (props) => {
    const swiperRef = useRef();
    const goToPrev = () => swiperRef.current?.slidePrev();
    const goToNext = () => swiperRef.current?.slideNext();
    const { bestProducts } = props;

    const [minHeight, setMinHeight] = useState('260px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setMinHeight('360px');
            } else {
                setMinHeight('280px');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () =>
            window.removeEventListener(
                'resize',
                handleResize,
            );
    }, []);
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
                    style={{ minHeight }}
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    // Ключевые изменения здесь:
                    slidesPerView={'auto'}
                    spaceBetween={20} // Отступ между слайдами
                    breakpoints={{
                        320: { spaceBetween: 6 },
                        425: { spaceBetween: 12 },
                        1024: { spaceBetween: 20 },
                    }}
                    className={styles['swiper-wrapper']}>
                    {bestProducts.map((product, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: 'auto' }}>
                            <ProductCard
                                product={product}
                            />
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
