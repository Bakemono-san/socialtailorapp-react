import React, { useEffect, useState } from 'react';
import DataHandler from '../DataHandler';
import Swal from 'sweetalert2';

interface ShareModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id: number;
  prenom: string;
  nom: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ postId, isOpen, onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Récupérer la liste des utilisateurs à partir de /rang
      DataHandler.getDatas('http://localhost:3004/rang')
        .then((data) => setUsers(data))
        .catch((err) => console.error('Erreur lors du chargement des utilisateurs', err));
    }
  }, [isOpen]);

  const handleShare = async () => {
    if (!selectedUser) return;

    try {
      const response = await DataHandler.postData(
        `/post/${postId}/share`,
        { utilisateurCible: selectedUser }
      );
      Swal.fire('Succès', 'Post partagé avec succès!', 'success');
      onClose(); // Fermer le modal après succès
    } catch (error) {
      console.error('Erreur lors du partage', error);
      Swal.fire('Erreur', 'Échec du partage du post.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Partager ce post</h2>
        <select
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          value={selectedUser || ''}
        >
          <option value="" disabled>
            Sélectionner un utilisateur
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.prenom} {user.nom}
            </option>
          ))}
        </select>
        <button onClick={handleShare} className="btn btn-primary w-full">
          Partager
        </button>
        <button onClick={onClose} className="btn btn-secondary w-full mt-2">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
