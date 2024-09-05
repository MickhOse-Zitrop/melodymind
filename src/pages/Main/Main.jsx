// Импорт библиотек и данных
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
    numTracks,
    mainTrends,
    mainTrendsEn,
    mainTracks,
} from '../../data/data';
import { useResize } from '../../hook/useResize';

// Импорт компонентов
import MainSection from '../../components/MainSection/MainSection';

// Импорт стилей и изображений
import './Main.css';

const lang = localStorage.getItem('language');

export default function Main({ search, setSearch, isNotify }) {
    const [isButton, setButton] = useState(true);
    const [invalid, setInvalid] = useState(true);
    const [image, setImage] = useState('/images/track/' + previous + '.png');
    const { width } = useResize();
    var i = 0;

    var previous = getRandomInt(numTracks);
    var current = getRandomInt(numTracks);

    // Функция отправки email
    const sendEmail = (e) => {
        e.preventDefault();

        setButton(false);

        emailjs
            .sendForm('mail', 'template_isk5d14', e.target, {
                publicKey: 'WmNrBY16kNyn5fA6M',
            })
            .then(
                () => {
                    setButton(true);
                    document.querySelector('.main-email-form').reset();
                    document.querySelector('#email').blur();
                    isNotify(
                        lang == 'en'
                            ? 'We have just sent you an email with instructions on how to complete this request'
                            : 'Мы только что отправили вам электронное письмо с инструкциями по выполнению этого запроса'
                    );
                    setInvalid(true);
                },
                () => {
                    setButton(true);
                    isNotify(
                        lang == 'en'
                            ? 'The email could not be sent! Try refreshing the page!'
                            : 'Не удалось отправить письмо! Попробуйте обновить старинцу!'
                    );
                }
            );
    };

    // Функция активирования кнопки
    function handleEmailChange(event) {
        if (event.target.value.trim().length != 0) setInvalid(false);
        else setInvalid(true);
    }

    // Функции получения рандомного числа и фото
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            document.querySelector('.intro-image').classList.add('invisible');
            current = getRandomInt(numTracks);
            while (current == previous) {
                current = getRandomInt(numTracks);
            }
            previous = current;
            setImage('/images/track/' + current + '.png');
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className="intro-section">
                <div className="intro-content _container">
                    <h2 className="intro-title">
                        Live by the <span style={{ color: 'red' }}>beat</span>
                        <br /> of your
                        <span style={{ color: 'red' }}> heart</span>
                    </h2>
                    <form action="" className="intro-form">
                        <button className="left-submit" type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <input
                            type="text"
                            placeholder={
                                lang == 'en'
                                    ? width <= 576
                                        ? 'Explore new sounds'
                                        : 'Explore new sounds - look for rhythms and producers'
                                    : width <= 576
                                    ? 'Исследуйте новые звуки'
                                    : 'Исследуйте новые звуки - ищите ритмы и продюсеров'
                            }
                            className="main-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="rigth-submit" type="submit">
                            {lang == 'en' ? 'Search' : 'Поиск'}
                        </button>
                    </form>
                </div>
                <div className="intro-image">
                    {width >= 576 && <div className="intro-image-gradient" />}
                    {image != '/images/track/undefined.png' && (
                        <img src={image} />
                    )}
                </div>
            </div>
            <MainSection>{mainTracks}</MainSection>
            <div className="main-trust">
                <h3> {lang == 'en' ? 'We trust' : 'Мы доверяем'}:</h3>
                <div className="trust-section">
                    {[...Array(2)].map(() => (
                        <div className="image-trust" key={i++}>
                            <img src="./images/slider/slider_0.png" alt="" />
                            <img src="./images/slider/slider_1.png" alt="" />
                            <img src="./images/slider/slider_2.png" alt="" />
                            <img src="./images/slider/slider_3.png" alt="" />
                            <img src="./images/slider/slider_4.png" alt="" />
                            <img src="./images/slider/slider_5.png" alt="" />
                            <img src="./images/slider/slider_6.png" alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <MainSection>
                {lang == 'en' ? mainTrendsEn : mainTrends}
            </MainSection>
            <div className="main-email">
                <h3
                    style={
                        width >= 576
                            ? { fontSize: '18px', fontWeight: '700' }
                            : {
                                  fontSize: '14px',
                                  fontWeight: '700',
                                  textAlign: 'center',
                              }
                    }
                >
                    {lang == 'en'
                        ? 'Send us your personal buying and selling tips on MelodyMind'
                        : 'Присылайте нам персональные советы по покупкам и продажам на MelodyMind'}
                </h3>
                <form onSubmit={sendEmail} className="main-email-form">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        id="email"
                        name="email"
                        onChange={handleEmailChange}
                        type="email"
                        placeholder={
                            lang == 'en'
                                ? 'Enter your email address'
                                : 'Введите свою почту'
                        }
                        required
                    />
                    <button
                        disabled={invalid}
                        className={!invalid ? 'active' : null}
                        type="submit"
                    >
                        {isButton ? (
                            lang == 'en' ? (
                                'Subscribe'
                            ) : (
                                'Подписаться'
                            )
                        ) : (
                            <div className="spinner"></div>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
