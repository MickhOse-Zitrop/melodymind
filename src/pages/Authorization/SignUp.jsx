import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BlueButton from '../../components/BlueButton/BlueButton';

import userLogo from '/images/user.png';
import './Authorization.css';

const lang = localStorage.getItem('language');

export default function SignUp({ isMsg }) {
    const navigate = useNavigate();
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const [isEmail, setIsEmail] = useState(localStorage.getItem('loginEmail'));
    const [isPassword, setIsPassword] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState('');
    const [isAllow, setIsAllow] = useState(false);
    const [isButton, setIsButton] = useState(true);
    const [disable, setDisable] = useState(true);
    const [lock, setLock] = useState(true);

    function signUp(e) {
        e.preventDefault();
        setIsButton(false);
        setDisable(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        var url = 'https://melodymind.tw1.ru/config/sign-up.php';
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
                localStorage.setItem('loginEmail', email);
                isMsg(response[0].result);
                response[0].login
                    ? navigate('/sign-in', { replace: true })
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
        if (isEmail && isEmail.match(isValidEmail)) {
            if (isPassword == isCorrectPassword) {
                if (isAllow) setDisable(false);
                else setDisable(true);
            } else setDisable(true);
        } else setDisable(true);
    }, [isEmail, isPassword, isCorrectPassword, isAllow]);

    return (
        <dialog open>
            <div className="sign-wrap">
                <h3 className="sign-title">
                    <button onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    {lang == 'en' ? 'Register with' : 'Зарегистрироваться с'}
                </h3>
                <form onSubmit={signUp} method="post" className="sign-self">
                    {isEmail ? (
                        <div className="login-section">
                            <img src={userLogo} alt="" />
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
                                onClick={() => setIsEmail('')}
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
                                // value={isEmail}
                                // onChange={(e) => setIsEmail(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <label htmlFor="password">
                        {lang == 'en'
                            ? 'Create a password'
                            : 'Придумайте пароль'}
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
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            required
                        />
                        <i
                            className={`fa-solid fa-lock${lock ? '' : '-open'}`}
                            onClick={() => setLock(!lock)}
                        />
                    </div>
                    <span
                        style={{
                            marginBottom: '15px',
                            color: '#707070',
                            fontSize: '12px',
                        }}
                    >
                        {lang == 'en'
                            ? 'At least 8 characters, including capital letter, number and special character'
                            : 'Не менее 8 символов, включая заглавную букву, цифру и специальный символ'}
                    </span>
                    <label htmlFor="passwordCheck">
                        {lang == 'en'
                            ? 'Confirm a password'
                            : 'Подтвердите пароль'}
                    </label>
                    <input
                        type="password"
                        name="passwordCheck"
                        id="passwordCheck"
                        placeholder={
                            lang == 'en'
                                ? 'Enter password again'
                                : 'Введите пароль еще раз'
                        }
                        onChange={(e) => setIsCorrectPassword(e.target.value)}
                        required
                    />
                    <div className="check-box">
                        <input
                            type="checkbox"
                            name="allow"
                            id="allow"
                            checked={isAllow}
                            onChange={() => setIsAllow(!isAllow)}
                        />
                        <label
                            htmlFor="allow"
                            // onClick={() => setAllow(!isAllow)}
                        >
                            {lang == 'en'
                                ? 'I read and agree with '
                                : ' Я прочёл(-ла) и соглашаюсь с '}
                            <a
                                href={
                                    lang == 'en'
                                        ? '/src/assets/docs/Privacy policy.pdf'
                                        : '/src/assets/docs/Политика конфиденциальности.pdf'
                                }
                                download
                            >
                                {lang == 'en'
                                    ? 'The User Agreement'
                                    : 'Пользовательским соглашением'}
                            </a>
                            {lang == 'en' ? 'and' : ' и '}
                            <a
                                href={
                                    lang == 'en'
                                        ? '/src/assets/docs/Privacy policy.pdf'
                                        : '/src/assets/docs/Политика конфиденциальности.pdf'
                                }
                                download
                            >
                                {lang == 'en'
                                    ? 'Privacy Policy'
                                    : 'Политикой конфиденциальности'}
                            </a>
                        </label>
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
