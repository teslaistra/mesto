import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__item');
        this._button = this._form.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        console.log(data);
        console.log(this._inputList);
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
}

export { PopupWithForm };