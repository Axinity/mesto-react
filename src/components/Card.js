import deleteButton from '../images/delete-button.png'
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    ); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ' '}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick () {
        onCardLike(card);
      }
    
    function handleDeleteClick () {
        onCardDelete(card);
    }

    return (
        <li className="card-template element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
                <img className="element__delete-button-img" src={deleteButton} alt="Удалить карточку"/>
            </button>
            <img className="element__photo" src={card.link} alt={`Фото "${card.name}"`} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button type="button" aria-label="Like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className='element__like-count'>{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;