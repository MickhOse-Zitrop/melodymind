import { useEffect, useState } from 'react';
import { useAudio } from '../../hook/useAudio';
import { Link } from 'react-router-dom';

import './MusicBar.css';

export default function MusicBar({ music, pause, setPause, timeBar }) {
    const track = music;
    const { audio, play, handlePlay, setTimeOnBar } = useAudio(track);
    const [currentTime, setCurrentTime] = useState(timeBar);
    const [currentPause, setCurrentPause] = useState(false);

    useEffect(() => setCurrentTime(timeBar), [timeBar]);
    useEffect(() => setCurrentPause(pause), [pause]);

    return (
        <div className={`music-bar ${track.id && 'active'}`}>
            <div className="music-bar-container _container">
                <section className="music-bar-track">
                    <progress value={currentTime} max={100}></progress>
                    <input
                        type="range"
                        value={currentTime}
                        onChange={(e) => setCurrentTime(e.target.value)}
                        onMouseDown={() => audio.pause()}
                        onMouseUp={(e) => {
                            setTimeOnBar(e.target.value, currentPause);
                            setCurrentPause(false);
                        }}
                        name="track-bar"
                        max={100}
                    />
                </section>
                <div className="music-bar-content">
                    <section className="music-bar-info">
                        <img
                            src={
                                track.image
                                    ? track.image
                                    : '/images/none_image.png'
                            }
                            alt=""
                        />
                        <div className="music-bar-info-text">
                            <h3>
                                <Link to={`/tracks/${track.id}`}>
                                    {track.title}
                                </Link>
                            </h3>
                            <p>
                                <Link to={`/${track.idAuthor}`}>
                                    {track.author}
                                    <span className="music-bar-info-stat">
                                        0 plays
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </section>
                    <section className="music-bar-playback">
                        <i className="fa-solid fa-backward-step" />
                        <i
                            className={`fa-regular fa-circle-${
                                pause ? 'pause' : 'play'
                            }`}
                            onClick={() => {
                                handlePlay();
                                setPause(!play);
                            }}
                        />
                        <i className="fa-solid fa-forward-step" />
                    </section>
                    <section className="music-bar-settings">
                        <i className="fa-regular fa-heart"></i>
                        <i className="fa-solid fa-volume-xmark"></i>
                        <i className="fa-solid fa-volume-low"></i>
                        <i className="fa-solid fa-volume-high"></i>
                    </section>
                </div>
            </div>
        </div>
    );
}
