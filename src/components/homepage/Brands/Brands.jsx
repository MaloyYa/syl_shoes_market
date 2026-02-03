import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { useRef } from 'react';
import styles from './Brands.module.css';
import { BrandLink } from '../../ui/BrandLink/BrandLink';
const Brands = (props) => {
    const { brands } = props;
    const swiperRef = useRef();
    const goToPrev = () => swiperRef.current?.slidePrev();
    const goToNext = () => swiperRef.current?.slideNext();
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
                    {brands.map(
                        ({
                            logoBrand,
                            titleBrand,
                            href,
                        }) => (
                            <SwiperSlide
                                key={logoBrand}
                                style={{ width: '190px' }}>
                                {logoBrand && (
                                    <BrandLink
                                        titleBrand={
                                            titleBrand
                                        }
                                        href={href}
                                        logo={logoBrand}
                                    />
                                )}
                            </SwiperSlide>
                        ),
                    )}
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
export default Brands;
