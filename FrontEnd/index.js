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
