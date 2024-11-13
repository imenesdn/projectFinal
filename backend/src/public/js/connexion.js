// importation Toast pour les notifications
import {configureToasts, Toast} from "../lib/toaster-js/index.js";

configureToasts({
    topOrigin: 0,
    deleteDelay: 100
});

let inputCourriel = document.getElementById('input-courriel');
let inputMotDePasse = document.getElementById('input-mot-passe');
let formConnexion = document.getElementById('form-connexion');

const isformValid = (data) => {
    // validation cote client 
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return emailRegex.test(data.courriel) &&
    typeof(data.motDePasse)==='string' && 
    data.motDePasse.length >= 8
  };

formConnexion.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Les noms des variables doivent être les mêmes
    // que celles spécifié dans les configuration de
    // passport dans le fichier "authentification.js"
    const data = {
        courriel: inputCourriel.value,
        motDePasse: inputMotDePasse.value
    };

    if(!isformValid(data)){
        return new Toast("formulaire non valide","error");
    }

    let response = await fetch('/auth/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        // Si l'authentification est réussi, on
        // redirige vers une autre page
        window.location.replace('/');
        return;
    }
    
    if(response.status === 401) {
        // Si l'authentification ne réussi pas, on
        // a le message d'erreur dans l'objet "data"
        new Toast("connexion echoue.","error");
    }
});