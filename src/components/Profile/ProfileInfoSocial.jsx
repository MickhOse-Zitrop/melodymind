import { useAuth } from '../../hook/useAuth';

export default function ProfileInfoSocial() {
    const { user } = useAuth();

    return (
        <ul>
            {user[17] && (
                <li>
                    <a
                        href={'https://soundcloud.com/' + user[17]}
                        target="_blank"
                    >
                        <i className="fa-brands fa-soundcloud"></i>
                        <p>Sound Cloud</p>
                    </a>
                </li>
            )}
            {user[18] && (
                <li>
                    <a href={'https://youtube.com/' + user[18]} target="_blank">
                        <i className="fa-brands fa-youtube"></i>
                        <p>Youtube</p>
                    </a>
                </li>
            )}
            {user[19] && (
                <li>
                    <a
                        href={'https://rutube.ru/channel/' + user[19]}
                        target="_blank"
                    >
                        <i className="fa-brands fa-rust"></i>
                        <p>Rutube</p>
                    </a>
                </li>
            )}
            {user[20] && (
                <li>
                    <a href={'https://tiktok.com/' + user[20]} target="_blank">
                        <i className="fa-brands fa-tiktok"></i>
                        <p>Tik-Tok</p>
                    </a>
                </li>
            )}
            {user[21] && (
                <li>
                    <a href={'https://twitch.tv/' + user[21]} target="_blank">
                        <i className="fa-brands fa-twitch"></i>
                        <p>Twitch</p>
                    </a>
                </li>
            )}
        </ul>
    );
}
