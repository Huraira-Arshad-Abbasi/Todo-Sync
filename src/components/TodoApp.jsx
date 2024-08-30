import { useState, useEffect, useContext } from 'react';
import '../css/TodoApp.css';
import axios from 'axios';
import { format } from 'date-fns';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { AuthContext } from './AuthContext';
import Logout from './Logout';


export default function TodoApp() {
    const { isAuthenticated} = useContext(AuthContext);
    const [title, settitle] = useState('');
    const [disc, setdisc] = useState('');
    const [todos, settodos] = useState([]);
    const [date, changeDate] = useState(new Date());

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch todos from the backend
            const fetchTodos = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/todos');
                    settodos(response.data);

                } catch (error) {
                    console.error('Error fetching todos:', error.message);
                }
            };
            fetchTodos();
        }
    }, [isAuthenticated]); 


    // fucntions
    const handleSave = async () => {
        const todo = { title, disc, date };
        try {
            // Save the new todo in the database
            const response = await axios.post('http://localhost:3000/api/todos', todo);
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
        if (popUp.classList.contains('flex')) {
            popUp.classList.replace('flex', 'none');
        } else {
            popUp.classList.replace('none', 'flex');
        }
        settitle('');
        setdisc('');
        closeReminderPopUp();
    };

    const setReminder = () => {
        let reminder = document.querySelector('.reminderPopUp');
        reminder.classList.add("reminder");
    };

    const closeReminderPopUp = () => {
        let reminder = document.querySelector('.reminderPopUp');
        reminder.classList.remove("reminder");
    };
    if (!isAuthenticated) {
        return (
            <div className="auth font-extrabold p-8 text-center bg-[#054a59]">
                <h2 className='text-white font-light text-4xl'>Login to your account</h2>
                {/* Implement your login form here using the login function */}
            </div>
        );
    }
    return (
        <>
          <div className='main'>
            <nav>
              <h2>Huraira Todolist</h2>
              <Logout/>
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
                  <div className='reminderPopUp'>
                    <div className="setDate">
                    <DateTimePicker onChange={changeDate} value={date} />
                    </div>
                    <div className="btn">
                      <button onClick={closeReminderPopUp}>close</button>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={setReminder}>Set reminder</button>
                  <button disabled={(title === '' && disc === '')} className="btn btn-primary" onClick={handleSave}>Save</button>
                  <button className="btn btn-primary cancelBtn" onClick={handlePopUP}>Cancel</button>
                </div>
              </div>
            </div>
            {/* todo list displaying as cards */}
            <div className="todo__list">
              {todos.slice().reverse().map((item, index) => {
                const formatted = format(new Date(item.date), 'dd-MM-yyyy h:mm a');
                
                return (
                  <div className="todo__card" key={index}>
                    <div className="todo__card__content">
                      <h4>{item.title}</h4>
                      <hr className='w-[100%] h-2' />
                      <pre>{item.disc}</pre>
                    </div>
                    <div className="todo__card__btn">
                      <button >{formatted}</button>
                      <button key={index} onClick={() => handleEdit(item, index)}>Edit</button>
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
