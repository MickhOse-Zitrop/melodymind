import { useState } from 'react';
import BlueButton from '../../components/BlueButton/BlueButton';
import { useAuth } from '../../hook/useAuth';

import './Wallet.css';

const lang = localStorage.getItem('language');

export default function Wallet({ isMsg }) {
    const { user } = useAuth();

    const [topUp, setTopUp] = useState();

    function handleTopUp(e) {
        e.preventDefault();

        let sum = Number(user[22]) + Number(e.target.sum.value);

        var url = 'https://melodymind.tw1.ru/config/topUp.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        var Data = {
            id: user[1],
            sum: sum,
            language: lang,
        };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                isMsg(response[0].result);
            })
            .catch(() => {
                isMsg(
                    lang == 'en'
                        ? 'Connection error. Try to reload the page'
                        : 'Ошибка соединения. Попробуйте перезагрузить страницу'
                );
            });
    }

    return (
        <div className="wallet-container _container">
            <h1 className="wallet-title">Баланс</h1>
            <div className="wallet-section">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="wallet-form"
                >
                    <h3 className="wallet-form-title">
                        Ваш текущий баланс: {user[22]} рублей
                    </h3>
                    <button onClick={() => setTopUp(true)}>Пополнить</button>
                    <button disabled>Вывести</button>
                </form>
                {topUp && (
                    <form className="wallet-form" onSubmit={handleTopUp}>
                        <h3 className="wallet-form-title">Введите сумму</h3>
                        <input type="number" name="sum" id="sum" />
                        <BlueButton>Пополнить</BlueButton>
                    </form>
                )}
            </div>
        </div>
    );
}
