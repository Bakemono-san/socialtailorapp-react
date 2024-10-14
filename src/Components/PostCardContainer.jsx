import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { useContext } from 'react'
import { DataContext } from '../App'
import DataHandler from '../DataHandler';
import Swal from 'sweetalert2'

export default function PostCardContainer() {
  const { value, setValue } = useContext(DataContext);
  const handleAddToWishList = async (postId) => {
    try {
      // Inclure les données nécessaires dans le corps de la requête
      const requestData = {
        postId: postId,
        userId: value.user.id  // Ajouter l'ID de l'utilisateur si nécessaire
      };

      console.log('Sending request with data:', requestData); // Pour le débogage

      const response = await DataHandler.postData(
        `/user/listeSouhaits/${postId}`,
        requestData
      );

      if (response) {
        // Mettre à jour le context
        const updatedValue = {
          ...value,
          user: {
            ...value.user,
            listeSouhaits: [...(value.user.listeSouhaits || []), postId]
          }
        };
        setValue(updatedValue);

        // Afficher le modal de succès
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Ajouté à la liste de souhaits avec succès!',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      // Amélioration de la gestion des erreurs
      console.error('Erreur lors de l\'ajout à la liste de souhaits:', error);

      // Afficher plus de détails sur l'erreur
      const errorMessage = error.response?.data?.message || error.message || 'Erreur inconnue';
      console.log('Détails de l\'erreur:', {
        status: error.response?.status,
        data: error.response?.data,
        message: errorMessage
      });

      // Afficher le modal d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: `Erreur: ${errorMessage}`,
        confirmButtonText: 'OK'
      });
    }
  };

  const [posts, setPost] = useState(value.posts);

export default function PostCardContainer() {
  const { value, setValue } = useContext(DataContext);
  const [posts,setPost] = useState([]);


  useEffect(() => {
    DataHandler.getDatas('http://localhost:3004/post')
     .then(data => {
        setPost(data)
      })
     .catch(error => {
        console.error('Erreur lors de la récupération des posts :', error)
      })
  },[])

  return (
    <div className='flex justify-between flex-col w-full gap-10 md:pb-63 md:px-0 pb-40  overflow-y-scroll'>
      {
        posts.map(
          (post) => {
            console.log(post, value.user);
            return <PostCard key={post.id} post={post} utilisateur={value.user} onAddToWishList={handleAddToWishList} />

          (post,index) => {

           return <PostCard key={post.id} post={post} utilisateur={post.Users} />
          }
        )
      }
    </div>
  )
}
