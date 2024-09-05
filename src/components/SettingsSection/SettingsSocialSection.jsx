import { useState } from 'react';
import { useAuth } from '../../hook/useAuth';

const lang = localStorage.getItem('language');

export default function SettingsSocialSection({ isMsg }) {
    const { user } = useAuth();
    const [isButton, setIsButton] = useState(true);
    const [isSoundCloud, setIsSoundCloud] = useState(user[17]);
    const [isYoutube, setIsYoutube] = useState(user[18]);
    const [isRutube, setIsRutube] = useState(user[19]);
    const [isTiktok, setIsTiktok] = useState(user[20]);
    const [isTwitch, setIsTwitch] = useState(user[21]);

    function updateSocial(e) {
        e.preventDefault();
        setIsButton(false);

        var url = 'https://melodymind.tw1.ru/config/updateSocial.php';
        var Data = {
            id: user[1],
            soundCloud: isSoundCloud,
            youtube: isYoutube,
            rutube: isRutube,
            tiktok: isTiktok,
            twitch: isTwitch,
        };

        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setIsButton(true);
                isMsg(response[0].result);
            })
            .catch(() => {
                setIsButton(true);
                isMsg(
                    lang == 'en'
                        ? 'Connection error. Try to reload the page'
                        : 'Ошибка соединения. Попробуйте перезагрузить страницу'
                );
            });
    }

    return (
        <form method="" onSubmit={updateSocial}>
            <section className="settings-text">
                <div>
                    <label htmlFor="soundCloud">Sound Cloud</label>
                    {isSoundCloud == '' && (
                        <span className="placeholder">
                            <span className="domain">
                                <del>soundcloud.com/</del>
                            </span>
                            <span className="user">nickname</span>
                        </span>
                    )}
                    <input
                        type="text"
                        name="soundCloud"
                        value={isSoundCloud}
                        onChange={(e) => setIsSoundCloud(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="youtube">Youtube</label>
                    {isYoutube == '' && (
                        <span className="placeholder">
                            <span className="domain">
                                <del>youtube.com/</del>
                            </span>
                            <span className="user">nickname</span>
                        </span>
                    )}
                    <input
                        type="text"
                        name="youtube"
                        value={isYoutube}
                        onChange={(e) => setIsYoutube(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="rutube">Rutube</label>
                    {isRutube == '' && (
                        <span className="placeholder">
                            <span className="domain">
                                <del>rutube.ru/channel/</del>
                            </span>
                            <span className="user">nickname</span>
                        </span>
                    )}
                    <input
                        type="text"
                        name="rutube"
                        value={isRutube}
                        onChange={(e) => setIsRutube(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="tiktok">Tik-Tok</label>
                    {isTiktok == '' && (
                        <span className="placeholder">
                            <span className="domain">
                                <del>tictok.com/</del>
                            </span>
                            <span className="user">@nickname</span>
                        </span>
                    )}
                    <input
                        type="text"
                        name="tiktok"
                        value={isTiktok}
                        onChange={(e) => setIsTiktok(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="twitch">Twitch</label>
                    {isTwitch == '' && (
                        <span className="placeholder">
                            <span className="domain">
                                <del>twitch.tv/</del>
                            </span>
                            <span className="user">nickname</span>
                        </span>
                    )}
                    <input
                        type="text"
                        name="twitch"
                        value={isTwitch}
                        onChange={(e) => setIsTwitch(e.target.value)}
                    />
                </div>
                <button type="submit">
                    {isButton ? (
                        lang == 'en' ? (
                            'Save changes'
                        ) : (
                            'Сохранить изменения'
                        )
                    ) : (
                        <div className="spinner"></div>
                    )}
                </button>
            </section>
        </form>
    );
}
