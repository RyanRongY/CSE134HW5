export class ButtonCount extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._count = 0;

    this.shadowRoot.innerHTML = `

      <button>Clicked 0 times</button>
    `;

    this._button = this.shadowRoot.querySelector('button');
    this._button.addEventListener('click', () => this._incrementCounter());
  }

  _incrementCounter() {
    this._count++;
    this._button.textContent = `Clicked ${this._count} times`;
  }
}

customElements.define('button-count', ButtonCount);
