// Импорт библиотек и данных
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useResize } from '../../hook/useResize';

// Импорт компонентов
import ProfileInfoSocial from './ProfileInfoSocial';
import ProfileTracks from './ProfileTracks';

const lang = localStorage.getItem('language');

export default function ProfileInfo() {
    const { user } = useAuth();
    const { width } = useResize();
    const [activePage, setActivePage] = useState(true);

    return (
        <div className="profile-block">
            <section className="profile-info">
                <div className="profile-info-main">
                    <img src={user[7] ? user[7] : './images/user.png'} alt="" />
                    <h3>{user[6] ? user[6] : user[1]}</h3>
                    {user[8] && <p>{user[8]}</p>}
                </div>
                <Link to="/settings">
                    <button>
                        {lang == 'en'
                            ? 'Edit profile'
                            : 'Редактировать профиль'}
                    </button>
                </Link>
                {width <= 576 && (
                    <nav className="profile-nav">
                        <li
                            className={activePage ? 'active' : ''}
                            onClick={() => setActivePage(true)}
                        >
                            ТРЕКИ
                        </li>
                        <li
                            className={!activePage ? 'active' : ''}
                            onClick={() => setActivePage(false)}
                        >
                            ИНФОРМАЦИЯ
                        </li>
                    </nav>
                )}
                {width >= 576 && (
                    <>
                        <div className="profile-info-stat">
                            <h4>{lang == 'en' ? 'STATS' : 'СТАТИСТИКА'}</h4>
                            <ul>
                                <li>
                                    <p>
                                        {lang == 'en'
                                            ? 'Followers'
                                            : 'Подписчики'}
                                    </p>
                                    <p>{user[12]}</p>
                                </li>
                                <li>
                                    <p>
                                        {lang == 'en'
                                            ? 'Plays'
                                            : 'Прослушивания'}
                                    </p>
                                    <p>{user[13]}</p>
                                </li>
                                <li>
                                    <p>{lang == 'en' ? 'Tracks' : 'Треки'}</p>
                                    <p>{user[14]}</p>
                                </li>
                            </ul>
                        </div>
                        {user[14] != 0 ? (
                            <>
                                <hr className="profile-hr" />
                                <div className="profile-info-stat">
                                    <h4>{lang == 'en' ? 'TRACKS' : 'ТРЕКИ'}</h4>
                                    <ul>
                                        <li>
                                            <p>{user[14]}</p>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : null}
                        {user[9] ? (
                            <>
                                <hr className="profile-hr" />
                                <div className="profile-info-stat">
                                    <h4>
                                        {lang == 'en' ? 'ABOUT ME' : 'О СЕБЕ'}
                                    </h4>
                                    <ul>
                                        <li>
                                            <p>{user[9]}</p>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : null}
                        {user[17] ||
                        user[18] ||
                        user[19] ||
                        user[20] ||
                        user[21] ? (
                            <>
                                <hr className="profile-hr" />
                                <div className="profile-info-stat">
                                    <h4>
                                        {lang == 'en'
                                            ? 'FIND ME ON'
                                            : 'НАЙТИ МЕНЯ НА'}
                                    </h4>
                                    <ProfileInfoSocial />
                                </div>
                            </>
                        ) : null}
                    </>
                )}
            </section>
            {width <= 576 && (
                <section className="profile-main">
                    {activePage ? (
                        <ProfileTracks />
                    ) : (
                        <>
                            <div className="profile-info-stat">
                                <h4>{lang == 'en' ? 'STATS' : 'СТАТИСТИКА'}</h4>
                                <ul>
                                    <li>
                                        <p>
                                            {lang == 'en'
                                                ? 'Followers'
                                                : 'Подписчики'}
                                        </p>
                                        <p>{user[12]}</p>
                                    </li>
                                    <li>
                                        <p>
                                            {lang == 'en'
                                                ? 'Plays'
                                                : 'Прослушивания'}
                                        </p>
                                        <p>{user[13]}</p>
                                    </li>
                                    <li>
                                        <p>
                                            {lang == 'en' ? 'Tracks' : 'Треки'}
                                        </p>
                                        <p>{user[14]}</p>
                                    </li>
                                </ul>
                            </div>
                            {user[14] != 0 ? (
                                <>
                                    <hr className="profile-hr" />
                                    <div className="profile-info-stat">
                                        <h4>
                                            {lang == 'en' ? 'TRACKS' : 'ТРЕКИ'}
                                        </h4>
                                        <ul>
                                            <li>
                                                <p>{user[14]}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {user[9] ? (
                                        <>
                                            <hr className="profile-hr" />
                                            <div className="profile-info-stat">
                                                <h4>
                                                    {lang == 'en'
                                                        ? 'ABOUT ME'
                                                        : 'О СЕБЕ'}
                                                </h4>
                                                <ul>
                                                    <li>
                                                        <p>{user[9]}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    ) : null}
                                    {user[17] ||
                                    user[18] ||
                                    user[19] ||
                                    user[20] ||
                                    user[21] ? (
                                        <>
                                            <hr className="profile-hr" />
                                            <div className="profile-info-stat">
                                                <h4>
                                                    {lang == 'en'
                                                        ? 'FIND ME ON'
                                                        : 'НАЙТИ МЕНЯ НА'}
                                                </h4>
                                                <ProfileInfoSocial />
                                            </div>
                                        </>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </section>
            )}
        </div>
    );
}
