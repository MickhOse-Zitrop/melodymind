import { NavLink, Outlet } from 'react-router-dom';

import './Admin.css';

const lang = localStorage.getItem('language');

export default function Admin() {
    return (
        <div className="admin-section _container">
            <aside className="admin-side">
                <ul className="admin-side-list">
                    <li className="admin-side-list-item">
                        <NavLink to={'/admin/users'}>
                            {lang == 'en' ? 'Users' : 'Пользователи'}
                        </NavLink>
                    </li>
                    <li className="admin-side-list-item">
                        <NavLink to={'/admin/tracks'}>
                            {lang == 'en' ? 'Tracks' : 'Треки'}
                        </NavLink>
                    </li>
                    <li className="admin-side-list-item">
                        <NavLink to={'/admin/site'}>
                            {lang == 'en' ? 'Site' : 'Сайт'}
                        </NavLink>
                    </li>
                </ul>
            </aside>
            <div className="admin-main">
                <Outlet />
            </div>
        </div>
    );
}
