import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// Cache for storing fetched posts
const postCache = new Map();

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function usePost(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      if (!id) return;

      // Reset loading state
      setLoading(true);
      setError(null);

      // Check cache first
      if (postCache.has(id)) {
        setPost(postCache.get(id));
        setLoading(false);
        return;
      }
      
      try {
        const response = await api.get(`/posts/${id}`);
        const postData = response.data;
        
        if (isMounted) {
          // Update cache
          postCache.set(id, postData);
          setPost(postData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch post');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { post, loading, error };
}
