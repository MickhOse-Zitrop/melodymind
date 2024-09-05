// Импорт библиотек и данных
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { headerListUser, headerListUserEn } from '../data/data';
import { useAuth } from '../hook/useAuth';
import { useResize } from '../hook/useResize';

const lang = localStorage.getItem('language');

export default function HeaderBurger({ isMsg }) {
    const [showBurgerUser, setShowBurgerUser] = useState(false);
    const [msg, setMsg] = useState('');
    const { user } = useAuth();
    const { width } = useResize();
    const navigate = useNavigate();

    // Функция скрытия бургера при нажатии в любое место
    document.addEventListener('click', (e) => {
        const click = e
            .composedPath()
            .includes(document.querySelector('#userButton'));

        if (!click) {
            setShowBurgerUser(false);
        }
    });

    // Функция выхода из аккаунта
    function logout() {
        var url = 'https://melodymind.tw1.ru/config/logout.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = { language: lang };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setMsg(response[0].result);
            })
            .catch();
    }

    // Показывает уведомление о выходе
    useEffect(() => {
        isMsg(msg);
        setTimeout(() => {
            setMsg('');
        }, 2000);
    }, [msg]);

    return (
        <>
            <section className={`header-burger ${showBurgerUser && 'show'}`}>
                <div className="burger-user">
                    <Link to="profile">
                        <img
                            src={user[7] ? user[7] : './images/user.png'}
                            alt="User"
                        />
                    </Link>
                    <div className="burger-user-text">
                        <Link to="profile">
                            <h3>{user[6] ? user[6] : user[1]}</h3>
                        </Link>
                        <Link id="burger-purchase" to="settings/subscription">
                            <p>{lang == 'en' ? 'FREE' : 'БЕСПЛАТНО'}</p>
                        </Link>
                    </div>
                </div>
                <button
                    className="burger-finance"
                    onClick={() => navigate('wallet')}
                >
                    <h3>{lang == 'en' ? 'Your balance' : 'Ваш баланс'}</h3>
                    <h3>{user[22] == null ? '0' : user[22]} руб.</h3>
                </button>
                <hr className="burger-line" />
                <ul className="burger-list">
                    {(lang == 'en' ? headerListUserEn : headerListUser).map(
                        (item) => (
                            <li key={item.title}>
                                <Link to={item.link}>
                                    <i className={'fa-solid ' + item.icon}></i>
                                    <h3>{item.title}</h3>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
                <hr className="burger-line" />
                <ul className="burger-list">
                    <li>
                        <Link to="/settings">
                            <i className="fa-solid fa-sliders"></i>
                            <h3>
                                {lang == 'en'
                                    ? 'Account settings'
                                    : 'Настройки аккаунта'}
                            </h3>
                        </Link>
                    </li>
                    {user[10] == 1 && (
                        <li>
                            <Link to="/admin">
                                <i className="fa-solid fa-user-tie"></i>
                                <h3>
                                    {lang == 'en'
                                        ? 'Admin panel'
                                        : 'Панель администратора'}
                                </h3>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/help">
                            <i className="fa-solid fa-life-ring"></i>
                            <h3>{lang == 'en' ? 'Help' : 'Помощь'}</h3>
                        </Link>
                    </li>
                </ul>
                <hr className="burger-line" />
                <ul className="burger-list">
                    <li onClick={logout} style={{ cursor: 'pointer' }}>
                        <a>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            <h3>
                                {lang == 'en' ? 'Log out' : 'Выйти из аккаунта'}
                            </h3>
                        </a>
                    </li>
                </ul>
            </section>
            <button
                id="userButton"
                className="header-cart"
                onClick={() => setShowBurgerUser(!showBurgerUser)}
            >
                <img src={user[7] ? user[7] : './images/user.png'} alt="User" />
                {width >= 576 && <i className="fa-solid fa-chevron-down" />}
            </button>
            <button className="header-cart">
                <i className="fa-solid fa-bell"></i>
                {width >= 576 && <i className="fa-solid fa-chevron-down" />}
            </button>
        </>
    );
}
