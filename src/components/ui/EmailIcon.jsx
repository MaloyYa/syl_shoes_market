export const SvgEmailIcon = (props) => {
    const {
        className,
        width = '100%',
        height = '100%',
    } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_21_171)">
                <path
                    d="M19.2806 2.85693H0.714294L9.99749 10.5055L19.3856 2.87836C19.3513 2.86832 19.3162 2.86116 19.2806 2.85693Z"
                    fill="#B3C0D2"
                />
                <path
                    d="M10.4479 11.9829C10.1848 12.1984 9.80622 12.1984 9.54312 11.9829L0 4.11865V16.4286C0 16.8231 0.319709 17.1429 0.714105 17.1429H19.2805C19.6749 17.1429 19.9946 16.8231 19.9946 16.4286V4.22437L10.4479 11.9829Z"
                    fill="#B3C0D2"
                />
            </g>
            <defs>
                <clipPath id="clip0_21_171">
                    <rect
                        width={19.9946}
                        height={20}
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};
