import './Feed.css';

const lang = localStorage.getItem('language');

export default function Feed() {
    return (
        <div className="feed-container _container">
            <div className="feed-header">
                <h1 className="feed-title">
                    {lang == 'en' ? 'Your feed' : 'Ваша лента'}
                </h1>
                <div className="feed-header-block">
                    <div className="feed-header-block-section">Все типы</div>
                    <button className="feed-header-block-button">
                        Создать пост
                    </button>
                </div>
            </div>
            <div className="feed-main">
                <div className="feed-popular">
                    <h3 className="feed-popular-title">
                        {lang == 'en' ? 'Popular search' : 'Популярные запросы'}
                    </h3>
                    <ul className="feed-popular-list">
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    Lorem ipsum
                                </h4>
                                <p className="feed-popular-item-description">
                                    Sponsored
                                </p>
                            </a>
                        </li>
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    Lorem ipsum
                                </h4>
                                <p className="feed-popular-item-description">
                                    Sponsore
                                </p>
                            </a>
                        </li>
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    Lorem ipsum
                                </h4>
                                <p className="feed-popular-item-description">
                                    Sponsored{' '}
                                </p>
                            </a>
                        </li>
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    Lorem ipsum
                                </h4>
                                <p className="feed-popular-item-description">
                                    sposnired
                                </p>
                            </a>
                        </li>
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    lorem ipsum
                                </h4>
                                <p className="feed-popular-item-description">
                                    Sponsored
                                </p>
                            </a>
                        </li>
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    lorem ipsum
                                </h4>
                                <p className="feed-popular-item-description">
                                    Sponsored
                                </p>
                            </a>
                        </li>
                        <li className="feed-popular-item">
                            <a href="" className="feed-popular-link">
                                <h4 className="feed-popular-item-title">
                                    lorem pisum
                                </h4>
                                <p className="feed-popular-item-description">
                                    sponsoired
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="feed-content">
                    <div className="feed-post">
                        <div className="feed-post-header">
                            <div className="feed-post-header-photo">
                                <img src="/images/none_image.png" alt="Photo" />
                            </div>
                            <h2 className="feed-post-header-name">Lorem</h2>
                            <h5 className="feed-post-header-nickname">
                                @loremipsum
                            </h5>
                        </div>
                        <div className="feed-post-content">
                            <div className="feed-post-content-image">
                                <img src="/images/none_image.png" alt="Image" />
                            </div>
                            <div className="feed-post-content-data">
                                <div className="feed-post-content-music">
                                    <button className="feed-post-content-music-button">
                                        <i className="fa-solid fa-play" />
                                    </button>
                                    <h3 className="feed-post-content-music-title">
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Quod in explicabo quam
                                        exercitationem Lorem ipsum dolor sit
                                        amet consectetur adipisicing elit.
                                        Facere odit saepe, quos ut voluptatem id
                                        unde, vel excepturi repellat eos
                                        quibusdam modi quo asperiores provident
                                        totam. Neque rem odit provident.
                                    </h3>
                                </div>
                                <div className="feed-post-content-description">
                                    <h6 className="feed-post-content-description-text">
                                        <span>Bit </span>
                                        <span>is made by </span>
                                        <span id="feed-post-content-description-name">
                                            nickname
                                        </span>
                                        <span id="feed-post-content-description-nickname">
                                            {' '}
                                            @nickname
                                        </span>
                                    </h6>
                                    <h6 className="feed-post-content-description-text">
                                        Released in 02:53, 4 Aug 2020
                                    </h6>
                                </div>
                                <button className="feed-post-content-buy">
                                    <i className="fa-solid fa-bag-shopping" />{' '}
                                    3200 rub
                                </button>
                            </div>
                        </div>
                        <div className="feed-post-stat">
                            <div className="feed-post-item">
                                <i className="fa-regular fa-heart" />
                                <span>0</span>
                            </div>
                            <div className="feed-post-item">
                                <i className="fa-solid fa-repeat" />
                                <span>0</span>
                            </div>
                            <div className="feed-post-item">
                                <i className="fa-solid fa-comment" />
                                <span>0</span>
                            </div>
                            <div className="feed-post-item">
                                <i className="fa-solid fa-arrow-up-from-bracket" />
                            </div>
                        </div>
                    </div>
                    <div className="feed-post">
                        <div className="feed-post-header">
                            <div className="feed-post-header-photo">
                                <img src="/images/none_image.png" alt="Photo" />
                            </div>
                            <h2 className="feed-post-header-name">Lorem</h2>
                            <h5 className="feed-post-header-nickname">
                                @loremipsum
                            </h5>
                        </div>
                        <div className="feed-post-content">
                            <div className="feed-post-content-image-full">
                                <img src="/images/none_image.png" alt="Image" />
                            </div>
                            <div className="feed-post-content-data">
                                <div className="feed-post-content-description">
                                    <h6 className="feed-post-content-description-text">
                                        <span>Photo </span>
                                        <span>is made by </span>
                                        <span id="feed-post-content-description-name">
                                            nickname
                                        </span>
                                        <span id="feed-post-content-description-nickname">
                                            {' '}
                                            @nickname
                                        </span>
                                    </h6>
                                    <h6 className="feed-post-content-description-text">
                                        Released in 02:53, 4 Aug 2020
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="feed-post-stat">
                            <div className="feed-post-item">
                                <i className="fa-regular fa-heart" />
                                <span>0</span>
                            </div>
                            <div className="feed-post-item">
                                <i className="fa-solid fa-repeat" />
                                <span>0</span>
                            </div>
                            <div className="feed-post-item">
                                <i className="fa-solid fa-comment" />
                                <span>0</span>
                            </div>
                            <div className="feed-post-item">
                                <i className="fa-solid fa-arrow-up-from-bracket" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed-follow">
                    <h3 className="feed-follow-title">
                        {lang == 'en' ? 'To follow' : 'За кем следовать'}
                    </h3>
                    <ul className="feed-follow-list">
                        {[...Array(7)].map((user) => (
                            <li className="feed-follow-item">
                                <a href="" className="feed-follow-link">
                                    <div className="feed-follow-content">
                                        <div className="feed-follow-image">
                                            <img
                                                src="/images/user.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="feed-follow-text">
                                            <h4 className="feed-follow-item-title">
                                                Lorem ipsum
                                            </h4>
                                            <p className="feed-follow-item-description">
                                                0 followers
                                            </p>
                                        </div>
                                    </div>
                                    <button className="feed-follow-button">
                                        <i className="fa-solid fa-user-plus" />
                                    </button>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
