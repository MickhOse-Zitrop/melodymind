import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BlueButton from '../../components/BlueButton/BlueButton';

// Импорт стилей и изображений
import userLogo from '/images/user.png';
import './Authorization.css';

const lang = localStorage.getItem('language');

export default function SignIn({ isMsg }) {
    const dialog = useRef();
    const navigate = useNavigate();
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const [isEmail, setIsEmail] = useState(localStorage.getItem('loginEmail'));
    const [isPassword, setIsPassword] = useState('');
    const [isButton, setIsButton] = useState(true);
    const [disable, setDisable] = useState(true);
    const [lock, setLock] = useState(true);
    const [photo, setPhoto] = useState('');

    function updatePhoto() {
        var url = 'https://melodymind.tw1.ru/config/findPhoto.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = { email: isEmail };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setPhoto(response[0].result);
            })
            .catch(() => {});
    }

    function signIn(e) {
        e.preventDefault();
        setIsButton(false);
        setDisable(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        var url = 'https://melodymind.tw1.ru/config/sign-in.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = { email: email, password: password, language: lang };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setIsButton(true);
                setDisable(false);
                localStorage.removeItem('loginEmail');
                isMsg(response[0].result);
                response[0].login
                    ? navigate('/profile', { replace: true })
                    : null;
            })
            .catch(() => {
                setIsButton(true);
                setDisable(false);
                isMsg(
                    lang == 'en'
                        ? 'Connection error. Try to reload the page'
                        : 'Ошибка соединения. Попробуйте перезагрузить страницу'
                );
            });
    }

    useEffect(() => {
        if (!isEmail) {
            document.getElementById('emailNew').addEventListener('blur', () => {
                setIsEmail(document.getElementById('emailNew').value);
            });
        }
    });

    useEffect(() => {
        updatePhoto();
    });

    useEffect(() => {
        if (isEmail && isEmail.match(isValidEmail)) {
            if (isPassword) setDisable(false);
            else setDisable(true);
        } else setDisable(true);
    }, [isEmail, isPassword]);

    return (
        <dialog ref={dialog} open>
            <div className="sign-wrap">
                <h3 className="sign-title">
                    <button onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    {lang == 'en' ? 'Login with' : 'Войти с помощью'}
                </h3>
                <form onSubmit={signIn} method="post" className="sign-self">
                    {isEmail ? (
                        <div className="login-section">
                            <img src={photo ? photo : userLogo} alt="" />
                            <div className="">
                                <h5>{lang == 'en' ? 'Email' : 'Эл. почта'}</h5>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={isEmail}
                                    readOnly
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEmail('');
                                    // setDisable(true);
                                }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    ) : (
                        <>
                            <label htmlFor="">
                                {lang == 'en' ? 'Email' : 'Эл. почта'}
                            </label>
                            <input
                                type="email"
                                id="emailNew"
                                name="email"
                                placeholder={
                                    lang == 'en' ? 'Email' : 'Эл. почта'
                                }
                                // onChange={(e) => setIsEmail(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <label htmlFor="password" className="password-label-login">
                        {lang == 'en' ? 'Password' : 'Пароль'}
                        <Link to="/reset-password">
                            {lang == 'en'
                                ? 'Forgot password?'
                                : 'Забыли пароль?'}
                        </Link>
                    </label>
                    <div className="password-input">
                        <input
                            type={lock ? 'password' : 'text'}
                            name="password"
                            id="password"
                            placeholder={
                                lang == 'en'
                                    ? 'Enter password'
                                    : 'Введите пароль'
                            }
                            onChange={(e) => setIsPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`fa-solid fa-lock${lock ? '' : '-open'}`}
                            onClick={() => setLock(!lock)}
                        />
                    </div>
                    <BlueButton disabled={disable} type="submit">
                        {isButton ? (
                            lang == 'en' ? (
                                'Continue'
                            ) : (
                                'Продолжить'
                            )
                        ) : (
                            <div className="spinner"></div>
                        )}
                    </BlueButton>
                </form>
            </div>
        </dialog>
    );
}
