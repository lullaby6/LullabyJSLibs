document.head.innerHTML += `
    <style>
        .realtime-palette-c {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            display: flex;
            justify-content: center;
            gap: 5px;
            padding: 5px;
        }

        .realtime-palette-c-c {
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .realtime-palette-c-c p {
            background-color: rgba(0, 0, 0, .5);
            color: #fff;
            padding: 2.5px 0;
            pointer-events: none;
            min-width: 75px;
            width: 100%;
            text-align: center;
        }

        .realtime-palette-c-c input[type="color"] {
            -webkit-appearance: none;
            border: 1px solid #fff;
            height: 32px;
            cursor: pointer;
            width: 100%;
        }

        .realtime-palette-c-c input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0;
        }

        .realtime-palette-c-c input[type="color"]::-webkit-color-swatch {
            border: none;
        }
    </style>
`

const rootVars = [...document.styleSheets[0].rules]
    .map(a => a.cssText.split(" ")[0] === ":root" ?
    a.cssText.split("{")[1].split("}")[0].split(";") : null)
    .filter(a => a !== null)[0]
    .map((a) => a.split(": "))
    .filter(a => a[0] !== " ")
    .reduce((a, v) => ({ ...a, [v[0].slice(1)] : v[1] }), {})

const realtimePaletteContainerElement = document.createElement('div')
realtimePaletteContainerElement.classList.add('realtime-palette-c')
document.body.appendChild(realtimePaletteContainerElement)

Object.entries(rootVars).forEach(([key, value]) => {
    const realtimePalettePickerContainerElement = document.createElement('div')
    realtimePalettePickerContainerElement.classList.add('realtime-palette-c-c')
    realtimePaletteContainerElement.appendChild(realtimePalettePickerContainerElement)

    const realtimePaletteVarElement = document.createElement('p')
    realtimePaletteVarElement.innerText = key.slice(2)
    realtimePalettePickerContainerElement.appendChild(realtimePaletteVarElement)

    const realtimePalettePickerElement = document.createElement('input')
    realtimePalettePickerElement.setAttribute('type', 'color')
    realtimePalettePickerElement.value = value
    realtimePalettePickerContainerElement.appendChild(realtimePalettePickerElement)

    const realtimePaletteColorElement = document.createElement('p')
    realtimePaletteColorElement.innerText = value
    realtimePalettePickerContainerElement.appendChild(realtimePaletteColorElement)

    realtimePalettePickerElement.addEventListener('input', () => {
        document.documentElement.style.setProperty(key, realtimePalettePickerElement.value);
        realtimePaletteColorElement.innerText = realtimePalettePickerElement.value
    })

    realtimePalettePickerElement.addEventListener('mouseleave', () => {
        realtimePalettePickerElement.setAttribute('type', 'text')
        realtimePalettePickerElement.setAttribute('type', 'color')
    })
})