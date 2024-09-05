// Импорт библиотек и данных
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { mainTracks } from '../../data/data';

// Импорт стилей и изображений
import noneImage from '/images/none_image.png';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './MainSection.css';

const lang = localStorage.getItem('language');

export default function MainSection({ children }) {
    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: checkWindow(),
        slidesToScroll: checkWindow() / 6,
        swipeToSlide: true,
    };

    function checkWindow() {
        if (window.innerWidth < 1250 && window.innerWidth >= 1050) {
            return 5;
        } else if (window.innerWidth < 1050 && window.innerWidth >= 850) {
            return 4;
        } else if (window.innerWidth < 850 && window.innerWidth >= 625) {
            return 3;
        } else if (window.innerWidth < 625 && window.innerWidth >= 425) {
            return 2;
        } else if (window.innerWidth < 425 && window.innerWidth >= 325) {
            return 1.5;
        } else if (window.innerWidth < 325 && window.innerWidth >= 0) {
            return 1.2;
        } else {
            return 6;
        }
    }

    return (
        <section className="main-section">
            <div className="_container">
                <div className="section-title">
                    <h3>
                        {children == mainTracks
                            ? lang == 'en'
                                ? 'Trends'
                                : 'Тренды'
                            : lang == 'en'
                            ? 'Popular geners'
                            : 'Популярные жанры'}
                    </h3>
                    {children == mainTracks && (
                        <h4>
                            {lang == 'en' ? 'More' : 'Смотреть всё'}{' '}
                            <i className="fa-solid fa-chevron-right"></i>
                        </h4>
                    )}
                </div>
                <Slider {...settings}>
                    {children.map((item) => (
                        <div key={item.image}>
                            <div className="track-section">
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
                                    className="track-item"
                                >
                                    {item.price &&
                                        item.price +
                                            (lang == 'en'
                                                ? ' rubles'
                                                : ' рублей')}
                                </p>
                                <Link
                                    to={'/tracks/' + item.id}
                                    id="title"
                                    className="track-item"
                                >
                                    {item.title}
                                </Link>
                                <Link
                                    to={'/' + item.idAuthor}
                                    id="author"
                                    className="track-item"
                                >
                                    {item.author}
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
