const lang = localStorage.getItem('language');

export default function ProfileTracks() {
    return (
        <section className="profile-tracks">
            {false ? (
                <></>
            ) : (
                <div className="profile-tracks-non">
                    <h2>
                        {lang == 'en'
                            ? 'There is no content available'
                            : 'Нет доступного контента'}
                    </h2>
                    <p>
                        {lang == 'en'
                            ? 'There is not yet enough content'
                            : 'Контента пока не достаточно'}
                    </p>
                </div>
            )}
        </section>
    );
}
