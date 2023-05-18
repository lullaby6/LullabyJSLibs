let modalElements = document.querySelectorAll('[modal]');

if(modalElements.length > 0) {
    const modalShowElements = document.querySelectorAll('[modal-show]');
    const modalHideElements = document.querySelectorAll('[modal-hide]');
    const modalOverlayElement = document.createElement('div');
    const modalContainerElement = document.createElement('div');

    function fixedContainer(element){
        element.style.position = 'fixed';
        element.style.top = '0';
        element.style.left = '0';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.display = 'none';
    }

    fixedContainer(modalOverlayElement)
    modalOverlayElement.style.backgroundColor = '#000';
    modalOverlayElement.style.opacity = '0.5';
    modalOverlayElement.style.zIndex = '1';

    fixedContainer(modalContainerElement)
    modalContainerElement.style.backgroundColor = 'transparent';
    modalContainerElement.style.zIndex = '100';
    modalContainerElement.style.justifyContent = 'center';
    modalContainerElement.style.alignItems = 'center';

    document.body.appendChild(modalContainerElement);
    modalContainerElement.appendChild(modalOverlayElement);

    modalElements.forEach(element => {
        element.oldModalDisplay = getComputedStyle(element).display || 'block'
        element.style.display = 'none';
        element.style.zIndex = '2';
        modalContainerElement.appendChild(element);
        modalElements = document.querySelectorAll('[modal]');
    })

    modalShowElements.forEach(modalShowElement => {
        modalShowElement.addEventListener('click', () => {
            modalElements.forEach(modalElement => {
                if(modalElement.getAttribute('modal') == modalShowElement.getAttribute('modal-show')) {
                    modalOverlayElement.style.display = 'block';
                    modalOverlayElement.style.opacity = '0.5';
                    modalContainerElement.style.display = 'flex';
                    modalElement.style.display = modalElement.oldModalDisplay;
                    if(modalElement.hasAttribute('modal-overlay-opacity')) modalOverlayElement.style.opacity = modalElement.getAttribute('modal-overlay-opacity')
                }
            })
        })
    })

    function hideModals() {
        modalOverlayElement.style.display = 'none';
        modalContainerElement.style.display = 'none';

        modalElements.forEach(element => {
            element.style.display = 'none';
        })
    }

    modalOverlayElement.addEventListener('click', () => hideModals())

    modalHideElements.forEach(element => {
        element.style.cursor = 'pointer'
        element.addEventListener('click', () => hideModals())
    })

    window.addEventListener('keydown', event => {
        if(event.key === 'Escape' && getComputedStyle(modalContainerElement).display == 'flex') hideModals()
    })
}