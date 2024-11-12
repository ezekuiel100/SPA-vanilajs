const home = document.querySelector("#home");
const about = document.querySelector("#about");
const gallery = document.querySelector("#gallery");

const content = document.querySelector("#content");

const links = [home, about, gallery];

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const page = e.target.id;

    history.pushState({ page }, "", page);

    renderPage(page);
  });
});

async function renderPage(page) {
  try {
    const res = await fetch("pages/" + page + ".html");

    if (!res.ok) {
      throw new Error();
    }

    content.innerHTML = await res.text();
  } catch (error) {
    content.innerHTML = "<h1>Pagina nao encontrada</h1>";
  }
}

window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";

  renderPage(page);
});

renderPage("home");
