//Manupuler le header 
document.querySelector('.burger_menu').addEventListener('click', function() {
  const nav = document.querySelector('.nav_header ul');
  nav.classList.toggle('show');
});