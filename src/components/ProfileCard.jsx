import './ProfileCard.css'

export default function ProfileCard({ username, handleLogout, navigateToAdCreation }) {
    return (
        <>
            <div className='profileCard'>
                <img src="default_profile_image.png" alt="Дефолтная ава" />
                <div>
                    <h1>{username}</h1>
                    <p>0 Transaction</p>
                    <p>Joined in 2025 <p>Russia</p></p>
                </div>
            </div>

            <button className='exitButton' onClick={handleLogout}>Выйти</button>
            <button className='exitButton' onClick={navigateToAdCreation}>Создать объявление</button>
        </>
    )
}