import { useEffect, useState } from 'react';
import { useAuth } from '../../hook/useAuth';

const lang = localStorage.getItem('language');

export default function SettingsProfileSection({ isMsg }) {
    const { user } = useAuth();

    const [newImg, setNewImg] = useState('');
    const [isButton, setIsButton] = useState(true);
    const [isButton2, setIsButton2] = useState(true);
    const [showModalImg, setShowModalImg] = useState(false);

    const [name, setName] = useState(user[2]);
    const [surname, setSurname] = useState(user[5]);
    const [displayName, setDisplayName] = useState(user[6]);
    const [location, setLocation] = useState(user[8]);
    const [bio, setBio] = useState(user[9]);

    function updateProfile(e) {
        e.preventDefault();
        setIsButton2(false);

        var url = 'https://melodymind.tw1.ru/config/update.php';
        var Data = {
            id: user[1],
            name: name,
            surname: surname,
            displayName: displayName,
            location: location,
            bio: bio,
        };

        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setIsButton2(true);
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

    function updatePhoto() {
        setIsButton(false);

        var url = 'https://melodymind.tw1.ru/config/updatePhoto.php';
        var Data = {
            id: user[1],
            img: newImg,
        };

        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
                setIsButton(true);
                setNewImg('');
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

    function newPhoto(e) {
        var target = e.target;
        var fileReader = new FileReader();

        fileReader.onload = () => {
            setNewImg(fileReader.result);
        };

        fileReader.readAsDataURL(target.files[0]);
    }

    useEffect(() => {
        if (newImg) setShowModalImg(true);
        else {
            setShowModalImg(false);
            document.getElementById('imageAva').value = '';
        }
    }, [newImg]);

    return (
        <>
            {showModalImg && (
                <section className="settings-photo-confirm">
                    <div className="settings-photo-confirm-container">
                        <div className="settings-photo-confirm-image">
                            <div className="settings-photo-confirm-image-container">
                                <img src={newImg} id="photoNew" alt="" />
                            </div>
                        </div>
                        <div className="settings-photo-confirm-buttons">
                            <button onClick={() => setNewImg('')}>
                                {lang == 'en' ? 'Cancel' : 'Отмена'}
                            </button>
                            <button onClick={updatePhoto}>
                                {isButton ? (
                                    lang == 'en' ? (
                                        'Confirm'
                                    ) : (
                                        'Подтвердить'
                                    )
                                ) : (
                                    <div className="spinner"></div>
                                )}
                            </button>
                        </div>
                    </div>
                </section>
            )}
            <form method="" onSubmit={updateProfile}>
                <section className="settings-image">
                    <img src={user[7] ? user[7] : '/images/user.png'} alt="" />
                    <div>
                        <input
                            type="file"
                            name="imageAva"
                            id="imageAva"
                            accept="image/png, image/jpeg"
                            onChange={(e) => newPhoto(e)}
                        />
                        <label htmlFor="imageAva">
                            {lang == 'en'
                                ? 'Upload image'
                                : 'Загрузить изображение'}
                            <i className="fa-solid fa-chevron-down"></i>
                        </label>
                    </div>
                </section>
                <section className="settings-text">
                    <label htmlFor="name">
                        {lang == 'en' ? 'Name' : 'Имя'}
                    </label>
                    <input
                        type="text"
                        name="name"
                        pattern="([A-Za-zА-Яа-яЁё]+[\-\s]?){3,}"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="surname">
                        {lang == 'en' ? 'Last name' : 'Фамилия'}
                    </label>
                    <input
                        type="text"
                        name="surname"
                        pattern="([A-Za-zА-Яа-яЁё]+[\-\s]?){3,}"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <label htmlFor="nickname">
                        {lang == 'en' ? 'Display name' : 'Отображаемое имя'}
                    </label>
                    <input
                        type="text"
                        name="nickname"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <label htmlFor="location">
                        {lang == 'en' ? 'Location' : 'Местоположение'}
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label htmlFor="bio">
                        {lang == 'en' ? 'Biography' : 'Биография'}
                    </label>
                    <textarea
                        name="bio"
                        id=""
                        cols="30"
                        rows="10"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <button type="submit">
                        {isButton2 ? (
                            lang == 'en' ? (
                                'Save changes'
                            ) : (
                                'Сохранить изменения'
                            )
                        ) : (
                            <div className="spinner"></div>
                        )}
                    </button>
                </section>
            </form>
        </>
    );
}
