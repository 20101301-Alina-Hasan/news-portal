import express from 'express';
import { authenticateUser } from '../middlewares/auth';
import { getBookmark, getUserBookmarks, addBookmark, removeBookmark } from '../controllers/bookmark';

const router = express.Router();

router.get('/:news_id', authenticateUser, getBookmark);
router.get('/', authenticateUser, getUserBookmarks);
router.post('/:news_id', authenticateUser, addBookmark);
router.delete('/:news_id', authenticateUser, removeBookmark);

export default router;