const animals = [
  { animal: "Dog", image: "images/dog.jpg" },
  { animal: "Cat", image: "images/cat.jpg" },
  { animal: "Fish", image: "images/fish.jpg" },
];

class MyCard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="card">
      ${animals
        .map((animal) => `<img src=${animal.image} width="250" />`)
        .join("")}     
      </div>`;
  }
}

customElements.define("my-card", MyCard);
