// Импорт библиотек и данных
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const lang = localStorage.getItem('language');

export default function SettingsCreditSection({ isMsg }) {
    const { user } = useAuth();

    function copyTextToClipboard() {
        navigator.clipboard.writeText(user[1]);
        isMsg(lang == 'en' ? 'ID has been copied' : 'ID скопирован');
    }

    return (
        <form>
            <section className="settings-text">
                <ul className="settings-text-list">
                    <li>
                        <h3>{lang == 'en' ? 'Email' : 'Эл. почта'}</h3>
                        <section>
                            <label htmlFor="">{user[3]}</label>
                            <Link target="_blank" to="/reset-email">
                                {lang == 'en'
                                    ? 'Change email'
                                    : 'Изменить электронную почту'}
                            </Link>
                        </section>
                    </li>
                    <li>
                        <h3>ID</h3>
                        <section>
                            <label htmlFor="">{user[1]}</label>
                            <a onClick={() => copyTextToClipboard()}>
                                {lang == 'en' ? 'Copy ID' : 'Скопировать ID'}
                            </a>
                        </section>
                    </li>
                    <li>
                        <h3>{lang == 'en' ? 'Password' : 'Пароль'}</h3>
                        <section>
                            <label htmlFor="">********</label>
                            <Link target="_blank" to="/change-password">
                                {lang == 'en'
                                    ? 'Change password'
                                    : 'Изменить пароль'}
                            </Link>
                        </section>
                    </li>
                    <li>
                        <h3>
                            {lang == 'en' ? 'Phone number' : 'Номер телефона'}
                        </h3>
                        <section>
                            <label htmlFor="">
                                {user[15]
                                    ? `+${user[15]}`
                                    : lang == 'en'
                                    ? "You don't have a phone number"
                                    : 'Не подключен'}
                            </label>
                            <Link target="_blank" to="/add-phone-number">
                                {lang == 'en'
                                    ? 'Change phone number'
                                    : 'Изменить номер телефона'}
                            </Link>
                        </section>
                    </li>
                    <li>
                        <h3>
                            {lang == 'en'
                                ? '2-Auth'
                                : 'Двухфакторная аутентификация'}
                        </h3>
                        <section>
                            <label htmlFor="">
                                {lang == 'en'
                                    ? 'Not connected'
                                    : 'Не подключена'}
                            </label>
                            <Link>
                                {lang == 'en'
                                    ? 'Change the security method'
                                    : 'Изменить метод обеспечения безопасности'}
                            </Link>
                        </section>
                    </li>
                </ul>
            </section>
        </form>
    );
}
