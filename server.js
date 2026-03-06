import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import { setupDatabase, testConnection } from './src/models/setup.js';

// Server configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// Setup Express app
const app = express();

// Initialize PostgreSQL database connection
// const pgSession = connectPgSimple(session);

// global middleware
// app.use(addLocalVariables);

// Configure Eexpress
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} mode on port http://127.0.0.1:${PORT}`);
});