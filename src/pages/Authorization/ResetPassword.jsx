import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BlueButton from '../../components/BlueButton/BlueButton';

import './Authorization.css';

const lang = localStorage.getItem('language');

export default function ResetPassword({ isMsg }) {
    const dialog = useRef();
    const navigate = useNavigate();
    const email = localStorage.getItem('loginEmail');
    const [disable, setDisable] = useState(true);
    const [isPassword, setIsPassword] = useState('');
    const [isButton, setIsButton] = useState(true);

    function reset(e) {
        e.preventDefault();
        setIsButton(false);

        var url = 'https://melodymind.tw1.ru/config/reset.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = { email: email, password: isPassword, language: lang };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setIsButton(true);
                isMsg(response[0].result);
            })
            .catch(() => {
                setIsButton(true);
                isMsg(
                    lang == 'en'
                        ? 'Connection error. Try to reload the page'
                        : 'Ошибка соединения. Попробуйте перезагрузить страницу'
                );
            });
    }

    function handlePasswordCorrect() {
        var password = document.getElementById('password');
        var passwordCheck = document.getElementById('passwordCheck');

        if (
            password.value == passwordCheck.value &&
            password.value &&
            passwordCheck.value
        ) {
            passwordCheck.classList.remove('error');
            setIsPassword(password.value);
            setDisable(false);
        } else {
            passwordCheck.classList.add('error');
            setDisable(true);
        }
    }

    return (
        <dialog ref={dialog} open>
            <div className="sign-wrap">
                <h3 className="sign-title">
                    <button onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    {lang == 'en'
                        ? 'Reset your password'
                        : 'Сбросьте свой пароль'}
                </h3>

                <form onSubmit={reset} method="post" className="sign-self">
                    <input
                        type="hidden"
                        id="email"
                        name="email"
                        value={email}
                        readOnly
                    />
                    <label htmlFor="password">
                        {lang == 'en'
                            ? 'Create a password'
                            : 'Придумайте пароль'}
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder={
                            lang == 'en' ? 'Enter password' : 'Введите пароль'
                        }
                        onChange={handlePasswordCorrect}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        required
                    />
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
                        onChange={handlePasswordCorrect}
                        required
                    />
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
