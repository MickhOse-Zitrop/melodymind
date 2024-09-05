// Импорт библиотек и данных
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contacts, contactsEn } from '../../data/data';
import { useResize } from '../../hook/useResize';

// Импорт стилей и изображений
import './Contacts.css';

const lang = localStorage.getItem('language');

export default function Contacts() {
    const { width } = useResize();

    var i = 0;

    return (
        <div className="contacts">
            <div className="_container">
                <h1>{lang == 'en' ? 'Contacts' : 'Контакты'}</h1>
                <div className="contacts-section">
                    <section id="index">
                        <div className="contacts-card-content">
                            <div>
                                <h3>{lang == 'en' ? 'Appeal' : 'Обращение'}</h3>
                                <p>
                                    {lang == 'en'
                                        ? 'If you have a question'
                                        : 'Если у Вас возник вопрос – '}
                                    <br />
                                    <a
                                        href="mailto:mm.business@internet.ru"
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {lang == 'en'
                                            ? 'Contact us'
                                            : 'напишите нам'}
                                    </a>
                                </p>
                            </div>
                            <Link to="/">
                                <button>
                                    {lang == 'en' ? 'FAQ' : 'Частые вопросы'}
                                </button>
                            </Link>
                        </div>
                        {width >= 576 && (
                            <div className="">
                                <img src="/images/contacts.png" alt="" />
                            </div>
                        )}
                    </section>
                    {(lang == 'en' ? contactsEn : contacts).map((e) => (
                        <section key={i++}>
                            <div className="contacts-card-content">
                                <div>
                                    <h3>{e.title}</h3>
                                    <p>{e.text}</p>
                                    {e.linkLink ? (
                                        <a
                                            href={e.linkLink}
                                            style={{ color: '#000' }}
                                            // target="_blank"
                                            download
                                        >
                                            {e.textLink}
                                        </a>
                                    ) : null}
                                </div>
                                <a href={e.link} target="_blank">
                                    {e.linkText}
                                </a>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
