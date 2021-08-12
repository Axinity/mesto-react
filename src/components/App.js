import React from 'react';
import Header from './Header';
import Main from './Main'
import Footer from './Footer'
import apiProps from '../utils/api';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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

    function handleUpdateAvatar({avatar}) {
        apiProps.avatarUpdate(avatar).then((updatedUser) => {
          setCurrentUser(updatedUser);
          setIsEditAvatarPopupOpen(false);
        })
        .catch(error => apiProps.errorHandler(error));
    }
    
    function handleAddPlaceSubmit({name, link}) {
        apiProps.sendNewCard(name, link).then((newCard) => {
            setCards([newCard, ...cards]);
            setIsAddPlacePopupOpen(false);
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
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                    {currentUser && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>}
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
