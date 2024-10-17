import { createContext } from 'react';

export const DataContext = createContext();

// Exemple d'utilisation du contexte pour simuler l'utilisateur connecté
export const DataProvider = ({ children }) => {
  const user = {
    name: 'John Doe',
    role: 'tailleur', // ou 'vendeur', ou 'client'
    certificat: 1,    // 1 = certifié, 0 = non certifié
  };

  return (
    <DataContext.Provider value={{ user }}>
      {children}
    </DataContext.Provider>
  );
};
