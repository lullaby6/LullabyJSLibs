(function htmlComponentRender(container) {
    container.querySelectorAll('html-component').forEach(async htmlComponent => {
        if(htmlComponent.hasAttribute('rendered')) return

        const res = await fetch(htmlComponent.getAttribute('src'));
        let text = await res.text();

        htmlComponent.setAttribute('children', htmlComponent.innerHTML);

        const propsRegex = /\{(\w+)\}/g;
        htmlComponent.innerHTML = text.replace(propsRegex, (match, att) =>
             htmlComponent.getAttribute(att) || ''
        )

        htmlComponent.querySelectorAll('script').forEach(scriptElement => {
            const newScriptElement = document.createElement('script');
            newScriptElement.innerHTML = scriptElement.innerHTML
            document.getElementsByTagName('head')[0].appendChild(newScriptElement)
            scriptElement.remove()
        })

        htmlComponent.setAttribute('rendered', '')

        htmlComponentRender(htmlComponent)
    })
})(document)