import './ProfileCard.css';
import { useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaShare, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import ProfileEditModal from './ProfileEditModal';

export default function ProfileCard({ username, avatarUrl, handleLogout, navigateToAdCreation }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="profileCardContainer">
                <div className="leftSection">
                    <img
                        src={avatarUrl || "default_profile_image.png"}
                        alt="Аватар"
                        className="profileImage"
                    />
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

                <div className="rightSection-col">

                    <div className="rightSection">
                        <button className="profileBtn" onClick={openModal}>
                            <FaEdit /> Изменить профиль
                        </button>
                        <button className="logoutBtn" onClick={handleLogout}>
                            <FaSignOutAlt />
                        </button>

                    </div>
                    <button className="profileBtnCreate" onClick={navigateToAdCreation}>
                        + Создать объявление
                    </button>
                </div>
            </div>




            {isModalOpen && (
                <ProfileEditModal onClose={closeModal} />
            )}
        </>
    );
}
