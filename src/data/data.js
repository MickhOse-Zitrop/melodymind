export const numTracks = 13; // Количество треков для примера
export const pages = ['', 'login', 'sign-in', 'sign-up', 'reset-password', 'feed', 'tracks', 'sounds', 'about', 'contacts', 'how-to-buy', 'payment', 'rules-of-sale', 'privacy-policy', 'sell', 'profile', 'settings'];

export const tableHeaders = ['ID', 'Эл. почта', 'Пароль', 'Имя', 'Фамилия', 'Никнейм', 'Местоположение', 'Биография', 'Фото', 'Статус', 'Подписка', 'Подписчики', 'Прослушивания', 'Треки', 'Номер телефона', 'Sound Cloud', 'Youtube', 'Rutube', 'Tik-Tok', 'Twitch'];
export const tableHeadersEn = ['ID', 'Email', 'Password', 'Name', 'Surname', 'Nickname', 'Location', 'Bio', 'Photo', 'Status', 'Subscription', 'Followers', 'Plays', 'Tracks', 'Phone number', 'Sound Cloud', 'Youtube', 'Rutube', 'Tik-Tok', 'Twitch'];

export const headerList = [{
    title: 'Лента',
    id: 'feed'
}, {
    title: 'Треки',
    id: 'tracks'
}, {
    title: 'Наборы звуков',
    id: 'sounds'
}];
export const headerListEn = [{
    title: 'Feed',
    id: 'feed'
}, {
    title: 'Tracks',
    id: 'tracks'
}, {
    title: 'Sound kits',
    id: 'sounds'
}];

export const headerListUser = [{
    title: 'Мой плейлист',
    icon: 'fa-music',
    link: '/my-playlist'
}, {
    title: 'Избранное',
    icon: 'fa-heart',
    link: '/favorite'
}, {
    title: 'История',
    icon: 'fa-clock-rotate-left',
    link: '/history'
}, {
    title: 'Покупки',
    icon: 'fa-bag-shopping',
    link: '/purchace'
}];
export const headerListUserEn = [{
    title: 'My playlist',
    icon: 'fa-music',
    link: '/my-playlist'
}, {
    title: 'Favorite',
    icon: 'fa-heart',
    link: '/favorite'
}, {
    title: 'History',
    icon: 'fa-clock-rotate-left',
    link: '/history'
}, {
    title: 'Purchaces',
    icon: 'fa-bag-shopping',
    link: '/purchace'
}];

// Временныe списки треков для демонстрации
export const mainTracks = [{
    title: 'adaptive strike',
    author: 'shadowraze',
    price: 3000,
    image: '/images/track/0.png',
    id: 123456,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/21627.mp3'
}, {
    title: 'Aomine Daiki',
    author: 'quiizzzmeow',
    price: 3000,
    image: '/images/track/1.png',
    id: 222111,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/26399.mp3'
}, {
    title: 'showdown',
    author: 'shadowraze',
    price: 3000,
    image: '/images/track/2.png',
    id: 111221,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/19183.mp3'
}, {
    title: 'Плохая девочка',
    author: 'Винтаж',
    price: 3000,
    image: '/images/track/3.png',
    id: 555555,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/21499.mp3'
}, {
    title: 'Hollywood\'s Bleeding',
    author: 'Post Malone',
    price: 3000,
    image: '/images/track/4.png',
    id: 324234,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/24695.mp3'
}, {
    title: 'WTF U MEAN',
    author: 'Haarper',
    price: 3000,
    image: '/images/track/5.png',
    id: 123411,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/5af771c463d102ab47f3c20091c39705acbd7c64b65e635395dd1e677b75f79d.mp3'
}, {
    title: 'Can\'t Take My Eyes Off You',
    author: 'Craymer',
    price: 3000,
    image: '/images/track/6.png',
    id: 897697,
    idAuthor: 654321,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/103edacd31ec92779e7a142ea56090a3c4eb9e89e58510a442a1c3058034f11d.mp3'
}, {
    title: 'Барбарики',
    author: 'Барбарики',
    price: 3000,
    image: '/images/track/7.png',
    id: 234561,
    idAuthor: 543216,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/4a91c6be8ed70f91942f316218e8166d3c04ad0fcb3d85ed82f3b62420758e0c.mp3'
}, {
    title: 'Gucci Gang',
    author: 'Lil Pump',
    price: 3000,
    image: '/images/track/8.png',
    id: 345612,
    idAuthor: 432165,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/19755.mp3'
}, {
    title: 'Ameli',
    author: 'Big Baby Tape',
    price: 3000,
    image: '',
    id: 561234,
    idAuthor: 321654,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/1d1e84f1b3fb614b543219750c7c716df4ab768eb0212ac12735439c32d9473c.mp3'
}, {
    title: 'GAZ',
    author: 'XvallariX',
    price: 3000,
    image: '/images/track/10.png',
    id: 612345,
    idAuthor: 216543,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/21087.mp3'
}, {
    title: 'Гонконг',
    author: 'Exxxtyman',
    price: 3000,
    image: '/images/track/11.png',
    id: 162534,
    idAuthor: 615243,
    playTrack: [52, 40, 66, 67, 71, 89, 58, 59, 53, 63, 48, 61, 46, 82, 94, 61, 96, 88, 97, 97, 90, 76, 74, 58, 81, 59, 62, 75, 90, 43, 89, 80, 98, 79, 97, 86, 51, 82, 91, 81, 96, 40, 79, 81, 56, 40, 57, 62, 45, 60, 66, 95, 65, 99, 69, 64, 57, 96, 61, 97, 55, 46, 78, 50, 72, 79, 60, 55, 58, 95, 55, 87, 85, 60, 84, 46, 89, 47, 81, 63, 99, 49, 80, 69, 64, 88, 69, 50],
    audio: '/music/53dcc8a175b8373e014f5ac9e464f5c9cda233d5116ba13a9ba859b510c70110.mp3'
}];

export const mainTrends = [{
    title: 'Хип-хоп',
    image: '/images/trend/6.png'
}, {
    title: 'Поп',
    image: '/images/trend/7.png'
}, {
    title: 'R&B',
    image: '/images/trend/8.png'
}, {
    title: 'Рок',
    image: '/images/trend/9.png'
}, {
    title: 'Электронная',
    image: '/images/trend/10.png'
}, {
    title: 'Регги',
    image: '/images/trend/11.png'
}];
export const mainTrendsEn = [{
    title: 'Hip hop',
    image: '/images/trend/6.png'
}, {
    title: 'Pop',
    image: '/images/trend/7.png'
}, {
    title: 'R&B',
    image: '/images/trend/8.png'
}, {
    title: 'Rock',
    image: '/images/trend/9.png'
}, {
    title: 'Electronic',
    image: '/images/trend/10.png'
}, {
    title: 'Reggae',
    image: '/images/trend/11.png'
}];

export const tracksGenres = [{
    id: 'hip-hop',
    title: 'Хип-хоп',
}, {
    id: 'r&b',
    title: 'R&B',
}, {
    id: 'pop',
    title: 'Поп',
}, {
    id: 'reggy',
    title: 'Регги',
}, {
    id: 'electro',
    title: 'Электронная',
}, {
    id: 'phonk',
    title: 'Фонк',
}, {
    id: 'underground',
    title: 'Андерграунд',
}, {
    id: 'rock',
    title: 'Рок',
}, {
    id: 'hyper-pop',
    title: 'Гипер-поп',
}, {
    id: 'k-pop',
    title: 'К-поп',
}, {
    id: 'classic',
    title: 'Классическая',
}, {
    id: 'rap',
    title: 'Рэп',
}, ]
export const tracksGenresEn = [{
    id: 'hip-hop',
    title: 'Hip-hop',
}, {
    id: 'r&b',
    title: 'R&B',
}, {
    id: 'pop',
    title: 'Pop',
}, {
    id: 'reggy',
    title: 'Reggy',
}, {
    id: 'electro',
    title: 'Electronic',
}, {
    id: 'phonk',
    title: 'Phonk',
}, {
    id: 'underground',
    title: 'Underground',
}, {
    id: 'rock',
    title: 'Rock',
}, {
    id: 'hyper-pop',
    title: 'hyper-pop',
}, {
    id: 'k-pop',
    title: 'K-pop',
}, {
    id: 'classic',
    title: 'Classic',
}, {
    id: 'rap',
    title: 'Rap',
}, ]

export const team = [{
    name: 'Михаил Затуржинский',
    status: 'Fullstack-разработчик, Тимлид',
    image: '/images/team/MZaturzhinskiy.png'
}, {
    name: 'Даниил Ступко',
    status: 'Аналитик',
    image: '/images/team/DStupko.png'
}, {
    name: 'Егор Филиппов',
    status: 'Дизайнер',
    image: '/images/team/EFilippov.png'
}, {
    name: 'Никита Никишин',
    status: 'Backend-разработчик',
    image: '/images/team/NNikishin.png'
}, {
    name: 'Валерий Краснихин',
    status: 'Документовед',
    image: '/images/team/VKrasnihin.png'
}, {
    name: 'Степан Лапухин',
    status: 'Контент-менеджер',
    image: '/images/team/SLapuhin.png'
}, {
    name: 'Андрей Добрынский',
    status: 'Тестировщик',
    image: '/images/team/ADobrynskiy.png'
}, ];
export const teamEn = [{
    name: 'Mikhail Zaturzhinsky',
    status: 'Fullstack-developer, Team leader',
    image: '/images/team/MZaturzhinskiy.png'
}, {
    name: 'Daniil Stupko',
    status: 'Analyst',
    image: '/images/team/DStupko.png'
}, {
    name: 'Egor Filippov',
    status: 'Designer',
    image: '/images/team/EFilippov.png'
}, {
    name: 'Nikita Nikishin',
    status: 'Backend Developer',
    image: '/images/team/NNikishin.png'
}, {
    name: 'Valery Krasnikhin',
    status: 'Documentarian',
    image: '/images/team/VKrasnihin.png'
}, {
    name: 'Stepan Lapukhin',
    status: 'Content Manager',
    image: '/images/team/SLapuhin.png'
}, {
    name: 'Andrey Dobrynsky',
    status: 'Tester',
    image: '/images/team/ADobrynskiy.png'
}, ];

export const contacts = [{
    title: 'Официальные запросы',
    text: 'Для отправки и получения деловых документов',
    linkText: 'mm.business@internet.ru',
    link: 'mailto:mm.business@internet.ru?subject=Официальный запрос'
}, {
    title: 'Цифровой арбитраж',
    text: 'Претензии по нарушению прав на интеллектуальную собственность (для Правообладателей)',
    textLink: 'Правила оформления претензий',
    linkLink: 'src/assets/docs/file.pdf',
    linkText: 'mm.business@internet.ru',
    link: 'mailto:mm.business@internet.ru?subject=Цифровой арбитраж'
}, {
    title: 'Партнерам',
    text: 'Узнайте подробные условия для сотрудничества',
    linkText: 'Подробнее',
    link: '/'
}, {
    title: 'Говори свободно',
    text: 'Сообщите нам о случаях мошенничества и коррупции на горячую линию',
    linkText: 'Подробнее',
    link: '/'
}, {
    title: 'Юридический адрес',
    text: '142181, Московская область, г. Подольск, деревня Коледино, Территория Индустриальный парк Коледино, д. 6, стр. 1',
}];
export const contactsEn = [{
    title: 'Official inquiries',
    text: 'To send and receive business documents',
    linkText: 'mm.business@internet.ru',
    link: 'mailto:mm.business@internet.ru?subject=Official request'
}, {
    title: 'Digital Arbitration',
    text: 'Claims of infringement of intellectual property rights (for Copyright Holders)',
    textLink: 'Rules for filing claims',
    linkLink: 'src/assets/docs/file.pdf',
    linkText: 'mm.business@internet.ru',
    link: 'mailto:mm.business@internet.ru?subject=Digital Arbitration'
}, {
    title: 'Partners',
    text: 'Find out the detailed conditions for cooperation',
    linkText: 'More',
    link: '/'
}, {
    title: 'Speak freely',
    text: 'Let us know about cases of fraud and corruption on the hotline',
    linkText: 'More',
    link: '/'
}, {
    title: 'Legal address',
    text: '142181, Moscow region, Podolsk, village of Koledino, Territory of Koledino Industrial Park, 6, building 1',
}];

export const footerList = [{
        title: 'MelodyMind',
        id: 'map-site',
        list: [{
            label: 'Вход/Регистрация',
            id: 'login',
            target: '_blank',
            bool: true
        }, {
            label: 'Лента',
            id: 'feed'
        }, {
            label: 'Треки',
            id: 'tracks'
        }, {
            label: 'Наборы звуков',
            id: 'sounds'
        }]
    }, {
        title: 'Компания',
        id: 'company',
        list: [{
            label: 'О нас',
            id: 'about'
        }, {
            label: 'Контакты',
            id: 'contacts'

        }]
    },
    {
        title: 'Покупателям',
        id: 'for-sellers',
        list: [{
                label: 'Как покупать биты',
                id: 'how-to-buy'
            }, {
                label: 'Способы оплаты',
                id: 'payment'
            }, {
                label: 'Правила продажи',
                id: 'rules-of-sale'
            },
            {
                label: 'Политика конфиденциальности',
                id: 'docs/Политика конфиденциальности.pdf',
                target: '_blank'
            }
        ]
    }, {
        title: 'Партнерам',
        id: 'for-partners',
        list: [{
            label: 'Продавайте на MelodyMind',
            id: 'sell'
        }]
    }
];
export const footerListEn = [{
        title: 'MelodyMind',
        id: 'map-site',
        list: [{
            label: 'Login/Registration',
            id: 'login',
            target: '_blank',
            bool: true
        }, {
            label: 'Feed',
            id: 'feed'
        }, {
            label: 'Tracks',
            id: 'tracks'
        }, {
            label: 'Sound kits',
            id: 'sounds'
        }]
    }, {
        title: 'Company',
        id: 'company',
        list: [{
            label: 'About us',
            id: 'about'
        }, {
            label: 'Contacts',
            id: 'contacts'

        }]
    },
    {
        title: 'For sellers',
        id: 'for-sellers',
        list: [{
                label: 'How to buy bits',
                id: 'how-to-buy'
            }, {
                label: 'Payment',
                id: 'payment'
            }, {
                label: 'Rules of sale',
                id: 'rules-of-sale'
            },
            {
                label: 'Privacy policy',
                id: 'docs/Privacy policy.pdf',
                target: '_blank'
            }
        ]
    }, {
        title: 'For partners',
        id: 'for-partners',
        list: [{
            label: 'Sell on MelodyMind',
            id: 'sell'
        }]
    }
];