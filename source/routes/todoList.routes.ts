import { Router } from "express";
import {
  singleTodoItem,
  addTodoItem,
  updateTodoItemStatus,
  removeTodoItem,
  allTodoItems,
} from "../controllers/todoList.controller";
const router: Router = Router();

router.route("/v1/todo/all").get(allTodoItems);
router.route("/v1/todo/:id").get(singleTodoItem);
router.route("/v1/todo/add").post(addTodoItem);
router.route("/v1/todo/update").put(updateTodoItemStatus);
router.route("/v1/todo/:id").delete(removeTodoItem);

export default router;