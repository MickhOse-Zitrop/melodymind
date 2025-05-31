import { BoomBox, Copy, Mic, MicVocal, Video, Volume2 } from "lucide-react";

export const footerLinks = [
  {
    name: "MelodyMind",
    links: [
      {
        name: "Профиль",
        link: "profile",
      },
      {
        name: "Лента",
        link: "/feed",
      },
      {
        name: "Треки",
        link: "/tracks",
      },
    ],
  },
  {
    name: "Компания",
    links: [
      {
        name: "О нас",
        link: "/about-us",
      },
      {
        name: "Контакты",
        link: "/contacts",
      },
    ],
  },
  {
    name: "Покупателям",
    links: [
      {
        name: "Как покупать биты",
        link: "/how-to-buy-beats",
      },
      {
        name: "Способы оплаты",
        link: "/payment-methods",
      },
      {
        name: "Правила продажи",
        link: "/sales-rules",
      },
      {
        name: "Политика конфиденциальности",
        link: "/Политика конфиденциальности.pdf",
      },
    ],
  },
  {
    name: "Партнерам",
    links: [
      {
        name: "Продавайте на MelodyMind",
        link: "/sell-on-MelodyMind",
      },
    ],
  },
];
export const heights = [
  6, 6, 8, 6, 4, 4, 4, 6, 8, 6, 8, 4, 9, 4, 8, 4, 4, 8, 9, 9, 4, 4, 4, 6, 4, 8,
  4, 8, 9, 4, 4, 8, 4, 6, 4, 4, 6, 9, 4, 4, 6, 8, 6, 8, 9, 4, 4, 4, 4, 4, 6, 6,
  6, 4, 8, 8, 9, 6, 4, 4, 4, 4, 6, 4, 4, 4, 4, 4,
];
export const licenses = [
  {
    id: "mp3",
    title: "MP3 ЛИЦЕНЗИЯ",
    price: 0,
    formats: ["MP3"],
    conditions: [
      { title: "ИСПОЛЬЗУЕТСЯ ДЛЯ ЗАПИСИ МУЗЫКИ", icon: <Mic /> },
      {
        title: "РАСПРОСТРАНЯЙТЕ ТИРАЖОМ ДО 2 500 ЭКЗЕМПЛЯРОВ",
        icon: <Copy />,
      },
      {
        title: "100 000 ОНЛАЙН-АУДИОПОТОКОВ",
        icon: <Volume2 />,
      },
      {
        title: "1 МУЗЫКАЛЬНОЕ ВИДЕО",
        icon: <Video />,
      },
      {
        title: "ТОЛЬКО НЕКОММЕРЧЕСКИЕ ЖИВЫЕ ВЫСТУПЛЕНИЯ",
        icon: <MicVocal />,
      },
    ],
  },
  {
    id: "wav",
    title: "WAV ЛИЦЕНЗИЯ",
    price: 900,
    formats: ["MP3", "WAV"],
    conditions: [
      { title: "ИСПОЛЬЗУЕТСЯ ДЛЯ ЗАПИСИ МУЗЫКИ", icon: <Mic /> },
      {
        title: "РАСПРОСТРАНЯЙТЕ ТИРАЖОМ ДО 5 000 ЭКЗЕМПЛЯРОВ",
        icon: <Copy />,
      },
      {
        title: "250 000 ОНЛАЙН-АУДИОПОТОКОВ",
        icon: <Volume2 />,
      },
      {
        title: "1 МУЗЫКАЛЬНОЕ ВИДЕО",
        icon: <Video />,
      },
      {
        title: "ТОЛЬКО НЕКОММЕРЧЕСКИЕ ЖИВЫЕ ВЫСТУПЛЕНИЯ",
        icon: <MicVocal />,
      },
    ],
  },
  {
    id: "wav_unlimited",
    title: "WAV НЕОГРАНИЧЕННАЯ ЛИЦЕНЗИЯ",
    price: 2500,
    formats: ["MP3", "WAV"],
    conditions: [
      { title: "ИСПОЛЬЗУЕТСЯ ДЛЯ ЗАПИСИ МУЗЫКИ", icon: <Mic /> },
      {
        title: "РАСПРОСТРАНЯЙТЕ НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО ЭКЗЕМПЛЯРОВ",
        icon: <Copy />,
      },
      {
        title: "НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО ОНЛАЙН-АУДИОПОТОКОВ",
        icon: <Volume2 />,
      },
      {
        title: "НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО МУЗЫКАЛЬНОХ ВИДЕО",
        icon: <Video />,
      },
      {
        title: "КОММЕРЧЕСКИЕ ЖИВЫЕ ВЫСТУПЛЕНИЯ",
        icon: <MicVocal />,
      },
      {
        title: "ПРАВО НА РАДИОВЕЩАНИЕ (НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО СТАНЦИЙ)",
        icon: <BoomBox />,
      },
    ],
  },
  {
    id: "stems",
    title: "STEMS ПРОФЕССИОНАЛЬНАЯ ЛИЦЕНЗИЯ",
    price: 6100,
    formats: ["MP3", "WAV", "STEMS"],
    conditions: [
      { title: "ИСПОЛЬЗУЕТСЯ ДЛЯ ЗАПИСИ МУЗЫКИ", icon: <Mic /> },
      {
        title: "РАСПРОСТРАНЯЙТЕ ТИРАЖОМ ДО 1 000 ЭКЗЕМПЛЯРОВ",
        icon: <Copy />,
      },
      {
        title: "500 000 ОНЛАЙН-АУДИОПОТОКОВ",
        icon: <Volume2 />,
      },
      {
        title: "1 МУЗЫКАЛЬНОЕ ВИДЕО",
        icon: <Video />,
      },
      {
        title: "КОММЕРЧЕСКИЕ ЖИВЫЕ ВЫСТУПЛЕНИЯ",
        icon: <MicVocal />,
      },
      {
        title: "ПРАВО НА РАДИОВЕЩАНИЕ (5 СТАНЦИЙ)",
        icon: <BoomBox />,
      },
    ],
  },
  {
    id: "unlimited",
    title: "ЛИЦЕНЗИЯ НА ПОЛНУЮ МОНЕТИЗАЦИЮ",
    price: 13300,
    formats: ["MP3", "WAV", "STEMS"],
    conditions: [
      { title: "ИСПОЛЬЗУЕТСЯ ДЛЯ ЗАПИСИ МУЗЫКИ", icon: <Mic /> },
      {
        title: "РАСПРОСТРАНЯЙТЕ НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО ЭКЗЕМПЛЯРОВ",
        icon: <Copy />,
      },
      {
        title: "НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО ОНЛАЙН-АУДИОПОТОКОВ",
        icon: <Volume2 />,
      },
      {
        title: "НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО МУЗЫКАЛЬНОХ ВИДЕО",
        icon: <Video />,
      },
      {
        title: "КОММЕРЧЕСКИЕ ЖИВЫЕ ВЫСТУПЛЕНИЯ",
        icon: <MicVocal />,
      },
      {
        title: "ПРАВО НА РАДИОВЕЩАНИЕ (НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО СТАНЦИЙ)",
        icon: <BoomBox />,
      },
    ],
  },
  {
    id: "exclusive",
    title: "ЭКСКЛЮЗИВНАЯ ЛИЦЕНЗИЯ",
    price: 27700,
    formats: ["MP3", "WAV", "STEMS"],
    conditions: [
      { title: "ИСПОЛЬЗУЕТСЯ ДЛЯ ЗАПИСИ МУЗЫКИ", icon: <Mic /> },
      {
        title: "РАСПРОСТРАНЯЙТЕ НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО ЭКЗЕМПЛЯРОВ",
        icon: <Copy />,
      },
      {
        title: "НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО ОНЛАЙН-АУДИОПОТОКОВ",
        icon: <Volume2 />,
      },
      {
        title: "НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО МУЗЫКАЛЬНОХ ВИДЕО",
        icon: <Video />,
      },
      {
        title: "КОММЕРЧЕСКИЕ ЖИВЫЕ ВЫСТУПЛЕНИЯ",
        icon: <MicVocal />,
      },
      {
        title: "ПРАВО НА РАДИОВЕЩАНИЕ (НЕОГРАНИЧЕННОЕ КОЛИЧЕСТВО СТАНЦИЙ)",
        icon: <BoomBox />,
      },
    ],
  },
];
export const members = [
  {
    name: "Никита Никишин",
    speciality: "Backend-разработчик",
  },
  {
    name: "Валерий Краснихин",
    speciality: "Технический писатель",
  },
  {
    name: "Степан Лапухин",
    speciality: "Контент-менеджер",
  },
  {
    name: "Андрей Добрынский",
    speciality: "Тестировщик",
  },
  {
    name: "Михаил Затуржинский",
    speciality: "Fullstack-разработчик, Тимлид",
  },
  {
    name: "Даниил Ступко",
    speciality: "Аналитик",
  },
  {
    name: "Егор Филиппов",
    speciality: "Дизайнер",
  },
];
