// Импорт библиотек и данных
import { NavLink } from 'react-router-dom';

const lang = localStorage.getItem('language');

export default function SettingsSideSection() {
    return (
        <aside className="settings-side-section">
            <ul>
                <li>
                    <NavLink
                        to="/settings/profile"
                        className="settings-side-section-li"
                    >
                        {lang == 'en' ? 'Profile' : 'Профиль'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings/credit"
                        className="settings-side-section-li"
                    >
                        {lang == 'en' ? 'Credentials' : 'Учетные данные'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings/social"
                        className="settings-side-section-li"
                    >
                        {lang == 'en' ? 'Social network' : 'Социальные сети'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings/subscription"
                        className="settings-side-section-li"
                    >
                        {lang == 'en' ? 'Subscription' : 'Подписка'}
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}
