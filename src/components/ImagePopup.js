function ImagePopup({card, onClose}) {
    return (
        <section className={`popup popup_pic ${card.name ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <img className="popup__image" src={card.link} alt={card.name}/>
                <figcaption className="popup__figcaption">{card.name}</figcaption>
                <button type="button" aria-label="Close"
                    className="popup__close-button popup__close-image-button popup__close-button_pos-right" onClick={onClose}></button>
            </figure>
        </section>
    )
}

export default ImagePopup;