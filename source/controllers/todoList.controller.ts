import { Request, Response } from "express";
import { Dtodo, TodoList } from "../entities/TodoList";


// List all ToDo items
export const allTodoItems = async (req: Request, res: Response): Promise<void> => {
  try {

    const data: Dtodo[] = await TodoList.find();
    // const data: Dtodo[] = await connectDB.getRepository(TodoList).find();
    res.status(200).json({ status: "success", message: "All to do items retrieved", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error" });
  }
};


// Get a single todo item, by ID
export const singleTodoItem = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params?.id);
  try {
    const todoItem: Dtodo | null = await TodoList.findOne({
      where: {
        id: id
      }
    });

    // check if the todo id exists
    if (todoItem) {
      res.status(200).json({ status: "success", message: `To do items with ID ${id} retrieved`, data: [todoItem] });
    } else {
      res.status(200).json({ status: "error", message: `To do item with ID ${id} not found` });
    }

  } catch (error) {
    res.status(500).json({ status: "error", message: "error" });
  }
};


// Add a todo item
export const addTodoItem = async (req: Request, res: Response): Promise<void> => {
  const { todoName } = req.body;

  // check if the todo list already exists
  const existingTodo: Dtodo | null = await TodoList.findOne({
    where: {
      todoName: todoName
    }
  });

  if (todoName && !existingTodo) {
    try {
      let dbInsert = await TodoList.insert({
        todoName,
        isCompleted: false,
      });
      res.status(201).json({
        status: "success", message: "To Do added",
        data: [{
          id: dbInsert.generatedMaps[0]["id"],
          todoName,
          isCompleted: false
        }]
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: "error" });
    }
  } else if (todoName && existingTodo) {
    res.status(422).json({ status: "error", message: "To Do item name already exists" });
  } else {
    res.status(422).json({ status: "error", message: "To Do item name is required" });
  }
};


// Update a todo item by ID
export const updateTodoItem = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.body?.id);
  const todoItem = await TodoList.findOne({
    where: {
      id: id
    }
  });
  if (todoItem) {
    todoItem.todoName = req.body.todoName ? req.body.todoName : todoItem.todoName;
    todoItem.isCompleted = req.body.isCompleted ? req.body.isCompleted : todoItem.isCompleted;


    try {
      await todoItem.save();
      res.status(200).json({ status: "success", message: `Todo item with ID ${todoItem.id} updated`, data: [todoItem] });
    } catch (error) {
      res.status(500).json({ status: "error", message: "error" });
    }
  } else {
    res.status(404).json({ status: "error", message: "No todo item with that ID found" });
  }
};

export const removeTodoItem = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params?.id);
  try {
    const todoItem = await TodoList.delete({ id });
    console.log(todoItem["affected"]);
    // if (todoItem["affected"] > 0) {
    res.status(204).json({ status: "success", message: "Todo item successfully deleted" });
    // } else {
    //   res.status(404).json({ status: "error", message: "No todo item with that ID found" });
    // }

  } catch (error) {
    res.status(500).json({ status: "error", message: "error" });
  }
};