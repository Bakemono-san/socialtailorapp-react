import React, { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";
import { useContext } from "react";
import { DataContext } from "../App";
import DataHandler from "../DataHandler";

export default function PostCardContainer() {
  const { value, setValue } = useContext(DataContext);
  const [posts, setPost] = useState([]);
  const [authorNotes, setAuthorNotes] = useState({});

  useEffect(() => {
    DataHandler.getDatas("http://localhost:3004/post")
      .then((data) => {
        setPost(data);
        console.log(posts);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des posts :", error);
      });
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      // Récupération des notes pour chaque auteur des posts
      const fetchAuthorNotes = async () => {
        const notesMap = {};

        // Utiliser Promise.all pour faire des requêtes pour chaque post
        await Promise.all(
          posts.map(async (post) => {
            try {
              const notesData = await DataHandler.getDatas(
                `http://localhost:3004/posts/${post.id}/notes`
              );
              notesMap[post.id] = notesData.totalNotes; // Stocker les notes par utilisateurId
            } catch (error) {
              console.error(
                `Erreur lors de la récupération des notes pour l'utilisateur ${post.id} :`,
                error
              );
            }
          })
        );

        setAuthorNotes(notesMap);
      };

      fetchAuthorNotes();
    }
  }, [posts]);

  return (
    <div className="flex justify-between flex-col w-full gap-10 md:pb-63 md:px-0 pb-40  overflow-y-scroll">
      {posts.map((post, index) => {
        const notes = authorNotes[post.id] || "O";
        return (
          <PostCard
            key={post.id}
            post={post}
            utilisateur={post.Users}
            notes={notes}
          />
        );
      })}
    </div>
  );
}
