import { useState } from 'react';
import { tracksGenres, tracksGenresEn } from '../../data/data';

const lang = localStorage.getItem('language');

export default function TrackSort() {
    const [additional, setAdditional] = useState(false);
    const [serachGenre, setSeacrhGenre] = useState('');
    const [lowPrice, setLowPrice] = useState(0);
    const [highPrice, setHighPrice] = useState(100000);
    const [lowBPM, setLowBPM] = useState(0);
    const [highBPM, setHighBPM] = useState(300);

    var itemCount = 0;

    function sortingBy(e) {
        const id = e.target.id;
        e.target.classList.toggle('active');
        document.getElementById(`menu-${id}`).classList.toggle('active');
    }

    return (
        <section className="tracks-filter">
            <form
                onSubmit={(e) => e.preventDefault()}
                method="get"
                className="tracks-filter-form"
            >
                <button
                    type="button"
                    className="tracks-filter-form-button"
                    onClick={() => setAdditional(!additional)}
                >
                    <i className="fa-solid fa-filter" />
                    {additional
                        ? lang == 'en'
                            ? 'Less options'
                            : 'Меньше фильтров'
                        : lang == 'en'
                        ? 'More options'
                        : 'Больше фильтров'}
                </button>
                <div className="tracks-filter-section">
                    <div
                        id="genreFilter"
                        className="tracks-filter-option"
                        onClick={(e) => sortingBy(e)}
                    >
                        {lang == 'en' ? 'Genres' : 'Жанры'}{' '}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <div className="tracks-filter-menu" id="menu-genreFilter">
                        <section className="tracks-filter-menu-search">
                            <button
                                type="button"
                                className="tracks-filter-menu-search-button"
                            >
                                <i className="fa-solid fa-magnifying-glass" />
                            </button>
                            <input
                                type="text"
                                className="tracks-filter-menu-search-input"
                                onChange={(e) => setSeacrhGenre(e.target.value)}
                                placeholder={
                                    lang == 'en'
                                        ? 'Search by tag'
                                        : 'Поиск по тегу'
                                }
                            />
                        </section>
                        <ul className="tracks-filter-menu-option-list">
                            {(lang == 'en' ? tracksGenresEn : tracksGenres)
                                .filter(
                                    (item) =>
                                        item.title
                                            .toLowerCase()
                                            .includes(
                                                serachGenre.toLowerCase()
                                            ) ||
                                        item.id
                                            .toLowerCase()
                                            .includes(serachGenre.toLowerCase())
                                )
                                .map(
                                    (genre) =>
                                        itemCount++ < 4 && (
                                            <li
                                                key={genre.id}
                                                className="tracks-filter-menu-option-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name={
                                                        lang == 'en'
                                                            ? 'Genre'
                                                            : 'Жанр'
                                                    }
                                                    id={genre.id}
                                                    className="tracks-filter-menu-option-item-input"
                                                />
                                                <label
                                                    htmlFor={genre.id}
                                                    className="tracks-filter-menu-option-item-label"
                                                >
                                                    {genre.title}
                                                </label>
                                            </li>
                                        )
                                )}
                        </ul>
                    </div>
                </div>
                <div className="tracks-filter-section">
                    <div
                        id="typeFilter"
                        className="tracks-filter-option"
                        onClick={sortingBy}
                    >
                        {lang == 'en' ? 'Track Type' : 'Тип трека'}{' '}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <div className="tracks-filter-menu" id="menu-typeFilter">
                        <ul className="tracks-filter-menu-radio-list">
                            <li className="tracks-filter-menu-radio-item">
                                <input
                                    type="radio"
                                    name={lang == 'en' ? 'Type' : 'Тип'}
                                    id="composition"
                                    className="tracks-filter-menu-radio-item-input"
                                />
                                <label
                                    htmlFor="composition"
                                    className="tracks-filter-menu-radio-item-label"
                                >
                                    {lang == 'en'
                                        ? 'Composition'
                                        : 'Композиция'}
                                </label>
                            </li>
                            <li className="tracks-filter-menu-radio-item">
                                <input
                                    type="radio"
                                    name={lang == 'en' ? 'Type' : 'Тип'}
                                    id="voice"
                                    className="tracks-filter-menu-radio-item-input"
                                />
                                <label
                                    htmlFor="voice"
                                    className="tracks-filter-menu-radio-item-label"
                                >
                                    {lang == 'en' ? 'Voice' : 'Вокал'}
                                </label>
                            </li>
                            <li className="tracks-filter-menu-radio-item">
                                <input
                                    type="radio"
                                    name={lang == 'en' ? 'Type' : 'Тип'}
                                    id="beat"
                                    className="tracks-filter-menu-radio-item-input"
                                />
                                <label
                                    htmlFor="beat"
                                    className="tracks-filter-menu-radio-item-label"
                                >
                                    {lang == 'en' ? 'Beat' : 'Бит'}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tracks-filter-section">
                    <div
                        id="priceFilter"
                        className="tracks-filter-option"
                        onClick={sortingBy}
                    >
                        {lang == 'en' ? 'Price' : 'Цена'}{' '}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <div className="tracks-filter-menu" id="menu-priceFilter">
                        <section className="tracks-filter-menu-range">
                            <input
                                type="number"
                                name="lowPrice"
                                id="lowPrice"
                                min={0}
                                onChange={(e) => setLowPrice(e.target.value)}
                                onBlur={() =>
                                    lowPrice < 0
                                        ? setLowPrice(0)
                                        : lowPrice > 100000
                                        ? setLowPrice(100000)
                                        : null
                                }
                                value={lowPrice}
                            />
                            {lang == 'en' ? 'to' : 'до'}
                            <input
                                type="number"
                                name="highPrice"
                                id="highPrice"
                                max={100000}
                                onChange={(e) => setHighPrice(e.target.value)}
                                onBlur={() =>
                                    highPrice < 0
                                        ? setHighPrice(0)
                                        : highPrice > 100000
                                        ? setHighPrice(100000)
                                        : null
                                }
                                value={highPrice}
                            />
                        </section>
                        <ul className="tracks-filter-menu-option-list">
                            <li className="tracks-filter-menu-option-item">
                                <input
                                    type="checkbox"
                                    name={
                                        lang == 'en' ? 'Special' : 'Эксклюзив'
                                    }
                                    id="specialOffer"
                                    className="tracks-filter-menu-option-item-input"
                                />
                                <label
                                    htmlFor="specialOffer"
                                    className="tracks-filter-menu-option-item-label"
                                >
                                    {lang == 'en'
                                        ? 'Special offers'
                                        : 'Эксклюзивы'}
                                </label>
                            </li>
                            <li className="tracks-filter-menu-option-item">
                                <input
                                    type="checkbox"
                                    name={lang == 'en' ? 'Free' : 'Бесплатно'}
                                    id="freeOffer"
                                    className="tracks-filter-menu-option-item-input"
                                />
                                <label
                                    htmlFor="freeOffer"
                                    className="tracks-filter-menu-option-item-label"
                                >
                                    {lang == 'en'
                                        ? 'Free beats'
                                        : 'Бесплатные биты'}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tracks-filter-section">
                    <div
                        id="bpmFilter"
                        className="tracks-filter-option"
                        onClick={sortingBy}
                    >
                        BPM <i className="fa-solid fa-chevron-down" />
                    </div>
                    <div className="tracks-filter-menu" id="menu-bpmFilter">
                        <section className="tracks-filter-menu-range">
                            <input
                                type="number"
                                name="lowBPM"
                                id="lowBPM"
                                onChange={(e) => setLowBPM(e.target.value)}
                                onBlur={() =>
                                    lowBPM < 0
                                        ? setLowBPM(0)
                                        : lowBPM > 300
                                        ? setLowBPM(300)
                                        : null
                                }
                                value={lowBPM}
                            />
                            {lang == 'en' ? 'to' : 'до'}
                            <input
                                type="number"
                                name="highBPM"
                                id="highBPM"
                                onChange={(e) => setHighBPM(e.target.value)}
                                onBlur={() =>
                                    highBPM < 0
                                        ? setHighBPM(0)
                                        : highBPM > 300
                                        ? setHighBPM(300)
                                        : null
                                }
                                value={highBPM}
                            />
                        </section>
                    </div>
                </div>
                <div className={`tracks-filter-section ${additional}`}>
                    <div
                        id="instrumentFilter"
                        className="tracks-filter-option"
                        onClick={sortingBy}
                    >
                        {lang == 'en' ? 'Instruments' : 'Инструменты'}{' '}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <div
                        className="tracks-filter-menu"
                        id="menu-instrumentFilter"
                    ></div>
                </div>
                <div className={`tracks-filter-section ${additional}`}>
                    <div
                        id="durationFilter"
                        className="tracks-filter-option"
                        onClick={sortingBy}
                    >
                        {lang == 'en' ? 'Duration' : 'Длительность'}{' '}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <div
                        className="tracks-filter-menu"
                        id="menu-durationFilter"
                    ></div>
                </div>
            </form>
            <div className="tracks-filter-sort">
                <button className="tracks-filter-sort-fav">
                    <i className="fa-regular fa-heart" />
                </button>
                <section className="tracks-filter-sort-option">
                    <h3 className="tracks-filter-sort-title">
                        {lang == 'en' ? 'Sort by' : 'Сортировать по'}:
                    </h3>
                    <div className="tracks-filter-sort-item">
                        {lang == 'en' ? 'Relevancy' : 'Релевантности'}{' '}
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                </section>
            </div>
        </section>
    );
}
