import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string) => {
    const newTask1: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTask1);

  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }

  const removeTask = (i:number):void =>{
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i,1)
    setTasks(newTasks)
  }
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput }
                ></input>
                <button className="btn btn-success" autoFocus>Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => {
            return <div className="card card-body">
              <h2 style={{textDecoration:t.done? "line-through" : ""}}>{t.name}</h2>
              <div>
                <button className='btn btn-info' onClick={() => toggleDoneTask(i)}>
                  {t.done ? '🗸' : '✗'}
                </button>
                <button className='btn btn-danger' onClick={()=> removeTask(i)}>
                🗑
                </button>
                </div>
            </div>
            
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
