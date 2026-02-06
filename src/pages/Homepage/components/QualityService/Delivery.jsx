import styles from './QualityIcon.module.css';
export const SvgDelivery = (props) => {
    const { width, height } = props;
    return (
        <div className={styles.quality_body}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 100 100"
                fill="none"
                className={styles.quality_image}>
                <circle
                    cx={50}
                    cy={50}
                    r={50}
                    fill="#FFE1E1"
                />
                <g clipPath="url(#clip0_9010_3491)">
                    <path
                        d="M74.9902 37.3314C74.9318 36.7936 74.5977 36.3176 74.0981 36.0845L50.6606 25.147C50.2418 24.9516 49.758 24.9516 49.3392 25.147L25.9017 36.0845C25.4022 36.3176 25.0681 36.7935 25.0096 37.3314C25.0083 37.3427 25 37.4923 25 37.5005V64.063C25 64.7018 25.389 65.2764 25.9822 65.5136L49.4197 74.8886C49.606 74.9632 49.803 75.0005 50 75.0005C50.197 75.0005 50.394 74.9633 50.5803 74.8886L74.0178 65.5136C74.611 65.2764 75 64.7018 75 64.063V37.5005C75 37.4923 74.9915 37.3426 74.9902 37.3314ZM50 28.2872L69.5062 37.3901L61.9951 40.3946L42.1218 31.9637L50 28.2872ZM38.3115 33.7419L57.8766 42.042L50 45.1926L30.4938 37.3901L38.3115 33.7419ZM28.125 39.8083L48.4375 47.9333V71.1301L28.125 63.0051V39.8083ZM51.5625 71.1301V47.9333L71.875 39.8083V63.0051L51.5625 71.1301Z"
                        fill="#AD0808"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_9010_3491">
                        <rect
                            width={50}
                            height={50}
                            fill="white"
                            transform="translate(25 25)"
                        />
                    </clipPath>
                </defs>
            </svg>
            <p className={styles.quality_text}>
                Быстро доставим покупку
            </p>
        </div>
    );
};
