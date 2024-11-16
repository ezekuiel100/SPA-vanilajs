const content = document.querySelector("#content");

async function renderPage(page) {
  try {
    const res = await fetch("pages/" + page + ".html");

    if (!res.ok) {
      throw new Error();
    }

    history.pushState({ page }, "", page);

    const html = await res.text();
    content.innerHTML = html;

    executeScript(content);
  } catch (error) {
    content.innerHTML = "<h1>Pagina nao encontrada</h1>";
  }
}

window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";

  renderPage(page);
});

function executeScript(content) {
  const scripts = content.getElementsByTagName("script");
  Array.from(scripts).forEach((script) => {
    const newScript = document.createElement("script");

    // Copia os atributos
    Array.from(script.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });

    // Copia o conteúdo do script
    newScript.innerHTML = script.innerHTML;

    // Substitui o script antigo pelo novo
    script.parentNode.replaceChild(newScript, script);
  });
}

renderPage("home");
