const html = document.createElement('template')
html.innerHTML = `
  <style>
    button {
      color: white;
      background-color: purple;
    }
  </style>
  <button><slot></slot></button>
`

window.ShadyCSS && window.ShadyCSS.prepareTemplate(html, 'std-button')

class stdButton extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('click', e => {
      alert('click!!!')
    })
  }

  connectedCallback() {
    window.ShadyCSS && window.ShadyCSS.styleElement(this)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(html.content.cloneNode(true))
    }
  }
}

customElements.define('std-button', stdButton)
