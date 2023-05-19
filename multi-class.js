import styles from './styles.json' assert {type: 'json'}

Object.entries(styles).forEach(([key, value]) => {
    const classList = value.split(' ')
    const elements = document.querySelectorAll(`.${key}`)
    elements.forEach(element => {
        classList.forEach(classItem => {
            element.classList.add(classItem)
        })
    })
})