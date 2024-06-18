//! -------------------------------------------------------------- VARIABLES GLOBALES ----------------------------------------------------------------------

//! variable banniere du mode editeur :
const publishBanner = document.querySelector(".edition-mode");

//! rapport avec le login  :
const navLogin = document.querySelector(".login");

//! Variables en rapport avec la modale :
const projectEditor = document.querySelector(".galerie-editeur");
const backgroundModal = document.querySelector(".fond-modale");
const modal = document.querySelector(".modale");
const modalGallery = document.querySelector(".modale-galerie");
const modalCross = document.querySelector(".modale-croix");
const modalGallerybtn = document.querySelector(".modale-galerie-btn");

//! Variables en rapport avec le formulaire d'ajout :
const modalForm = document.querySelector(".formulaire-ajouts-projets");
const modalCrossForm = document.querySelector(".modale-croix-form");
const inputFile = document.querySelector("#file");

//! variables en rapport avec le portfolio :
const filters = document.querySelector(".portfolio-filters");
const gallery = document.querySelector(".gallery");

//! variable token :
const loged = window.localStorage.getItem("token");

//! Variable du bouton SUBMIT dur formulaire d'ajout de projet :
const formSubmit = document.querySelector(".submit-form-btn");

const modalFormImage = document.querySelector(".modale-form-logo-image img");
const logoImg = document.querySelector(".modale-form-logo-image i");
const modaleLogoImage = document.querySelector(".modale-form-logo-image");
const containerImg = document.querySelector(".miniature");
const btnImg = document.querySelector(".ajout-image-button");
const acceptedFormat = document.querySelector(".modale-format-images");

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

//! Ajout des projets dans la fenêtre modale :

async function displayModaleProjects() {
  //Je récupère mon TABLEAU de projets
  const projects = await getProjects();
  //Boucle forEach de mon tableau de projets :
  projects.forEach((project) => {
    /* Pour chaque projet :
         Créations de mes éléments et ajouts de mes variables locales (propre a ma boucle) :*/
    const imageLogoContainer = document.createElement("div"); //div qui contiendra l'image et la div avec le logo;
    const image = document.createElement("img"); //création de l'element img;
    const logoContainer = document.createElement("div"); //div qui contiendra le logo "i";
    const trash = document.createElement("i"); //Création de la balise "i" qui contiendra le logo font-awesome "trash";

    /* Ajouts des class préalablement déclarées permettant de les styliser */
    imageLogoContainer.classList.add("imageLogoContainer");
    logoContainer.classList.add("logo-container");
    image.src = project.imageUrl; // Ajouts de la source de l'image vide jusque la;
    trash.classList.add("fa-solid", "fa-trash"); // Ajout des class permettant l'apparition du logo font-awesome trash;
    trash.id = project.id; // action de faire corréspondre l'id de l'icon trash a l'id du projet en cours;

    /* Ajouts des éléments crées a l'aide du DOM */
    logoContainer.appendChild(trash);
    imageLogoContainer.appendChild(image);
    imageLogoContainer.appendChild(logoContainer);
    modalGallery.appendChild(imageLogoContainer);
  });
  deleteProject();
}
displayModaleProjects();

//! code pour la suppression d'un projet en dynamique:

async function deleteProject() {
  const arrayTrash = document.querySelectorAll(".logo-container i"); // je récupere un tableau de tout mes logo poubelle a travers le DOM;
  //console.log(arrayTrash); // je vérifie que mon tableau a bien été récupéré
  if (loged) {
    arrayTrash.forEach((trash) => {
      //boucle for each pour chaque poubelle
      trash.addEventListener("click", async (e) => {
        e.preventDefault();
        // a l'évenement au click
        const id = trash.id; // je récupere l'id de la poubelle en cour
        const init = {
          // je déclare la requête que je veux envoyer
          method: "DELETE", // requete DELETE pour supprimer
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${loged}`,
          },
        };
        // serveur sur lequel je fais ma requete + ajout de l'ID déclaré auparavant a supprimer+ ajout de la requête précédement declarée a envoyer
        const response = await fetch(
          `http://localhost:5678/api/works/${id}`,
          init
        );
        console.log(response);
        if (response.ok === true) {
          console.log("projet supprimé !");
          gallery.innerHTML = "";
          modalGallery.innerHTML = "";
          const Projects = await getProjects();
          Projects.forEach((project) => {
            createProjects(project);
          });
          displayModaleProjects();
        }
      });
    });
  }
}

//! Quitte le fond noir et la fenêtre modale au click sur la croix;
//! redirige sur le formulaire d'ajout de projet au click sur le bouton du formulaire "Ajouter une photo";
//! Permet le retour sur la galerie de la fenetre modale au click sur la fleche gauche du formulaire d'ajout :

async function leaveModale() {
  const leftArrow = document.querySelector(".modale-vector-form i");
  if (loged) {
    modalCross.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("none");
      backgroundModal.classList.add("none");
    });
    modalCrossForm.addEventListener("click", () => {
      modalForm.classList.add("none");
      backgroundModal.classList.add("none");
    });
    backgroundModal.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("none");
      backgroundModal.classList.add("none");
      modalForm.classList.add("none");
    });
    leftArrow.addEventListener("click", () => {
      modalForm.classList.add("none");
      modal.classList.add("flex");
    });
  }
}
leaveModale();

//! fonction de récuperation de l'image :
async function getFileValue() {
  const logoImg = document.querySelector(".modale-form-logo-image i");
  const containerImg = document.querySelector(".miniature");
  const btnImg = document.querySelector(".ajout-image-button");
  const acceptedFormat = document.querySelector(".modale-format-images");

  inputFile.addEventListener("change", () => {
    //ajout d'une écoute d'évènement au change (selection d'un fichier);
    const files = inputFile.files[0]; // variable récupérant les données de l'input file sous forme de tableau;

    //Ajout d'une alerte pour toute image avec une size supérieur a 4000000ko que l'utilisateur doit fermer ;
    const size = inputFile.files[0].size;
    if (size > 4000000) {
      alert("image trop volumineuse");
    }

    if (files) {
      logoImg.classList.add("none");
      containerImg.classList.remove("none");
      btnImg.classList.remove("flex");
      btnImg.classList.add("none");
      acceptedFormat.classList.remove("flex");
      acceptedFormat.classList.add("none");
      containerImg.src = URL.createObjectURL(files); // création d'un URLblob transmit en tant que source a la div qui contiendra la miniature de l'image
      return containerImg.src;
    }
  });
}
getFileValue();

//! création de la liste des catégories dans le formulaire d'ajout de projets :

async function createOptionList() {
  const select = document.querySelector("#categorie");
  const categorys = await getCategory();
  categorys.forEach((category) => {
    const option = document.createElement("option");
    option.id = category.id;
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}
createOptionList();

//! fonction de récuperation de la catégorie selectionnée dans la liste de catégories du formulaire d'ajout de projet :

async function selectedOption() {
  const select = document.querySelector("#categorie");
  select.addEventListener("change", async () => {
    const selectedOptionId = select.options[select.selectedIndex].id;
    return selectedOptionId;
  });
}
selectedOption();

//! Ajout d'une fonction permettant d'ajouter un projet via le formulaire :

async function addProject() {
  // event au submit :
  modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formSubmit.classList.add("green");

    // Récupération de la valeur du champ de text Titre dans le formulaire :
    const currentTitle = document.querySelector("#titre");

    // Récupération de l'ID de l'option selectionné :
    const select = document.querySelector("#categorie");
    //const selectedOptionId = select.options[select.selectedIndex].id;

    // Variable formData qui contiendra les objets a envoyer :
    const addProjectForm = document.querySelector(".formulaire-ajout");
    const formData = new FormData(addProjectForm);
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loged}`,
      },
      body: formData,
    });
    if (response.ok) {
      currentTitle.value = null;
      modalFormImage.classList.remove("flex");
      modalFormImage.classList.add("none");
      logoImg.classList.remove("none");
      logoImg.classList.add("flex");
      btnImg.classList.remove("none");
      btnImg.classList.add("flex");
      acceptedFormat.classList.remove("none");
      acceptedFormat.classList.add("flex");
      inputFile.classList.remove("none");
      console.log("Travail crée !");
      gallery.innerHTML = "";
      modalGallery.innerHTML = "";
      const Projects = await getProjects();
      Projects.forEach((project) => {
        createProjects(project);
      });
      displayModaleProjects();
    }
  });
}
addProject();

//! ---------------------------------------------------------------- Logout ------------------------------------------------------------------------

//! Déconnecte l'utilisateur :
function unconnect() {
  // si le token correspond a celui envoyé lors de la réponse du serveur
  if (loged) {
    navLogin.addEventListener("click", () => {
      // Si je click sur navLogin (actuellement logout) :
      window.localStorage.removeItem("token"); // supprime le token du local storage
      self.location = "http://127.0.0.1:5500/index.html"; // actualisation de la page
      navLogin.textContent = "login"; // change le text de la balise qui contenait "logout" en "login"
      publishBanner.classList.add("none"); // fait disparaitre la banniere qui indiquait a l'utilisateur qu'il etait connecté
    });
  }
}
unconnect();
