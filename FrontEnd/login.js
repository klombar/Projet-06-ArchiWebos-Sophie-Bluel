//! récuperation de l'email, du password et du formulaire :
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");

//! Variable message d'erreur :
const errorMessage = document.querySelector("#login p");

//! -------------------------------------------------------------- SESSION LOGIN --------------------------------------------------------------------

async function connection() {
  const form = document.querySelector("#login form");
  const navLogin = document.querySelector(".login");

  //evenement au click sur le bouton envoi du formulaire :
  form.addEventListener("submit", async (event) => {
    //on previent le rechargement de la page a l'evenement :
    event.preventDefault();
    //recuperation des valeurs rentrées par l'utilisateur :
    const userEmail = email.value;
    const userPassword = password.value;
    // Création de la charge utile
    const userIdentifiers = {
      email: userEmail,
      password: userPassword,
    };
    // Convertion de la charge utile en .JSON
    const chargeUtile = JSON.stringify(userIdentifiers);
    // appels de la fonction fetch :
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: chargeUtile, // j'envois les données récupéré de mon formulaire
    });
    const data = await response.json(); // Je récupère la réponse en json (le token)
    window.localStorage.setItem("token", data.token); // j'enregistre le token dans le localstorage
    // Condition pour faire apparaitre le message d'erreur :
    if (userEmail === "sophie.bluel@test.tld" && userPassword === "S0phie") {
      errorMessage.innerHTML = "";
      navLogin.textContent = "logout";
      window.location.href = "index.html";
    }
    // condition pour faire disparaitre le message d'erreur si les identifiants sont bons :
    else {
      errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
    }
  });
}
connection();
