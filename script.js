const content = document.querySelector("#content");

async function renderPage(page) {
  try {
    const res = await fetch("pages/" + page + ".html");

    if (!res.ok) {
      throw new Error();
    }

    history.pushState({ page }, "", page);

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
