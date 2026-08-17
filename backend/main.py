from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Task(BaseModel):
    id: int = 0
    title: str
    description: str
    completed: bool = False


tasks = []

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

@app.get("/")
def home():
    return {"message": "Welcome to the to do list!"}

@app.post("/tasks")
def create_task(task: Task):
    task.id = len(tasks) + 1
    tasks.append(task)
    return {"tasks": tasks}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task_update: Task):
    for task in tasks:
        if task.id == task_id:
            task.title = task_update.title
            task.description = task_update.description
            return {"tasks": tasks}
    return {"error": "Task not found"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for task in tasks:
        if task.id == task_id:
            tasks.remove(task)
            return {"tasks": tasks}
    return {"error": "Task not found"}

@app.put("/tasks/{task_id}/toggle")
def toggle_task(task_id: int):
    for task in tasks:
        if task.id == task_id:
            task.completed = not task.completed
            return {"tasks": tasks}
    return {"error": "Task not found"}

@app.get("/tasks/({task_id}")
def get_data(task_if= int):
    return tasks