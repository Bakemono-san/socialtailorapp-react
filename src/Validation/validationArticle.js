export function validateArticle(libelle, prix, quantite, contenu) {
  const errors = {};

  if (!libelle) {
      errors.libelle = "Le libellé est requis.";
  }

  // Transformation et validation de prix
  const prixEntier = parseInt(prix, 10);
  if (!prix || isNaN(prixEntier)) {
      errors.prix = "Le prix est requis et doit être un nombre valide.";
  }

  // Transformation et validation de quantite
  const quantiteEntiere = parseInt(quantite, 10);
  if (!quantite || isNaN(quantiteEntiere)) {
      errors.quantite = "La quantité est requise et doit être un nombre valide.";
  }

  if (!contenu) {
    errors.contenu = "Veuillez télécharger une image.";
  }

  return errors;
}
