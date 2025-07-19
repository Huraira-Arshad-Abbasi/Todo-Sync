import { useState, useEffect, useRef } from 'react';
import '../css/TodoApp.css';
import axios from 'axios';
import { format } from 'date-fns';
import Logout from './Logout';

export default function TodoApp() {
  const [title, settitle] = useState('');
  const [disc, setdisc] = useState('');
  const [todos, settodos] = useState([]);
  const [date, changeDate] = useState(new Date());

  const popupRef = useRef(null);
  const cancelBtnRef = useRef(null);
  const dateTimeRef = useRef(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/todos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        settodos(response.data.length ? response.data : []);
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };
    fetchTodos();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const todo = { title, disc, date };
    try {
      const response = await axios.post(`http://localhost:3000/api/addTodo`, todo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      settodos([...todos, response.data]);
      settitle('');
      setdisc('');
      if (cancelBtnRef.current) cancelBtnRef.current.disabled = false;
      handlePopUP();
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  const handleEdit = async (item, i) => {
    if (popupRef.current) {
      popupRef.current.classList.replace('none', 'flex');
    }
    settitle(item.title);
    setdisc(item.disc);
    changeDate(item.date);
    if (cancelBtnRef.current) cancelBtnRef.current.disabled = true;
    handleDelete(i);
  };

  const handleDelete = async (index) => {
    try {      
      let originalIndex = todos.length - 1 - index ;      
      let newTodos = todos.filter((_, i) => i !== originalIndex);     

      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/todos/${originalIndex}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      settodos(newTodos)

    } catch (err) {
      console.error('Error while Deleting todo:', err.message);
    }
  };

  const handlePopUP = () => {
    if (!popupRef.current) return;
    const popup = popupRef.current; //
    if (popup.classList.contains('flex')) {
      popup.classList.replace('flex', 'none');
    } else {
      popup.classList.replace('none', 'flex');
    }
    settitle('');
    setdisc('');
    closeDateTimePopUp();
  };

  const setDateTime = () => {
    if (dateTimeRef.current) {
      dateTimeRef.current.classList.add("DateTime");
    }
  };

  const closeDateTimePopUp = () => {
    if (dateTimeRef.current) {
      dateTimeRef.current.classList.remove("DateTime");
    }
  };

  return (
    <>
      <div className='main__div'>
        <nav>
          <h2>Your Todos</h2>
          <Logout />
        </nav>

        <div className='add-todo'>
          <div className="add__btn">
            <button className="btn btn-primary" onClick={handlePopUP}>+</button>
            <p>Add New todo</p>
          </div>

          <div className="add__todo__popup none" ref={popupRef}>
            <div className="add__todo__content">
              <textarea rows="1" value={title} onChange={e => settitle(e.target.value)} placeholder='Add title here ...'></textarea>
              <hr />
              <textarea rows="8" value={disc} onChange={e => setdisc(e.target.value)} placeholder='Add Description here ...'></textarea>
            </div>
            <div className="add__todo__btn">
              <div className='DateTimePopUp' ref={dateTimeRef}>
                <div className="setDate">
                  <input type="datetime-local" onChange={e => changeDate(e.target.value)} value={date} />
                </div>
                <div className="btn">
                  <button onClick={closeDateTimePopUp}>close</button>
                </div>
              </div>
              <button className="btn btn-primary" onClick={setDateTime}>Set Date&Time</button>
              <button disabled={(title === '' && disc === '')} className="btn btn-primary" onClick={handleSave}>Save</button>
              <button ref={cancelBtnRef} className="btn btn-primary cancelBtn" onClick={handlePopUP}>Cancel</button>
            </div>
          </div>
        </div>

        <div className="todo__list">
          {todos.slice().reverse().map((item, index) => {
            const formatted = format(new Date(item.date), 'dd-MM-yyyy __h:mm a');
            return (
              <div className="todo__card" key={index}>
                <div className="todo__card__content">
                  <h4>{item.title}</h4>
                  <hr />
                  <pre>{item.disc}</pre>
                </div>
                <div className="todo__card__btn">
                  <button>{formatted}</button>
                  <button onClick={() => handleEdit(item, index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
