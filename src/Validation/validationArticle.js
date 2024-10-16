export function validateArticle(libelle, prix, quantite, contenu) {
  const errors = {};

  if (!libelle) {
      errors.libelle = "Le libellé est requis.";
  }
  if (!prix) {
      errors.prix = "Le prix est requis.";
  }
  if (!quantite) {
      errors.quantite = "La quantité est requise.";
  }
  if (!contenu) {
    errors.contenu = "Veuillez télécharger une image.";
}


  return errors;
}
