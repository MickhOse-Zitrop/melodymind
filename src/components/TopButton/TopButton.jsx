import { useResize } from '../../hook/useResize';
import './TopButton.css';

export default function TopButton() {
    const { width } = useResize();

    width >= 576 &&
        window.addEventListener('scroll', () => {
            const scrollPosition =
                window.scrollY || document.documentElement.scrollTop;

            if (scrollPosition > 200) {
                document.querySelector('.top-button').style.display = 'block';
            } else {
                document.querySelector('.top-button').style.display = 'none';
            }
        });

    function onTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    return (
        <button className="top-button" onClick={onTop}>
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    );
}
