import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import '../css/TodoApp.css';
import axios from 'axios';
import { format } from 'date-fns';
// import Notification from './Notification'
import Logout from './Logout';



export default function TodoApp() {
  const [title, settitle] = useState('');
  const [disc, setdisc] = useState('');
  const [todos, settodos] = useState([]);
  const [date, changeDate] = useState(new Date());
  // const { email } = useParams();

  useEffect(() => {
    // Fetch todos from the backend
    const fetchTodos = async () => {
      try {
        const email = localStorage.getItem('email');
        // // Get the email from local storage
        const response = await axios.get(`http://localhost:3000/api/todos/${email}`);
        if (!response.data) {
          settodos([]);
        }else if (response.data.length === 0) {
          settodos([]);
        }else{
          settodos(response.data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };
    fetchTodos();

  }, []);


  // fucntions
  const handleSave = async () => {
    const todo = { title, disc,date, email: localStorage.getItem('email') };
    try {
      // Save the new todo in the database
      const response = await axios.post(`http://localhost:3000/api/todos`, todo);
      settodos([...todos, response.data]);
      settitle('');
      setdisc('');
      document.querySelector('.cancelBtn').disabled = false;
      handlePopUP();
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  const handleEdit = async (item, i) => {
    document.querySelector('.add__todo__popup').classList.replace('none', 'flex');
    settitle(item.title);
    setdisc(item.disc);
    changeDate(item.date)
    document.querySelector('.cancelBtn').disabled = true;
    handleDelete(i);
  };

  const handleDelete = async (index) => {
    try {
      let newTodos = todos.slice().reverse().filter((_, i) => i !== index);
      settodos(newTodos.slice().reverse());
      await axios.delete(`http://localhost:3000/api/todos/${index}`)
    } catch (err) {
      console.error('Error while Deleting todo:', err.message)
    }
  };

  const handlePopUP = () => {
    let popUp = document.querySelector('.add__todo__popup');
    popUp.classList.contains('flex') ? popUp.classList.replace('flex', 'none') : popUp.classList.replace('none', 'flex');
    settitle('');
    setdisc('');
    closeDateTimePopUp();
  };

  const setDateTime = () => {
    let DateTime = document.querySelector('.DateTimePopUp');
    DateTime.classList.add("DateTime");
  };

  const closeDateTimePopUp = () => {
    let DateTime = document.querySelector('.DateTimePopUp');
    DateTime.classList.remove("DateTime");
  };


  return (
    <>
      <div className='main__div'>
        {/* <Notification /> */}
        <nav>
          <h2>Your Todos</h2>
          <Logout />
        </nav>
    
        {/* Add todo button */}
        <div className='add-todo'>
          <div className="add__btn">
            <button className="btn btn-primary" onClick={handlePopUP}>+</button>
            <p>Add New todo</p>
          </div>

          {/* Add todo popup */}
          <div className="add__todo__popup none">
            <div className="add__todo__content">
              <textarea name="" id="" rows="1" value={title} onChange={e => settitle(e.target.value)} placeholder='Add title here ...'></textarea>
              <hr />
              <textarea name="" id="" rows="8" value={disc} onChange={e => setdisc(e.target.value)} placeholder='Add Discription here ...'></textarea>
            </div>
            <div className="add__todo__btn">
              <div className='DateTimePopUp'>
                <div className="setDate">
                  <input type="datetime-local" onChange={e => changeDate(e.target.value)} value={date} name="" id="" />
                </div>
                <div className="btn">
                  <button onClick={closeDateTimePopUp}>close</button>
                </div>
              </div>
              <button className="btn btn-primary" onClick={setDateTime}>Set Date&Time</button>
              <button disabled={(title === '' && disc === '')} className="btn btn-primary" onClick={handleSave}>Save</button>
              <button className="btn btn-primary cancelBtn" onClick={handlePopUP}>Cancel</button>
            </div>
          </div>
        </div>

        {/* todo list displaying as cards */}
        <div className="todo__list">
          {todos.slice().reverse().map((item, index) => {
            const formatted = format(new Date(item.date), 'dd-MM-yyyy __h:mm a');

            return (
              <div className="todo__card" key={index}>
                <div className="todo__card__content">
                  <h4>{item.title}</h4>
                  <hr/>
                  <pre>{item.disc}</pre>
                </div>
                <div className="todo__card__btn">
                  <button >{formatted}</button>
                  <button onClick={() => handleEdit(item, index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
