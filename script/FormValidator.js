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
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
  
    _showInputError(formElement, inputElement, errorMessage){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };

    _hideInputError(inputElement){
        console.log(inputElement);
        console.log(`.${inputElement.id}-error`);
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        console.log(errorElement);
        if (errorElement) {
            inputElement.classList.remove(this._validationConfig.inputErrorClass);
            errorElement.classList.remove(this._validationConfig.errorClass);
            errorElement.textContent = '';
        }
    };

    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(){
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = true; 
        } else {
            this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    hideInputErrors() {
        this._inputList.forEach(inputElement => this._hideInputError(inputElement));
        this._toggleButtonState(this._buttonElement); 
      };

    enableValidation() {  
        this._setEventListeners();
    };

    _setEventListeners() {
        this._toggleButtonState(this._buttonElement);

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
}

export {FormValidator, validationConfig};
