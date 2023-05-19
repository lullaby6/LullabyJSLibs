const htmlComponentRender = container => {
    const htmlComponents = container.querySelectorAll('html-component');

    htmlComponents.forEach(async htmlComponent => {
        if(!htmlComponent.hasAttribute('rendered')){
            const res = await fetch(htmlComponent.getAttribute('path'));
            let text = await res.text();

            const tempDivElement = document.createElement('div');
            tempDivElement.innerHTML = text;

            const slotsElements = tempDivElement.querySelectorAll('slot')
            slotsElements.forEach(slotsElement => {
                slotsElement.innerHTML = htmlComponent.innerHTML
            })

            const propsElements = tempDivElement.querySelectorAll('prop')
            propsElements.forEach(propElement => {
                propElement.innerHTML = htmlComponent.getAttribute(propElement.innerText)
            })

            htmlComponent.innerHTML = tempDivElement.innerHTML;

            htmlComponent.setAttribute('rendered', '')

            htmlComponentRender(htmlComponent)
        }
    })
}

htmlComponentRender(document)