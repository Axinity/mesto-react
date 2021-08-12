import React from 'react';
import Header from './Header';
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import apiProps from '../utils/Api';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    React.useEffect(() => {
        apiProps.getInfoUser().then((data) => {
            setCurrentUser(data)
        })
        .catch(error => apiProps.errorHandler(error));
    }, []);
    
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        apiProps.getInitialCards().then(cardList => {
            console.log(cardList)
          setCards(cardList);
        })
        .catch(error => apiProps.errorHandler(error));
    },[])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        const changeLike = isLiked ? apiProps.unLikeCard(card._id) : apiProps.likeCard(card._id)
        changeLike.then((newCard) => {
            // Обновляем стейт на основе предшествующего колбэка
            setCards((newCards) => newCards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => apiProps.errorHandler(error));
    } 

    function handleCardDelete(card) {
        apiProps.apiDeleteCard(card._id).then(() => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
        })
        .catch(error => apiProps.errorHandler(error));
      }

    const [selectedCard, setSelectedCard] = React.useState({});

    function handleCardClick(card) {
        setSelectedCard(card);
    }
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }

    function handleUpdateUser({name, about}) {
        apiProps.sendUserInfo(name, about).then(() => {
          const updatedUser = { ...currentUser };
            updatedUser.name = name;
            updatedUser.about = about;
    
            setCurrentUser({ ...updatedUser });
          setIsEditProfilePopupOpen(false);
        })
        .catch(error => apiProps.errorHandler(error));
      }
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header />
                    <Main onEditProfile={handleEditProfileClick} 
                        onAddPlace={handleAddPlaceClick} 
                        onEditAvatar={handleEditAvatarClick} 
                        user={currentUser}
                        cards={cards}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}/>
                    <Footer />
                    <EditProfilePopup 
                        isOpen={isEditProfilePopupOpen} 
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    /> 
                    <PopupWithForm
                        name='card'
                        title='Новое место'
                        children={
                            <>
                            <input name="popup_name-card" type="text" className="popup__text popup__text_card popup__text_name-card"
                                id='popup-name-card' placeholder="Название" minLength="2" maxLength="30" required/>
                            <span id="popup-name-card-error" className="popup__error"></span>
                            <input name="popup_link-card" type="url" className="popup__text popup__text_card popup__text_link-card"
                                id='popup-link-card' placeholder="Ссылка на картинку" required/>
                            <span id="popup-link-card-error" className="popup__error"></span>
                            <button name="card-save-button" type="submit" className="popup__button popup__button_card">Создать</button>
                            </>
                        }
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups} />
                    <PopupWithForm
                        name='avatar' 
                        title='Обновить аватар' 
                        children={
                            <>
                                <input type='url' id='popup-link-avatar' className="popup__text popup__text_link-avatar" placeholder="Ссылка на картинку" required/>
                                <span id="popup-link-avatar-error" className="popup__error"></span>
                                <button type="submit" className="popup__button popup__button_avatar">Сохранить</button>
                                <button type="button" aria-label="Close" className="popup__close-button "></button>
                            </>
                        } 
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups} />
                    <ImagePopup card={selectedCard}
                        onClose={closeAllPopups}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
