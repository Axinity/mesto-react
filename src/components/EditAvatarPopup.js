import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarInput.current.value
        });
    } 

    return(
        <PopupWithForm
        name='avatar' 
        title='Обновить аватар'
        children={
            <>
                <input ref={avatarInput} type='url' id='popup-link-avatar' className="popup__text popup__text_link-avatar" placeholder="Ссылка на картинку" required/>
                <span id="popup-link-avatar-error" className="popup__error"></span>
                <input type="submit" className="popup__button popup__button_avatar" value='Сохранить'/>
                <button type="button" aria-label="Close" className="popup__close-button "></button>
            </>
        } 
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit} />
    )
}