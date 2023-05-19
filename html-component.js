(function htmlComponentRender(container) {
    container.querySelectorAll('html-component').forEach(async htmlComponent => {
        if(htmlComponent.hasAttribute('rendered')) return

        const res = await fetch(htmlComponent.getAttribute('src'));
        let text = await res.text();

        htmlComponent.setAttribute('children', htmlComponent.innerHTML);

        const propsRegex = /\{(\w+)\}/g;
        htmlComponent.innerHTML = text.replace(propsRegex, (match, att) => {
            return htmlComponent.getAttribute(att) || '';
        })

        htmlComponent.setAttribute('rendered', '')

        htmlComponentRender(htmlComponent)
    })
})(document)