import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

import BlueButton from '../../components/BlueButton/BlueButton';

import './Authorization.css';

const lang = localStorage.getItem('language');

export default function ResetEmail({ isMsg }) {
    const { user } = useAuth();

    const dialog = useRef();
    const navigate = useNavigate();
    const email = user[3];
    const [disable, setDisable] = useState(true);
    const [isEmail, setIsEmail] = useState('');
    const [isButton, setIsButton] = useState(true);

    function reset(e) {
        e.preventDefault();
        setIsButton(false);

        var url = 'https://melodymind.tw1.ru/config/resetEmail.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = {
            email: email,
            newEmail: isEmail,
            language: lang,
            password: e.target.password.value,
        };
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
        var email = document.getElementById('newEmail');
        var password = document.getElementById('password');

        if (email.value && password.value) {
            password.classList.remove('error');
            setIsEmail(email.value);
            setDisable(false);
        } else {
            password.classList.add('error');
            setDisable(true);
        }
    }

    return (
        <dialog ref={dialog} open>
            <div className="sign-wrap">
                <h3 className="sign-title">
                    {lang == 'en'
                        ? 'Change your email'
                        : 'Поменяйте свою эл. почту'}
                </h3>

                <form onSubmit={reset} method="post" className="sign-self">
                    <input
                        type="hidden"
                        id="email"
                        name="email"
                        value={email}
                        readOnly
                    />
                    <label htmlFor="newEmail">
                        {lang == 'en' ? 'New email' : 'Новая эл. почта'}
                    </label>
                    <input
                        type="email"
                        name="newEmail"
                        id="newEmail"
                        placeholder={
                            lang == 'en' ? 'Enter email' : 'Введите эл. почту'
                        }
                        onChange={handlePasswordCorrect}
                        required
                    />
                    <label htmlFor="password">
                        {lang == 'en'
                            ? 'Confirm a password'
                            : 'Подтвердите пароль'}
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder={
                            lang == 'en' ? 'Enter password' : 'Введите пароль'
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
