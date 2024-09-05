// Импорт библиотек и данных
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { headerList, headerListEn } from '../../data/data';
import { useAuth } from '../../hook/useAuth';
import { useResize } from '../../hook/useResize';

// Импорт компонентов
import HeaderBurger from '../HeaderBurger';
import HeaderMobileMenu from '../HeaderMobileMenu';

// Импорт стилей и изображений
import logo from '/images/logo.png';
import './Header.css';

const lang = localStorage.getItem('language');

export default function Header({ isMsg, isModal, search, setSearch }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isLocation =
        location.pathname == '/about' || location.pathname == '/contacts';
    const [msg, setMsg] = useState('');
    const [menu, setMenu] = useState(false);
    const { user } = useAuth();
    const { width } = useResize();

    // Функция скрытия header при скроле
    let lastScroll = 0;
    const defaultOffset = 200;
    const scrollPosition = () =>
        window.scrollY || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const containHide = () =>
            document.querySelector('.header-nav').classList.contains('hide');
        if (
            scrollPosition() > lastScroll &&
            !containHide() &&
            scrollPosition() > defaultOffset
        ) {
            document.querySelector('.header-nav').classList.add('hide');
        } else if (scrollPosition() < lastScroll && containHide()) {
            document.querySelector('.header-nav').classList.remove('hide');
        }

        lastScroll = scrollPosition();
    });

    function changeLanguage() {
        if (lang == 'en') localStorage.setItem('language', 'ru');
        else localStorage.setItem('language', 'en');

        window.location.reload();
    }

    // Функция отображения уведомления
    useEffect(() => {
        isMsg(msg);
        setTimeout(() => {
            setMsg('');
        }, 2000);
    }, [msg]);

    return (
        <header>
            <section className="header-section">
                {isLocation && width <= 576 ? (
                    <div className="header-container _container">
                        <div className="header-main-buttons">
                            <i
                                style={{
                                    border: '1px solid #fff',
                                    padding: '5px 8px',
                                    borderRadius: '8px',
                                    fontSize: '18px',
                                }}
                                className="fa-solid fa-chevron-left"
                                onClick={() => navigate(-1)}
                            />
                            <Link className={`header-logo center`} to="/">
                                <img src={logo} alt="Logo" />
                                <h1>MelodyMind</h1>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="header-container _container">
                        <div className="header-main-buttons">
                            {width <= 576 && (
                                <>
                                    <i
                                        className={`fa-solid fa-${
                                            menu ? 'xmark' : 'bars'
                                        }`}
                                        onClick={() => setMenu(!menu)}
                                    />
                                </>
                            )}
                            <Link
                                className={`header-logo ${menu && 'center'}`}
                                to=""
                            >
                                <img src={logo} alt="Logo" />
                                {(width >= 576 || menu) &&
                                    (!user || width <= 576) && (
                                        <h1>MelodyMind</h1>
                                    )}
                            </Link>
                        </div>
                        {width >= 576 &&
                            (!isLocation ? (
                                <form
                                    action=""
                                    className={`header-form ${user && 'true'}`}
                                >
                                    <button type="submit">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </button>
                                    <input
                                        placeholder={
                                            lang == 'en'
                                                ? 'What are you looking for?'
                                                : 'Что ты ищешь?'
                                        }
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </form>
                            ) : (
                                <>
                                    <NavLink
                                        to="about"
                                        className="header-switcher"
                                    >
                                        {lang == 'en' ? 'About us' : 'О нас'}
                                    </NavLink>
                                    <NavLink
                                        to="contacts"
                                        className="header-switcher"
                                    >
                                        {lang == 'en' ? 'Contacts' : 'Контакты'}
                                    </NavLink>
                                </>
                            ))}

                        <section className="header-tools">
                            {!menu &&
                                (user ? (
                                    <HeaderBurger
                                        isMsg={(current) => setMsg(current)}
                                    />
                                ) : width <= 576 ? (
                                    <div className="mobile-buttons">
                                        <h2 onClick={() => isModal(true)}>
                                            {lang == 'en' ? 'Sign In' : 'Вход'}
                                        </h2>
                                        <h2 onClick={() => isModal(true)}>
                                            {lang == 'en'
                                                ? 'Sign Up'
                                                : 'Регистрация'}
                                        </h2>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => isModal(true)}
                                            className="header-login-button"
                                        >
                                            {lang == 'en' ? 'Sign in' : 'Вход'}
                                        </button>
                                        <button
                                            onClick={() => isModal(true)}
                                            className="header-login-button"
                                        >
                                            {lang == 'en'
                                                ? 'Sign up'
                                                : 'Регистрация'}
                                        </button>
                                    </div>
                                ))}
                            {!menu && (
                                <button className="header-cart">
                                    <i className="fa-solid fa-cart-shopping" />
                                    {width >= 576 && (
                                        <i className="fa-solid fa-chevron-down" />
                                    )}
                                </button>
                            )}
                            {(width >= 576 || menu) && (
                                <button
                                    className="header-cart"
                                    onClick={changeLanguage}
                                >
                                    {lang == 'en' ? <i>Ru</i> : <i>En</i>}
                                </button>
                            )}
                        </section>
                    </div>
                )}
            </section>
            {width <= 576 && (
                <HeaderMobileMenu
                    menu={menu}
                    setMenu={(current) => setMenu(current)}
                />
            )}
            {width >= 576 ? (
                <nav className={`header-nav ${menu && 'hidden'}`} id="header">
                    <ul className="header-list _container">
                        {(lang == 'en' ? headerListEn : headerList).map(
                            (item) => (
                                <NavLink to={item.id}>
                                    <li key={item.id}>{item.title}</li>
                                </NavLink>
                            )
                        )}
                    </ul>
                </nav>
            ) : (
                !isLocation && (
                    <nav
                        className={`header-nav ${menu && 'hidden'}`}
                        id="header"
                    >
                        <form action="" className="header-form">
                            <button type="submit">
                                <i className="fa-solid fa-magnifying-glass" />
                            </button>
                            <input
                                placeholder={
                                    lang == 'en'
                                        ? 'What are you looking for?'
                                        : 'Что ты ищешь?'
                                }
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </nav>
                )
            )}
        </header>
    );
}
