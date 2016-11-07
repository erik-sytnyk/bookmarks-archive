import homeController from '../controllers/homeController';
import bookmarkController from '../controllers/bookmarkController';
import tagController from '../controllers/tagController';
import * as multer from 'multer';

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

export default {
    init: initRoutes
};

function initRoutes(app) {
    app.get('/api/bookmarks', bookmarkController.getBookmarks);
    app.delete('/api/bookmark/:id', bookmarkController.deleteBookmark);
    app.post('/api/saveBookmark', bookmarkController.saveBookmark);
    app.put('/api/deleteMultipleBookmarks', bookmarkController.deleteBookmarks);
    app.get('/api/statistic', bookmarkController.statistic);
    app.put('/api/addTagsForMultipleBookmarks', bookmarkController.addTagsForMultipleBookmarks);
    app.post('/api/restoreBookmark', bookmarkController.restoreBookmark);

    app.get('/api/tags', tagController.getTags);
    app.delete('/api/tag/:id', tagController.deleteTag);
    app.post('/api/saveTag', tagController.saveTag);

    app.post('/api/import/browserBookmarks', upload.single('bookmarks'), bookmarkController.importBrowserBookmarks);

    //all other routes are rendered as home (for client side routing)
    app.get('*', homeController.home);
}