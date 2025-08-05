function lancerJeu() {
  const questions = [
    "Qui est le plus drôle ?",
    "Qui ferait le meilleur espion ?",
    "Qui ne tient pas l’alcool ?"
  ];
  const question = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("resultat").innerText = question;
}