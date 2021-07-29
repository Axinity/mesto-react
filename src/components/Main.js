import avatarEdit from '../images/avatar_edit.jpg'
import Card from './Card';



function Main({ onEditProfile, onAddPlace, onEditAvatar, User, cards, onCardClick}) {
    return (
        <main className="main">
            <section className="profile">
                <button type="button" className="profile__avatar-container" onClick={onEditAvatar}>
                    <div className="profile__avatar-edit-button-container">
                        <img className="profile__avatar-edit-button" src={avatarEdit} alt="Кнопка Редактировать"/>
                    </div>
                    <img className="profile__avatar" src={User.avatar} alt="Аватар"/>
                </button>
                
                <div className="profile__info">
                    <h1 className="profile__title" id="name">{User.name}</h1>
                    <button type="button" aria-label="Profile edit" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__description" id="description">{User.about}</p>
                </div>
                <button type="button" aria-label="New post" className="profile__add-button" onClick={onAddPlace}></button>
            </section>

            <section>
                <ul className="elements">
                    {cards.map((card) => <Card  card={card} key={card._id} onCardClick={onCardClick}/>)}
                </ul>
            </section>
        </main>
    )
}

export default Main;