import './ProfileCard.css';
import { FaMapMarkerAlt, FaStar, FaShare, FaEdit } from 'react-icons/fa';

export default function ProfileCard({ username, handleLogout, navigateToAdCreation }) {
    return (

        <>

            <div className="profileCardContainer">
                {/* Левая часть */}
                <div className="leftSection">
                    <img src="default_profile_image.png" alt="Дефолтная ава" className="profileImage" />

                    <div className="userInfo">
                        <h1>{username}</h1>
                        <div className="userStatsRow">
                            <div className="location">
                                <FaMapMarkerAlt className="icon" />
                                <span>Russia</span>
                            </div>

                        </div>
                        <p className="registered">Зарегистрирован в 2025</p>
                        <p className="transactions">0 транзакций</p>
                    </div>

                </div>
                <div className="centerSection">
                    <div className="rating">
                        <FaStar className="icon" />
                        <span>0.0</span>
                    </div>
                    <div className="followers">
                        <span>0 подписчика</span>
                    </div>
                    <div className="following">
                        <span>0 подписок</span>
                    </div>
                </div>


                {/* Правая часть */}
                <div className="rightSection">
                    <button className="profileBtn">
                        <FaEdit /> Изменить профиль
                    </button>
                    <button className="profileBtn">
                        <FaShare />
                    </button>

                </div>

            </div>
            <button className="profileBtn" onClick={navigateToAdCreation}>
                Создать объявление
            </button>
            <button className="profileBtn" onClick={handleLogout}>
                Выйти
            </button>
        </>

    );
}
