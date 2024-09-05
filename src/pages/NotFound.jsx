// Импорт стилей и изображений
import src from '/images/404.png';

const lang = localStorage.getItem('lang');

export default function NotFound() {
    return (
        <div className="div404">
            <section>
                <h1>404</h1>
                <p>
                    {lang == 'en'
                        ? 'You may have entered the page address incorrectly'
                        : 'Возможно, вы не правильно указали адрес страницы'}
                </p>
            </section>
            <img src={src} alt="Page Not Found" />
        </div>
    );
}
