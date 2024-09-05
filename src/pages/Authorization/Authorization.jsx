// Импорт библиотек и данных
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

// Импорт компонентов
import BlueButton from '../../components/BlueButton/BlueButton';

// Импорт стилей и изображений
import './Authorization.css';

const lang = localStorage.getItem('language');

export default function Authorization({
    open,
    isModal,
    target,
    isMsg,
    // children,
}) {
    const dialog = useRef();
    const navigate = useNavigate();
    // const location = useLocation();

    const [disable, setDisable] = useState(true);
    const [email, setEmail] = useState('');

    // const { signIn } = useAuth();
    // const fromPage = location.state?.from?.pathname || '/';

    // Функция активирования кнопки
    function handleLoginChange(event) {
        if (event.target.value.trim().length) {
            setDisable(false);
            setEmail(event.target.value.trim());
        } else setDisable(true);
    }

    // Функция проверки почты в БД
    function findLogin(e) {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;

        var url = 'https://melodymind.tw1.ru/config/findLogin.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = { email: email };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                localStorage.setItem('loginEmail', email);
                navigate(`/${response[0].result}`, { replace: true });
            })
            .catch(() => closeModal());
    }

    // Функция закрытия модального окна
    function closeModal() {
        if (!target) {
            isModal(false);
            isMsg('Ошибка подключения');
        } else {
            isMsg('Ошибка подключения');
        }
    }

    // Функция открытия модального окна
    useEffect(() => {
        if (open) dialog.current.showModal();
        else dialog.current.close();
    }, [open]);

    return (
        <>
            <dialog ref={dialog} className="authorization">
                <div className="sign-wrap">
                    <h3 className="sign-title">
                        <button
                            onClick={
                                target
                                    ? () => navigate(-2)
                                    : () => isModal(false)
                            }
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        {lang == 'en' ? 'Continue with' : 'Продолжить с'}
                    </h3>
                    <form className="sign-self" onSubmit={findLogin}>
                        <label htmlFor="login">
                            {lang == 'en' ? 'Email' : 'Эл.почта'}
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleLoginChange}
                            required
                        />
                        <BlueButton disabled={disable} type="submit">
                            {lang == 'en' ? 'Continue' : 'Продолжить'}
                        </BlueButton>
                    </form>
                    <div className="hr-line">
                        <hr />
                        {lang == 'en' ? 'or' : 'или'}
                        <hr />
                    </div>
                    <form
                        action="./config/connect.php"
                        method="post"
                        className="sign-auth"
                        target="_blank"
                    >
                        <button>
                            <img src="/images/google.png" alt="Google" />
                            {lang == 'en'
                                ? 'Login with Google Account'
                                : 'Войти с аккаунтом Google'}
                        </button>
                        <button>
                            <img src="/images/yandex.png" alt="Yandex" />
                            {lang == 'en'
                                ? 'Login with Yandex Account'
                                : 'Войти с аккаунтом Яндекс'}
                        </button>
                    </form>
                    <p className="sign-policy">
                        {lang == 'en'
                            ? 'By creating an account and/or signing in, you agree to '
                            : 'Создавая учетную запись и/или входя в систему, Вы соглашаетесь с '}
                        <a
                            href={
                                lang == 'en'
                                    ? '/docs/Terms of Use.pdf'
                                    : '/docs/Условия пользования.pdf'
                            }
                            target="_blank"
                        >
                            {lang == 'en'
                                ? 'Terms of Use'
                                : 'Условиями использования'}
                        </a>
                        {lang == 'en' ? ' and ' : ' и '}
                        <a
                            href={
                                lang == 'en'
                                    ? '/docs/Privacy Policy.pdf'
                                    : '/docs/Политика конфиденциальности.pdf'
                            }
                            target="_blank"
                        >
                            {lang == 'en'
                                ? 'Privacy Policy'
                                : 'Политикой конфиденциальности'}
                        </a>{' '}
                        MelodyMind
                    </p>
                </div>
            </dialog>
        </>
    );
}
