import { memo } from 'react';

export const SvgFavoriteIcon = memo((props) => {
    const { fill = '#276ac7' } = props;
    return (
        <svg
            width={19}
            height={19}
            fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 3.5625C8.79278 1.50575 6.8115 0 4.75 0C2.06572 0 0 2.29425 0 5.34375C0 9.53444 4.00372 12.7751 9.5 19C14.9963 12.7751 19 9.53444 19 5.34375C19 2.29425 16.9343 0 14.25 0C12.1864 0 10.2072 1.50575 9.5 3.5625Z"
                fill={fill}
            />
        </svg>
    );
});
