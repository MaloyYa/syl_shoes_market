import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import styles from './Brands.module.css';
import { BrandLink } from './BrandLink/BrandLink';
export const Brands = ({ brands }) => {
    const swiperRef = useRef();
    const goToPrev = () => swiperRef.current?.slidePrev();
    const goToNext = () => swiperRef.current?.slideNext();
    if (!brands?.length) return null;
    return (
        <section className={styles.brand_section}>
            <h2 className={styles.section_title}>Бренды</h2>
            <div className={styles.brands_content}>
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
                    {brands.map((brand, id) => (
                        <SwiperSlide
                            key={id}
                            style={{ width: '190px' }}>
                            <BrandLink brand={brand} />
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
