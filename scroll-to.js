const scrollToElements = document.querySelectorAll('[scroll-to]')

scrollToElements.forEach(scrollToElement => {
    scrollToElement.addEventListener('click', () => {
        document.querySelector(scrollToElement.getAttribute('scroll-to')).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        })
    })
})