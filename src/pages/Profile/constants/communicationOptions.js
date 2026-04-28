export const COMMUNICATION_OPTIONS = [
    {
        pattern:
            /^(https?:\/\/)?(www\.)?vk\.com\/(id\d+|[a-zA-Z0-9_]+)(\/.*)?$/,
        img: '/assets/icons/links-icons/vk_logo.svg',
        name: 'VK',
    },
    {
        pattern:
            /^(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_+]+)(\/.*)?$/,
        img: '/assets/icons/links-icons/telegram_logo.svg',
        name: 'Telegram',
    },
    {
        pattern:
            /^(https?:\/\/)?(www\.)?max\.ru\/u\/[a-zA-Z0-9]+(\/.*)?$/,
        img: '/assets/icons/links-icons/max_logo.png',
        name: 'Max',
    },
];
