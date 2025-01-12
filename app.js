import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT 
        id,
        thumbnail,
        date_time,
        shirt_src,
        shirt_buy_link,
        pants_src,
        pants_buy_link,
        shoes_src,
        shoes_buy_link,
        jacket_src,
        jacket_buy_link,
        views,
        is_featured
      FROM posts
      WHERE is_published = 1 
      AND is_approved = 1
      ORDER BY date_time DESC
    `);

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const [post] = await pool.query(`
      SELECT 
        id,
        thumbnail,
        date_time,
        shirt_src,
        shirt_buy_link,
        pants_src,
        pants_buy_link,
        shoes_src,
        shoes_buy_link,
        jacket_src,
        jacket_buy_link,
        views,
        is_featured
      FROM posts
      WHERE id = ?
      AND is_published = 1 
      AND is_approved = 1
    `, [req.params.id]);

    if (post.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;