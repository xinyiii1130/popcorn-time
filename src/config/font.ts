import localFont from 'next/font/local';

export const gothamFont = localFont({
    src: [
        {
            path: '../fonts/Gotham-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../fonts/Gotham-Book.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/Gotham-BoldItalic.otf',
            weight: '700',
            style: 'italic',
        },
    ],
});
