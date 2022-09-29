const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
};



class FormValidator {
    constructor(validationConfig, formElement){
        this._formElement = formElement;
        this._validationConfig = validationConfig;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));

    }




    

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(this._formElement, inputElement);
        }
    };
  

    _showInputError(formElement, inputElement, errorMessage){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };

    _hideInputError(formElement, inputElement){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(buttonElement){
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            buttonElement.disabled = true; 
        } else {
            buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    hideInputErrors() {
        this._inputList.forEach(inputElement => this._hideInputError(this._formElement, inputElement));
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    
        this._toggleButtonState(buttonElement); 
      };

    enableValidation() {  
        this._setEventListeners();
    };

    _setEventListeners() {
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this._toggleButtonState(buttonElement);
    
        this._inputList.forEach((inputElement) => {
            console.log(this);
            inputElement._class = this;
            inputElement.addEventListener('input', function (evt) {
                console.log(evt.currentTarget._class);
                evt.currentTarget._class._checkInputValidity(inputElement);
                evt.currentTarget._class._toggleButtonState(buttonElement);
            });
        });
    };
}

export {FormValidator, validationConfig};
