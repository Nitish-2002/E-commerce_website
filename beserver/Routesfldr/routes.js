import { Router } from "express";
import createPost from "../controller/CreatePost.js";
import editPost from "../controller/EditPost.js";
import registerpage from "../controller/RegisterPage.js";
import loginpage from "../controller/LoginPage.js";
import getallposts from "../controller/GetAllposts.js";
import { viewcontroller } from "../controller/viewCount.js";
import { categoryController } from "../controller/Category.js";
import deletePost from "../controller/deletePost.js";
import getpostsbyid from "../controller/getpostsbyid.js";
import { getAllCategoryNames } from "../controller/AllCategories.js";
import { addCategoryName } from "../controller/AddCategoryName.js";
import userPosts from "../controller/UserPosts.js";
const router=Router();
router.post('/createpost',createPost);
router.post('/editpost/:id',editPost);
router.post('/deletepost/:id',deletePost);
router.post('/register',registerpage);
router.post('/login',loginpage);
router.post('/addcategoryname',addCategoryName)

router.get('/userposts',userPosts);
router.get('/getallposts',getallposts);
router.get('/getpostsbyid/:id',getpostsbyid);
router.get('/category/:category',categoryController)
router.get('/getallcategory',getAllCategoryNames)

router.put('/countviews/:id',viewcontroller);

export default router;




