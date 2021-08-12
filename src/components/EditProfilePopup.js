import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      } 

    return( 
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            children={
                <>
                    <input name="popup_name" type="text" className="popup__text popup__text_title_name" id="popup-name"
                        placeholder="Имя" minLength="2" maxLength="40" value={name || ''} onChange={(evt) => setName(evt.target.value)} required />
                    <span id="popup-name-error" className="popup__error"></span>
                    <input name="popup_description" type="text" className="popup__text popup__text_title_desc"
                        id="popup-description" placeholder="О себе" minLength="2" maxLength="200" value={description || ""}  
                        onChange={(evt) => setDescription(evt.target.value)} required />
                    <span id="popup-description-error" className="popup__error"></span>
                    <button type="submit" className="popup__button popup__button_profile">Сохранить</button>
                </>}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}/>
    )
}