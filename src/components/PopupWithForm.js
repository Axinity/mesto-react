function PopupWithForm({name, title, children, isOpen, onClose, handleSubmit}) {

    return (
      <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
          <form className='popup__container' onSubmit={handleSubmit}>
            <h2 className="popup__title">{title}</h2>
              {children}
            <button type="button" aria-label="Close" className="popup__close-button" onClick={onClose}></button>
          </form>
      </section>
    );
  }

export default PopupWithForm;
