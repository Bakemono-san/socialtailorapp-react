import DataHandler from '../DataHandler';

export const fetchTailors = async (isCertifiedFilter, setTailors) => {
  try {
    const url = isCertifiedFilter ? '/filterTailleurByCertificat' : '/listeTailleurs';
    const data = await DataHandler.getDatas(url);
    setTailors(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des tailleurs :", error);
  }
};

export const checkUserStatus = async (setIsUserTailor, setUserFollowedTailors) => {
  try {
    const userData = await DataHandler.getDatas('/myFollowings');
    setIsUserTailor(true);
    const followedTailors = userData.followings ? userData.followings.map(following => following.Users_Followers_followerIdToUsers.id) : [];
    setUserFollowedTailors(followedTailors);
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
  }
};

export const filterTailors = (tailors, filter, isUserTailor) => {
  const currentUserId = parseInt(localStorage.getItem('userId'), 10);
  return tailors.filter(tailor => {
    const isCurrentUser = isUserTailor && tailor.id === currentUserId;
    return !isCurrentUser && `${tailor.nom} ${tailor.prenom}`.toLowerCase().includes(filter.toLowerCase());
  });
};

export const handleToggleFollow = async (tailorId, userFollowedTailors, setUserFollowedTailors, showModal) => {
  try {
    if (userFollowedTailors.includes(tailorId)) {
      await DataHandler.postData('/unfollowUser', { followerId: tailorId });
      setUserFollowedTailors(prev => prev.filter(id => id !== tailorId));
      showModal("Vous avez arrêté de suivre ce tailleur.");
    } else {
      await DataHandler.postData('/followUser', { followerId: tailorId });
      setUserFollowedTailors(prev => [...prev, tailorId]);
      showModal("Vous suivez ce tailleur !");
    }
  } catch (error) {
    console.error("Erreur lors du toggle follow :", error);
  }
};

export const handleSignal = async (tailorId, showModal) => {
  try {
    await DataHandler.postData(`/signale/${tailorId}`, { reason: "mauvais contenu" });
    showModal("Le tailleur a été signalé.");
  } catch (error) {
    console.error("Erreur lors du signalement :", error);
  }
};
