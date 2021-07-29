function PopupWithForm({name, title, children, isOpen, onClose, valid}) {

    return (
      <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
          <form className='popup__container'>
            <h2 className="popup__title">{title}</h2>
              {children}
            <button type="button" aria-label="Close" className="popup__close-button" onClick={onClose}></button>
          </form>
      </section>
    );
  }

export default PopupWithForm;
