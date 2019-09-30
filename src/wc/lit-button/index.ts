import { LitElement, html, css } from 'lit-element'

class LitButton extends LitElement {
  static get styles() {
    return css`
      button {
        color: white;
        background-color: blue;
      }
    `
  }
  render() {
    return html`
      <button @click=${() => alert('click!!!')}><slot></slot></button>
    `
  }
}

customElements.define('lit-button', LitButton)
