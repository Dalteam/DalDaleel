import express from express
import { searchUser } from "./controllers"
const router = express.Router();
router.get('api/search',searchUser)