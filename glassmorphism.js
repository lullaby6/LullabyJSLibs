document.head.innerHTML += `
    <style>
        [glass] {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    </style>
`

const glassElements = document.querySelectorAll('[glass]')

glassElements.forEach(glassElement => {
    const rgb = glassElement.hasAttribute('glass-rgb') || '255, 255, 255'
    const alpha = glassElement.hasAttribute('glass-alpha') || 0.2

    glassElement.style.backgroundColor = `rgba(${rgb}, ${alpha})`

    if(glassElement.hasAttribute('glass-border')) glassElement.style.border = `1px solid rgba(${rgb}, ${alpha})`

    if(glassElement.hasAttribute('glass-radius')) glassElement.style.borderRadius = glassElement.getAttribute('glass-radius')

    if(glassElement.hasAttribute('glass-blur')) glassElement.style.backdropFilter = `blur(${glassElement.getAttribute('glass-blur')})`
})