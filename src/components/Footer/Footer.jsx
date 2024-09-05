// Импорт библиотек и данных
import { NavLink } from 'react-router-dom';
import { useResize } from '../../hook/useResize';
import { footerList, footerListEn } from '../../data/data';

// Импорт стилей и изображений
import logo from '/images/logo.png';
import './Footer.css';

const lang = localStorage.getItem('language');

export default function Footer() {
    const { width } = useResize();

    function showList(id) {
        document.getElementById(id).classList.toggle('showed');
        document.getElementById('i_' + id).classList.toggle('showed');
    }

    return (
        <footer>
            <div className="footer-container _container">
                <section className="footer-nav">
                    {width >= 576 && (
                        <div className="footer-column">
                            <NavLink to={'/'} className="footer-title">
                                <img src={logo} alt="Logo" />
                            </NavLink>
                            <p>
                                <strong>MelodyMind App </strong>
                                <br />
                                is coming soon
                            </p>
                        </div>
                    )}
                    {(lang == 'en' ? footerListEn : footerList).map((item) => (
                        <div className="footer-column" key={item.title}>
                            <h3
                                className="footer-title"
                                onClick={
                                    width <= 576
                                        ? () => showList(item.id)
                                        : null
                                }
                            >
                                {item.title}
                                {width <= 576 && (
                                    <i
                                        id={'i_' + item.id}
                                        className="fa-solid fa-chevron-down"
                                        style={{
                                            fontSize: '16px',
                                        }}
                                    ></i>
                                )}
                            </h3>

                            <ul id={item.id}>
                                {item.list.map((item) => (
                                    <li key={item.id} className="footer-item">
                                        <NavLink
                                            to={'/' + item.id}
                                            className="footer-link"
                                            download={item.download}
                                            target={item.target}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section className="footer-copyright">
                    <h2>
                        {width <= 576 ? (
                            <>
                                Copyright © 2024 MelodyMind Inc. <br /> Made
                                with ♥ by Mickose Zitrop
                            </>
                        ) : lang == 'en' ? (
                            'Copyright © 2024 MelodyMind Inc. - online music store | Made with ♥ by Mickose Zitrop'
                        ) : (
                            'Copyright © 2024 MelodyMind Inc. - интернет-магазин по продаже музыкальных композиций | Made with ♥ by MickhOse Zitrop'
                        )}
                    </h2>
                </section>
            </div>
        </footer>
    );
}
