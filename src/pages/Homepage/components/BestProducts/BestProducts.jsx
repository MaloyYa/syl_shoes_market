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
                    spaceBetween={24}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className={styles['swiper-wrapper']}
                    breakpoints={{
                        320: {
                            spaceBetween: 6,
                            slidesPerView: 1.5,
                        },
                        425: {
                            spaceBetween: 12,
                            slidesPerView: 2,
                        },
                        500: {
                            spaceBetween: 14,
                            slidesPerView: 2.3,
                        },
                        610: {
                            spaceBetween: 12,
                            slidesPerView: 2.5,
                        },
                        670: {
                            spaceBetween: 16,
                            slidesPerView: 2.8,
                        },
                        740: {
                            spaceBetween: 16,
                            slidesPerView: 3.2,
                        },
                        900: {
                            spaceBetween: 16,
                            slidesPerView: 3.5,
                        },
                        1024: {
                            spaceBetween: 20,
                            slidesPerView: 4,
                        },
                    }}>
                    {bestProducts.map((product, index) => (
                        <SwiperSlide key={index}>
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
