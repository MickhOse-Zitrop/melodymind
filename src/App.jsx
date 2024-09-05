// Импорт библиотек и данных
import { Suspense, lazy, useEffect, useState } from 'react';
import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

// Импорт хуков
import { RequireAuth } from './hoc/RequireAuth';
import { RequireNoAuth } from './hoc/RequireNoAuth';
import { AuthProvider } from './hoc/AuthProvider';

// Импорт компонентов
const Layout = lazy(() => import('./components/Layout'));
import Notify from './components/Notify';
const SettingsProfileSection = lazy(() =>
    import('./components/SettingsSection/SettingsProfileSection')
);
const SettingsCreditSection = lazy(() =>
    import('./components/SettingsSection/SettingsCreditSection')
);
const SettingsSocialSection = lazy(() =>
    import('./components/SettingsSection/SettingsSocialSection')
);
const SettingsSubSection = lazy(() =>
    import('./components/SettingsSection/SettingsSubSection')
);

// Импорт страниц
const About = lazy(() => import('./pages/About/About'));
const AddPhoneNumber = lazy(() =>
    import('./pages/Authorization/AddPhoneNumber')
);
const Admin = lazy(() => import('./pages/AdminSection/Admin'));
const Authorization = lazy(() => import('./pages/Authorization/Authorization'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
const Feed = lazy(() => import('./pages/Feed/Feed'));
const Main = lazy(() => import('./pages/Main/Main'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const ResetEmail = lazy(() => import('./pages/Authorization/ResetEmail'));
const ResetPassword = lazy(() => import('./pages/Authorization/ResetPassword'));
const Settings = lazy(() => import('./pages/SettingsAccount/Settings'));
const SignIn = lazy(() => import('./pages/Authorization/SignIn'));
const SignUp = lazy(() => import('./pages/Authorization/SignUp'));
const Sounds = lazy(() => import('./pages/Sounds'));
const TrackCard = lazy(() => import('./pages/TrackCard/TrackCard'));
const Tracks = lazy(() => import('./pages/Tracks/Tracks'));
const Wallet = lazy(() => import('./pages/Wallet/Wallet'));

export default function App() {
    const [search, setSeacrh] = useState('');
    const [notify, setNotify] = useState('');
    const [music, setMusic] = useState({});
    const [pause, setPause] = useState(false);
    const [timeBar, setTimeBar] = useState(0);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <Layout
                                search={search}
                                setSearch={(current) => setSeacrh(current)}
                                notifyMessage={notify}
                                isNotify={(current) => setNotify(current)}
                                music={music}
                                pause={pause}
                                setPause={(current) => setPause(current)}
                                timeBar={timeBar}
                            />
                        </Suspense>
                    }
                >
                    <Route
                        index
                        element={
                            <Main
                                search={search}
                                setSearch={(current) => setSeacrh(current)}
                                isNotify={(current) => setNotify(current)}
                            />
                        }
                    />
                    <Route path="about" element={<About />} />
                    <Route
                        path="admin/"
                        element={
                            <RequireAuth>
                                <Admin />
                            </RequireAuth>
                        }
                    >
                        <Route path="site"></Route>
                        <Route path="tracks"></Route>
                        <Route path="users"></Route>
                    </Route>
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="feed" element={<Feed />} />
                    <Route
                        path="profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="settings"
                        element={
                            <RequireAuth>
                                <Settings />
                            </RequireAuth>
                        }
                    >
                        <Route
                            path="credit"
                            element={
                                <SettingsCreditSection
                                    isMsg={(current) => setNotify(current)}
                                />
                            }
                        />
                        <Route
                            path="profile"
                            element={
                                <SettingsProfileSection
                                    isMsg={(current) => setNotify(current)}
                                />
                            }
                        />
                        <Route
                            path="social"
                            element={
                                <SettingsSocialSection
                                    isMsg={(current) => setNotify(current)}
                                />
                            }
                        />
                        <Route
                            path="subscription"
                            element={<SettingsSubSection />}
                        />
                    </Route>
                    <Route path="sounds" element={<Sounds />} />
                    <Route path="tracks" element={<Tracks />} />
                    <Route
                        path="tracks/:idTrack"
                        element={
                            <TrackCard
                                setMusic={(current) => setMusic(current)}
                                setPause={(current) => setPause(current)}
                                pause={pause}
                                timeBar={timeBar}
                                setTimeBar={(current) => setTimeBar(current)}
                            />
                        }
                    />
                    <Route
                        path="wallet"
                        element={
                            <RequireAuth>
                                <Wallet
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route
                    path="/add-phone-number"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <RequireAuth>
                                <AddPhoneNumber
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireAuth>
                        </Suspense>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <RequireNoAuth>
                                <Authorization
                                    open={true}
                                    target={true}
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireNoAuth>
                        </Suspense>
                    }
                />
                <Route
                    path="/reset-email"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <RequireAuth>
                                <ResetEmail
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireAuth>
                        </Suspense>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <RequireNoAuth>
                                <ResetPassword
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireNoAuth>
                        </Suspense>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <RequireNoAuth>
                                <SignIn
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireNoAuth>
                        </Suspense>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <Suspense
                            fallback={
                                <div id="preloader" className="show">
                                    <div className="spinner"></div>
                                </div>
                            }
                        >
                            <RequireNoAuth>
                                <SignUp
                                    isMsg={(current) => setNotify(current)}
                                />
                            </RequireNoAuth>
                        </Suspense>
                    }
                />
            </>
        )
    );

    return (
        <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
            {notify && <Notify setShow={() => setNotify('')}>{notify}</Notify>}
        </AuthProvider>
    );
}
