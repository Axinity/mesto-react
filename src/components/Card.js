import deleteButton from '../images/delete-button.png'

function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }  
    return (
        <li className="card-template element">
            <button type="button" className="element__delete-button">
                <img className="element__delete-button-img" src={deleteButton} alt="Удалить карточку"/>
            </button>
            <img className="element__photo" src={card.link} alt={`Фото "${card.name}"`} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button type="button" aria-label="Like" className="element__like-button"></button>
                    <p className='element__like-count'>{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;