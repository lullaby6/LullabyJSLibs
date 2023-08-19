const optionButtonElements = document.querySelectorAll('[option-button]');

optionButtonElements.forEach(optionButtonElement => {
    optionButtonElement.addEventListener('click', () => {
        optionButtonElement.parentNode.querySelector('[option-button-selected]').removeAttribute('option-button-selected');
        optionButtonElement.setAttribute('option-button-selected', '')
    })
})