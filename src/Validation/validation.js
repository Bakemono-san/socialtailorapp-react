export function validateModel(libelle, prix, quantite, contenu) {
  const errors = {};

  // Validation pour le libelle
  if (!libelle || libelle.length < 2 || libelle.length > 50) {
      errors.libelle = "Le libelle doit contenir entre 2 et 50 caractères.";
  }

  // Validation pour le prix
  if (!prix || isNaN(prix) || Number(prix) <= 0) {
      errors.prix = "Veuillez entrer un prix valide supérieur à 0.";
  }

  // Validation pour la quantité
  if (!quantite || isNaN(quantite) || Number(quantite) < 0) {
      errors.quantite = "Veuillez entrer une quantité valide (0 ou plus).";
  }

  // Validation pour le contenu
//   if (typeof contenu !== 'string' ) {
//     errors.contenu = "Veuillez entrer un lien valide vers une photo/vidéo.";
// }


  return errors;
}
