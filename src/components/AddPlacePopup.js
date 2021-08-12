import React from 'react';
import PopupWithForm from './PopupWithForm';


export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const name = React.useRef();
    const link = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
    
    
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          name: name.current.value,
          link: link.current.value
        });
      }

    return(
        <PopupWithForm
            name='card'
            title='Новое место'
            children={
                <>
                <input ref={name} name="popup_name-card" type="text" className="popup__text popup__text_card popup__text_name-card"
                    id='popup-name-card' placeholder="Название" minLength="2" maxLength="30" required/>
                <span id="popup-name-card-error" className="popup__error"></span>
                <input ref={link} name="popup_link-card" type="url" className="popup__text popup__text_card popup__text_link-card"
                    id='popup-link-card' placeholder="Ссылка на картинку" required/>
                <span id="popup-link-card-error" className="popup__error"></span>
                <button name="card-save-button" type="submit" className="popup__button popup__button_card">Создать</button>
                </>
            }
            isOpen={isOpen}
            onClose={onClose} 
            handleSubmit={handleSubmit}
        />
    )
}