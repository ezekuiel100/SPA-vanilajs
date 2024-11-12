class MyCard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = "<div>OLA MUNDO</div>";
  }
}

customElements.define("my-card", MyCard);
