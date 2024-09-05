// Импорт библиотек и данных
import { lazy, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useResize } from '../hook/useResize';

// Импорт компонентов
const Footer = lazy(() => import('./Footer/Footer'));
const Header = lazy(() => import('./Header/Header'));
const TopButton = lazy(() => import('./TopButton/TopButton'));
const MusicBar = lazy(() => import('./MusicBar/MusicBar'));

// Импорт страниц
const Authorization = lazy(() =>
    import('../pages/Authorization/Authorization')
);

export default function Layout({
    search,
    setSearch,
    isNotify,
    music,
    pause,
    setPause,
    timeBar,
}) {
    const { width } = useResize();
    const location = useLocation();
    const [modal, setModal] = useState(false);
    const isLocation =
        location.pathname == '/about' || location.pathname == '/contacts';

    return (
        <>
            {width >= 576 && <TopButton />}
            <Authorization
                open={modal}
                isModal={(current) => setModal(current)}
                isMsg={(current) => isNotify(current)}
            />
            <Header
                isMsg={(current) => isNotify(current)}
                isModal={(current) => setModal(current)}
                search={search}
                setSearch={(current) => setSearch(current)}
            />
            <main
                style={{
                    marginTop:
                        width <= 576
                            ? isLocation
                                ? '55px'
                                : '105px'
                            : '115px',
                }}
            >
                <Outlet></Outlet>
            </main>
            <Footer />
            <MusicBar
                music={music}
                pause={pause}
                setPause={(current) => setPause(current)}
                timeBar={timeBar}
            />
        </>
    );
}
