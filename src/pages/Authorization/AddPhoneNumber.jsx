import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hook/useAuth';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import ru from 'react-phone-number-input/locale/ru';

import BlueButton from '../../components/BlueButton/BlueButton';

import 'react-phone-number-input/style.css';
import './Authorization.css';

const lang = localStorage.getItem('language');

export default function AddPhoneNumber({ isMsg }) {
    const dialog = useRef();
    const { user } = useAuth();
    const [disable, setDisable] = useState(true);
    const [value, setValue] = useState();
    const [isButton, setIsButton] = useState(true);

    useEffect(() => {
        value && isValidPhoneNumber(value)
            ? setDisable(false)
            : setDisable(true);
    }, [value]);

    function addPhone(e) {
        e.preventDefault();
        setIsButton(false);

        var url = 'https://melodymind.tw1.ru/config/addPhone.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = { id: user[1], phone: value.slice(1), language: lang };
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

    return (
        <dialog ref={dialog} open>
            <div className="sign-wrap">
                <h3 className="sign-title">
                    {lang == 'en'
                        ? 'Enter your phone number'
                        : 'Укажите свой номер телефона'}
                </h3>

                <form onSubmit={addPhone} method="post" className="sign-self">
                    <label htmlFor="password">
                        {lang == 'en' ? 'Phone number' : 'Номер телефона'}
                    </label>
                    <PhoneInput
                        labels={ru}
                        value={value}
                        international
                        onChange={setValue}
                        defaultCountry="RU"
                        countryCallingCodeEditable={false}
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
