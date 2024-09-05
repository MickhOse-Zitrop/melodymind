import { NavLink } from 'react-router-dom';
import './Header/Header.css';

const lang = localStorage.getItem('language');

export default function HeaderMobileMenu({ menu, setMenu }) {
    return (
        <div
            className={`header-menu ${menu && 'show'}`}
            onClick={() => setMenu(false)}
        >
            <div className="header-menu-container _container">
                <ul>
                    <li>
                        <NavLink to="/feed">
                            {lang == 'en' ? 'Feed' : 'Лента'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tracks">
                            {lang == 'en' ? 'Tracks' : 'Треки'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sounds">
                            {lang == 'en' ? 'Sound kits' : 'Наборы звуков'}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
