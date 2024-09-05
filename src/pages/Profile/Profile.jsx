// Импорт компонентов
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileTracks from '../../components/Profile/ProfileTracks';
import { useResize } from '../../hook/useResize';

// Импорт стилей и изображений
import './Profile.css';

export default function Profile() {
    const { width } = useResize();

    return (
        <div className="profile">
            <div className="profile-container _container">
                <ProfileInfo />
                {width >= 576 && <ProfileTracks />}
            </div>
        </div>
    );
}
