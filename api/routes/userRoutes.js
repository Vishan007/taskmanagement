const router = require("express").Router();
const verifyJwtBearerToken = require("../middleware/auth")
const {RegisterUser,LoginUser} = require('../controller/userController')
const {AddTask,GetAllTaskbyUser,UpdateTaskbyId,DeleteTaskbyId,GetTaskId,Search} = require('../controller/taskController')

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/tasks",verifyJwtBearerToken,AddTask)
router.get("/tasks",verifyJwtBearerToken,GetAllTaskbyUser)
router.get("/tasks/:id",verifyJwtBearerToken,GetTaskId)
router.put("/tasks/:id",verifyJwtBearerToken,UpdateTaskbyId)
router.delete("/tasks/:id",verifyJwtBearerToken,DeleteTaskbyId)
router.get("/searchtask",verifyJwtBearerToken,Search)

module.exports = router;