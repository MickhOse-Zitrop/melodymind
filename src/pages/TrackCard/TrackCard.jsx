import { useParams } from 'react-router-dom';
import { mainTracks } from '../../data/data';
import { useEffect, useState } from 'react';

import './TrackCard.css';
import { useAudio } from '../../hook/useAudio';

const lang = localStorage.getItem('language');

export default function TrackCard({
    setMusic,
    setPause,
    pause,
    timeBar,
    setTimeBar,
}) {
    const [track, setTrack] = useState({ playTrack: [] });
    const { idTrack } = useParams();
    const { audio, play, setPlay, handleTimeBar, handlePlay, handleTime } =
        useAudio(track);

    var k = 0;

    // useEffect(() => setPause(play), [play]);
    useEffect(() => setPlay(pause), [pause]);

    useEffect(() => {
        mainTracks.map((object) => {
            if (object.id == idTrack)
                setTrack({
                    title: object.title,
                    author: object.author,
                    price: object.price,
                    image: object.image,
                    id: object.id,
                    idAuthor: object.idAuthor,
                    playTrack: object.playTrack,
                    audio: object.audio,
                });
        });
    }, []);

    audio.ontimeupdate = () => {
        if (audio.id == track.id) handleTime();
        setTimeBar(handleTimeBar);
    };

    return (
        <div className="track-container _container">
            <section className="track-sidebar">
                <div className="track-sidebar-main">
                    <div className="track-sidebar-image">
                        <img
                            src={
                                track.image
                                    ? track.image
                                    : '/images/none_image.png'
                            }
                            alt=""
                        />
                    </div>
                    <h2 className="track-sidebar-title">{track.title}</h2>
                    <h4 className="track-sidebar-author">{track.author}</h4>
                    <div className="track-sidebar-info">
                        <div className="track-sidebar-info-item">
                            <i className="fa-regular fa-heart" />
                            <h4 className="track-sidebar-info-item-number">
                                0
                            </h4>
                        </div>
                        <div className="track-sidebar-info-item">
                            <i className="fa-solid fa-repeat" />
                            <h4 className="track-sidebar-info-item-number">
                                0
                            </h4>
                        </div>
                        <div className="track-sidebar-info-item">
                            <i className="fa-solid fa-plus" />
                            <h4 className="track-sidebar-info-item-number"></h4>
                        </div>
                        <div className="track-sidebar-info-item">
                            <i className="fa-solid fa-arrow-up-from-bracket" />
                            <h4 className="track-sidebar-info-item-number"></h4>
                        </div>
                    </div>
                    <a
                        href={track.audio}
                        download={true}
                        className="track-sidebar-demo"
                    >
                        <i className="fa-solid fa-download" />
                        <h3 className="track-sidebar-demo-title">
                            {lang == 'en'
                                ? 'Download free'
                                : 'Скачать бесплатно'}
                        </h3>
                    </a>
                </div>
                <div className="track-sidebar-about">
                    <h3 className="track-sidebar-section-title">
                        {lang == 'en' ? 'Information' : 'Информация'}
                    </h3>
                    <ul className="track-sidebar-list">
                        <li className="track-sidebar-list-item">
                            <span>{lang == 'en' ? 'Released' : 'Выпущен'}</span>
                            <span>
                                {lang == 'en' ? 'Oct 10, 2022' : 'Окт 10, 2020'}
                            </span>
                        </li>
                        <li className="track-sidebar-list-item">
                            <span>BPM</span>
                            <span>120</span>
                        </li>
                        <li className="track-sidebar-list-item">
                            <span>
                                {lang == 'en' ? 'Listens' : 'Прослушиваний'}
                            </span>
                            <span>10</span>
                        </li>
                    </ul>
                </div>
                <div className="track-sidebar-about">
                    <h3 className="track-sidebar-section-title">
                        {lang == 'en' ? 'Tags' : 'Теги'}
                    </h3>
                    <ul className="track-sidebar-taglist">
                        <li className="track-sidebar-taglist-item">#Tag</li>
                        <li className="track-sidebar-taglist-item">#Tag</li>
                        <li className="track-sidebar-taglist-item">#Tag</li>
                    </ul>
                </div>
                <div className="track-sidebar-about">
                    <a href="">
                        <h6 className="track-sidebar-report">
                            <i className="fa-solid fa-flag" />
                            {lang == 'en' ? ' Report' : ' Пожаловаться'}
                        </h6>
                    </a>
                </div>
            </section>
            <section className="track-main">
                <div className="track-main-track">
                    <button
                        className="track-main-track-play"
                        onClick={() => {
                            setMusic(track);
                            handlePlay();
                            setPause(!play);
                        }}
                    >
                        <i
                            className={`fa-solid fa-${
                                play && audio.id == track.id ? 'pause' : 'play'
                            }`}
                        />
                    </button>
                    <div className="track-main-track-field">
                        <section className="track-main-track-field-cols">
                            {[...Array(88)].map(() => (
                                <div
                                    key={k++}
                                    id={`item${k}`}
                                    className="track-main-track-field-cols-item"
                                    style={{ height: `${track.playTrack[k]}%` }}
                                />
                            ))}
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
