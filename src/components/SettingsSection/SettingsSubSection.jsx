const lang = localStorage.getItem('language');

export default function SettingsSubSection() {
    return (
        <section className="settings-section-main-intro">
            {lang == 'en'
                ? 'Subscription is not available in your region'
                : 'Подписка недоступна в Вашем регионе'}
        </section>
    );
}
