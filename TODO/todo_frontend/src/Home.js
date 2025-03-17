import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [todos]);

    const fetchTodos = () => {
        axios.get('http://localhost:5000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

   const edit = (id) => {
       axios.put(`http://localhost:5000/edit/${id}`)
           .then(response => {
               setTodos(prevTodos =>
                   prevTodos.map(todo =>
                       todo.id === id ? { ...todo, done: !todo.done } : todo
                   )
               );
           })
           .catch(err => console.log(err));
   };


    const updateTask = (id, updatedTask) => {
        axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask })
            .then(() => {
                setTodos(todos.map(todo =>
                    todo.id === id ? { ...todo, task: updatedTask } : todo
                ));
                setTaskid('');
                setUpdatetask('');
            })
            .catch(err => console.log(err));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <Create />
            {todos.length === 0 ? (
                <div className='task'>No tasks found</div>
            ) : (
                todos.map(todo => (
                    <div key={todo.id} className='task'>
                        <div className='checkbox'>
                            {todo.done ? (
                                <BsFillCheckCircleFill className='icon' onClick={() => edit(todo.id)} />
                            ) : (
                                <BsCircleFill className='icon' onClick={() => edit(todo.id)} />
                            )}
                            {taskid === todo.id ? (
                                <input
                                    type='text'
                                    value={updatetask}
                                    onChange={e => setUpdatetask(e.target.value)}
                                />
                            ) : (
                                <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                            )}
                        </div>
                        <div>
                            <span>
                                <BsPencil
                                    className='icon'
                                    onClick={() => {
                                        if (taskid === todo.id) {
                                            updateTask(todo.id, updatetask);
                                        } else {
                                            setTaskid(todo.id);
                                            setUpdatetask(todo.task);
                                        }
                                    }}
                                />
                                <BsFillTrashFill
                                    className='icon'
                                    onClick={() => deleteTask(todo.id)}
                                />
                            </span>
                        </div>
                    </div>
                ))
            )}
        </main>
    );
};

export default Home;
