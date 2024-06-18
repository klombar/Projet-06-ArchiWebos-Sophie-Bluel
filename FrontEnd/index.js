//! -------------------------------------------------------------- VARIABLES GLOBALES ----------------------------------------------------------------------

//! ------------------------------------------------------------------ SESSION PROJETS -------------------------------------------------------------------

//! Recuperation des Projets a partir de l'API :

async function getProjects() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}
getProjects();

//! Creation des projets :

function createProjects(project) {
  // création des éléments:
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  // changement de la source de l'image et du texte:
  img.src = project.imageUrl;
  figcaption.textContent = project.title;
  // intégration des éléments dans le HTML :
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

//! Ajout des projets dans le HTML :

async function displayProjects() {
  const Projects = await getProjects();
  Projects.forEach((project) => {
    createProjects(project);
  });
}
displayProjects();

//! --------------------------------------------------------------- SESSION CATEGORIES ----------------------------------------------------------------

//! récuperation des catégories a partir de l'API :
//fonction asynchrone permettant de récuperer mes catégories via l'API et qui me retourne la réponse en JSON
async function getCategory() {
  const category = await fetch("http://localhost:5678/api/categories");
  return await category.json();
}
getCategory();

//! creation des boutons filtres :
// fonction asynchrone me permettant de créer mes boutons de filtre en dynamique et de leurs ajouter un id
async function createButton() {
  const categoryTable = await getCategory();
  categoryTable.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.id;
    filters.appendChild(button);
  });
}
createButton();

//!  Filtre la galerie au click sur les boutons filtres :

async function filteredButton() {
  const projects = await getProjects();
  const buttons = document.querySelectorAll(".portfolio-filters button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      gallery.innerHTML = ""; // vide la galerie avant de mettre en place les projets filtrés.
      const buttonId = event.target.id; // récuperation de l'ID sur le bouton target au click.
      if (buttonId !== "0") {
        // si l'id du bouton cliqué est différent de 0 (0 etant le bouton TOUS declaré en dur)
        const filteredProjects = projects.filter((project) => {
          return project.category.id == buttonId; // condition du filtre : "si catégory.id du projet correspond a l'ID du bouton déclaré plus haut en dynamique"
        });
        // au click sur le bouton, on rappel la fonction de création de projet avec le nouveau tableau filtré
        filteredProjects.forEach((project) => {
          createProjects(project);
        });
        // Sinon (0 TOUS) on retourne tout les projets
      } else {
        projects.forEach((project) => {
          createProjects(project);
        });
      }
    });
  });
}
filteredButton();

//! -------------------------------------------------------------------- Si connecté -------------------------------------------------------------------------------

//! Ajouts des éléments du mode édition une fois connecté :
function editorMod() {
  if (loged) {
    //si le token correspond;
    publishBanner.classList.remove("none"); // fait apparaitre la banniere noire qui indique qu'on est sur le mode editeur
    projectEditor.classList.remove("none"); // fait apparaitre l'éditeur "modifier" a coté des "Mes Projets"
    navLogin.textContent = "logout"; // login devient logout
  }
}
editorMod();

//! Ajout du fond noir transparent et de la fenêtre modale au click sur "modifier" :
async function displayModale() {
  if (loged) {
    // si le token correspond :
    projectEditor.addEventListener("click", () => {
      // au click sur "modifier" :
      backgroundModal.classList.remove("none"); // le fond noir transparent apparait
      modal.classList.remove("none"); // la fenêtre modale apparait
      modal.classList.add("flex");
    });
    modalGallerybtn.addEventListener("click", () => {
      // au click sur le bouton de la galerie :
      modal.classList.remove("flex");
      modal.classList.add("none"); // on fait disparaitre la fenêtre modale;
      modalForm.classList.remove("none"); // on fait apparaitre le formulaire d'ajout d'image
    });
  }
}
displayModale();
