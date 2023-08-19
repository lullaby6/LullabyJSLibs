const magicHeaderElements = document.querySelectorAll('[magic-header]')

magicHeaderElements.forEach(element => {
    element.animationDuration = element.getAttribute('magic-header-duration') || 250
    element.revealOnStopDelay = element.getAttribute('magic-header-delay') || 500

    element.state = 'visible'
})

window.addEventListener('scroll', () => {
    magicHeaderElements.forEach(element => {
        clearTimeout(element.timer)
        element.timer = setTimeout(() => {
            //stop scrolling
            if(element.state == 'hidden'){
                element.animate([
                    {transform: "translateY(-100%)"},
                    {transform: "translateY(0)"}
                ],{
                    duration: element.animationDuration,
                    fill: 'forwards'
                })
                element.state = 'visible'
            }
        }, element.revealOnStopDelay);

        if(window.oldScroll > window.scrollY){
            //scrolling up
            if(element.state == 'hidden'){
                element.animate([
                    {transform: "translateY(-100%)"},
                    {transform: "translateY(0)"}
                ],{
                    duration: element.animationDuration,
                    fill: 'forwards'
                })
                element.state = 'visible'
            }
        }else{
            //scrolling down
            if(element.state == 'visible'){
                element.animate([
                    {transform: "translateY(0)"},
                    {transform: "translateY(-100%)"}
                ],{
                    duration: element.animationDuration,
                    fill: 'forwards'
                })
                element.state = 'hidden'
            }
        }
    })

    window.oldScroll = window.scrollY
})