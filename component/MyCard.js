const animals = [
  { animal: "Dog", image: "images/dog.jpg" },
  { animal: "Cat", image: "images/cat.jpg" },
  { animal: "Fish", image: "images/fish.jpg" },
];

class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f0f0f0;
      }
      
      img {
        margin-bottom: 10px;
        border: 1px solid #999;
      }
      
      span {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
    </style>
    
    <div style="display:flex;">
        ${animals
          .map(
            (animal) => `          
          <div class="card">     
          <img src=${animal.image} width="250" height="250" />       
          <span>${animal.animal}</span>    
          </div>
          `
          )
          .join("")}
      </div>
      `;
  }
}

customElements.define("my-card", MyCard);
