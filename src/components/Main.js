import avatarEdit from '../images/avatar_edit.jpg'
import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);



    return (
        <main className="main">
            <section className="profile">
                <button type="button" className="profile__avatar-container" onClick={onEditAvatar}>
                    <div className="profile__avatar-edit-button-container">
                        <img className="profile__avatar-edit-button" src={avatarEdit} alt="Кнопка Редактировать"/>
                    </div>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__title" id="name">{currentUser.name}</h1>
                    <button type="button" aria-label="Profile edit" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__description" id="description">{currentUser.about}</p>
                </div>
                <button type="button" aria-label="New post" className="profile__add-button" onClick={onAddPlace}></button>
            </section>

            <section>
                <ul className="elements">
                    {cards.map((card) => <Card  card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
                </ul>
            </section>
        </main>
    )
}

export default Main;