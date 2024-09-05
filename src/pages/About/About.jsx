// Импорт библиотек и данных
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { team, teamEn } from '../../data/data';

// Импорт компонентов
import BlueButton from '../../components/BlueButton/BlueButton';

// Импорт стилей и изображений
import './About.css';

const lang = localStorage.getItem('language');

export default function About() {
    return (
        <>
            <section className="about-section">
                <h1 className="about-title">
                    {lang == 'en'
                        ? 'Share your work and let the whole world hear it'
                        : 'Делись своими работами и пусть их услышит весь мир'}
                    !
                </h1>
                <p className="about-text">
                    {lang == 'en'
                        ? 'We help artists find producers to collaborate and promote their music to the masses.'
                        : 'Мы помогаем артистам найти продюсеров для сотрудничества и продвижения'}
                    <br />
                    {lang == 'en'
                        ? 'Become a part of our company now'
                        : 'своей музыки в массы. Стань частью нашей компании уже сейчас'}
                    !
                </p>
                <Link to="/">
                    <BlueButton padding={'12px 24px'} fontSize={'18px'}>
                        {lang == 'en' ? 'Learn more' : 'Узнать больше'}
                    </BlueButton>
                </Link>
            </section>
            <section className="about-world">
                <h1 className="about-title">
                    {lang == 'en'
                        ? 'With our work, we make dreams come true'
                        : 'Своей работой мы воплощаем мечты в реальность'}
                </h1>
                <p className="about-text">
                    {lang == 'en'
                        ? 'We are a small team of enthusiasts from the university with different experiences work,'
                        : 'Мы - маленькая команда энтузиастов из вуза с разным опытом работы, но одной целью:'}
                    <br />
                    {lang == 'en'
                        ? 'but with one goal: empowering independent music artists creators'
                        : 'расширение прав и возможностей независимых музыкальных креаторов'}
                </p>
                <div className="about-image">
                    <img src="/images/map_world.png" alt="" />
                </div>
            </section>
            <section className="about-team">
                <p className="about-text">
                    {lang == 'en' ? 'TEAM' : 'КОМАНДА'} MELODYMIND
                </p>
                <h1 className="about-title">
                    {lang == 'en'
                        ? 'Welcome our team'
                        : 'Познакомьтесь с командой'}
                </h1>
                <div className="about-team-section _container">
                    {(lang == 'en' ? teamEn : team).map((member) => (
                        <div key={member.name} className="about-member">
                            <img
                                src={member.image}
                                alt={member.name}
                                style={{
                                    margin: '0px 25px',
                                    height: '250px',
                                    width: '250px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                            <h2>{member.name}</h2>
                            <p>{member.status}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
