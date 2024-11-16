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
        width:fit-content;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgb(0,0 ,0 ,0.3)
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
    
     <div class="card">
     <img src=${animals[0].image} width="250" />
        
      </div>`;
  }
}

customElements.define("my-card", MyCard);
