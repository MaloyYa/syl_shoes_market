export const COMMUNICATION_OPTIONS = [
    {
        pattern:
            /^(https?:\/\/)?(www\.)?vk\.com\/(id\d+|[a-zA-Z0-9_]+)(\/.*)?$/,
        img: '/src/assets/icons/links-icon/vk_logo.svg',
        name: 'VK',
    },
    {
        pattern:
            /^(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_+]+)(\/.*)?$/,
        img: '/src/assets/icons/links-icon/telegram_logo.svg',
        name: 'Telegram',
    },
    {
        pattern:
            /^(https?:\/\/)?(www\.)?max\.ru\/u\/[a-zA-Z0-9]+(\/.*)?$/,
        img: '/src/assets/icons/links-icon/max_logo.png',
        name: 'Max',
    },
];
