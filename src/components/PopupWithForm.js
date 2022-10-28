import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__item');
        this._button = this._form.querySelector('.popup__submit-button');
        this._defaultText = this._button.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((item) => {
            item.value = data[item.name];
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
    }

    renderLoading(isLoading, content) {
        if (isLoading) {
            this._button.textContent = content;
        } else {
            this._button.textContent = this._defaultText;
        }
    }
}

export { PopupWithForm };