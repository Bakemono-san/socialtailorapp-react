import React, { useState, useEffect } from 'react';
import DataHandler from '../DataHandler';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await DataHandler.getDatas('/tailleur/posts');
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h3 className="font-semibold text-lg mb-3">Mes Publications</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border-b py-2">
            <h4 className="font-semibold">{post.title}</h4>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
