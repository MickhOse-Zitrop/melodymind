import { mainTracks } from '../../data/data';
import { Link } from 'react-router-dom';

import TrackSort from '../../components/TrackSort/TrackSort';

import noneImage from '/images/none_image.png';

import './Tracks.css';

const lang = localStorage.getItem('language');

export default function Tracks() {
    var i = 0;

    return (
        <div className="tracks-container _container">
            <div className="tracks-search">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    method="get"
                    className="tracks-search-form"
                >
                    <button className="tracks-search-submit" type="submit">
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                    <input
                        type="text"
                        placeholder={
                            lang == 'en' ? 'Searching by tag' : 'Поиск по тегу'
                        }
                        className="tracks-search-input"
                    />
                </form>
                {[...Array(28)].map((tag) => (
                    <section className="tracks-search-tag" key={i++}>
                        {lang == 'en' ? 'Tag №n' : 'Tег №1'}
                    </section>
                ))}
            </div>
            <div className="tracks-refresh">
                <button className="tracks-refresh-button">
                    <i className="fa-solid fa-arrows-rotate" />
                    {lang == 'en' ? 'Refresh' : 'Обновить'}
                </button>
            </div>
            <div className="tracks-body">
                <TrackSort />
                <section className="tracks-main">
                    {mainTracks.map((item) => (
                        <div key={item.id} className="tracks-section">
                            <div>
                                <img
                                    src={item.image || noneImage}
                                    alt="Track"
                                />
                            </div>
                            <p
                                style={{
                                    cursor: 'default',
                                    userSelect: 'none',
                                }}
                                to={'/' + item.id}
                                id="price"
                                className="tracks-item"
                            >
                                {item.price &&
                                    item.price +
                                        (lang == 'en' ? ' rubles' : ' рублей')}
                            </p>
                            <Link
                                to={'/tracks/' + item.id}
                                id="title"
                                className="tracks-item"
                            >
                                {item.title}
                            </Link>
                            <Link
                                to={'/' + item.idAuthor}
                                id="author"
                                className="tracks-item"
                            >
                                {item.author}
                            </Link>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
