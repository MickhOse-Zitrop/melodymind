// Импорт библиотек и данных
import { Outlet, useLocation } from 'react-router-dom';

// Импорт компонентов
import SettingsSideSection from '../../components/SettingsSection/SettingsSideSection';

// Импорт стилей и изображений
import './Settings.css';

const lang = localStorage.getItem('language');

export default function Settings() {
    const location = useLocation();

    return (
        <div className="settings-container">
            <div className="_container">
                <h1 className="settings-title">
                    {lang == 'en' ? 'Account settings' : 'Настройки аккаунта'}
                </h1>
                <div className="settings-section">
                    <SettingsSideSection />
                    <div className="settings-section-main">
                        {location.pathname == '/settings' ||
                        location.pathname == '/settings/' ? (
                            <section className="settings-section-main-intro">
                                {lang == 'en'
                                    ? 'Select the section to configure'
                                    : 'Выберите раздел для настройки'}
                            </section>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
