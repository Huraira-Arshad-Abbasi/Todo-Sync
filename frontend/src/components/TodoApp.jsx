import { useState, useEffect, useRef } from 'react'
import '../css/TodoApp.css'
import axios from 'axios'
import { format, isToday, isFuture } from 'date-fns'
import Logout from './Logout'

export default function TodoApp () {
  const [title, settitle] = useState('')
  const [disc, setdisc] = useState('')
  const [todos, settodos] = useState([])
  const [date, changeDate] = useState(new Date())

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const popupRef = useRef(null)
  const cancelBtnRef = useRef(null)
  const dateTimeRef = useRef(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/todos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        settodos(response.data.length ? response.data : [])
      } catch (error) {
        console.error('Error fetching todos:', error.message)
      }
    }
    fetchTodos()
  }, [])

  const handleSave = async () => {
    const status = 'pending';
    const token = localStorage.getItem('token')
    const todo = { title, disc, date, status }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/addTodo`,
        todo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      settodos([...todos, response.data])
      settitle('')
      setdisc('')
      if (cancelBtnRef.current) cancelBtnRef.current.disabled = false
      handlePopUP()
    } catch (error) {
      console.error('Error creating todo:', error.message)
    }
  }

  const handleEdit = async item => {
    if (popupRef.current) {
      popupRef.current.classList.replace('none', 'flex')
    }
    settitle(item.title)
    setdisc(item.disc)
    changeDate(item.date)
    if (cancelBtnRef.current) cancelBtnRef.current.disabled = true
    handleDelete(item._id)
  }

  const handleDelete = async _id => {
    try {
      let newTodos = todos.filter(item => item._id !== _id)
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/todos/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      settodos(newTodos)
    } catch (err) {
      console.error('Error while Deleting todo:', err.message)
    }
  }

  const handlePopUP = () => {
    if (!popupRef.current) return
    const popup = popupRef.current //
    if (popup.classList.contains('flex')) {
      popup.classList.replace('flex', 'none')
    } else {
      popup.classList.replace('none', 'flex')
    }
    settitle('')
    setdisc('')
    closeDateTimePopUp()
  }

  const setDateTime = () => {
    if (dateTimeRef.current) {
      dateTimeRef.current.classList.add('DateTime')
    }
  }

  const closeDateTimePopUp = () => {
    if (dateTimeRef.current) {
      dateTimeRef.current.classList.remove('DateTime')
    }
  }

 const changeStatus = async (_id, newStatus) => {
  
  const updatedTodos = todos.map(todo =>
    todo._id === _id ? { ...todo, status: newStatus } : todo
  );
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3000/api/todos/${_id}`, 
      { status:  newStatus}, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    settodos(updatedTodos);
    console.log("status updated");
  } catch (err) {
    console.error("Error updating status:", err.message);
  }
};


  // Search, Filter, Sort Logic

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(todo => {
      if (filter === 'completed') return (todo.status === 'Completed')
      if (filter === 'pending') return (todo.status === 'pending')
      if (filter === 'today') return isToday(new Date(todo.date))
      if (filter === 'upcoming') return isFuture(new Date(todo.date))
      return true // 'all'
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date)
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date)
      if (sort === 'az') return a.title.localeCompare(b.title)
      if (sort === 'za') return b.title.localeCompare(a.title)
      return 0
    })

  return (
    <>
      <div className='main__div'>
        <nav>
          <h2>Your Todos</h2>
          <Logout />
        </nav>

        <div className='add-todo'>
          <div className='add__btn'>
            <button className='btn btn-primary' onClick={handlePopUP}>
              +
            </button>
            <p>Add New todo</p>
          </div>

          <div className='add__todo__popup none' ref={popupRef}>
            <div className='add__todo__content'>
              <textarea
                rows='1'
                value={title}
                onChange={e => settitle(e.target.value)}
                placeholder='Add title here ...'
              ></textarea>
              <hr />
              <textarea
                rows='8'
                value={disc}
                onChange={e => setdisc(e.target.value)}
                placeholder='Add Description here ...'
              ></textarea>
            </div>
            <div className='add__todo__btn'>
              <div className='DateTimePopUp' ref={dateTimeRef}>
                <div className='setDate'>
                  <input
                    type='datetime-local'
                    onChange={e => changeDate(e.target.value)}
                    value={date}
                  />
                </div>
                <div className='btn'>
                  <button onClick={closeDateTimePopUp}>close</button>
                </div>
              </div>
              <button className='btn btn-primary' onClick={setDateTime}>
                Set Date&Time
              </button>
              <button
                disabled={title === '' && disc === ''}
                className='btn btn-primary'
                onClick={handleSave}
              >
                Save
              </button>
              <button
                ref={cancelBtnRef}
                className='btn btn-primary cancelBtn'
                onClick={handlePopUP}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className='controls'>
          <input
            type='text'
            placeholder='Search by title...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className='select-row'>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value='all'>All</option>
              <option value='completed'>Completed</option>
              <option value='pending'>Pending</option>
              <option value='today'>Today</option>
              <option value='upcoming'>Upcoming</option>
            </select>

            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value='newest'>Newest First</option>
              <option value='oldest'>Oldest First</option>
              <option value='az'>A-Z</option>
              <option value='za'>Z-A</option>
            </select>
          </div>
        </div>

        <div className='todo__list'>
          
          { filteredTodos.length === 0 ? (
            <div className='no-todos'>
              <h3>No Todos Found ...</h3>
            </div>
          ) : ( 
          filteredTodos.map(item => {
            const formatted = format(new Date(item.date), 'dd-MM-yyyy __h:mm a')

            return (
              <div className='todo__card' key={item._id}>
                <div className='status'>
                  <select
                    value={item.status}
                    onChange={(e) => changeStatus(item._id, e.target.value)}>
                    <option value='pending'>⏳</option>
                    <option value='Completed'>✔</option>
                  </select>
                </div>
                <div className='todo__card__content'>
                  <h4>{item.title}</h4>
                  <hr />
                  <pre>{item.disc}</pre>
                </div>
                <div className='todo__card__btn'>
                  <button>{formatted}</button>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            )
          }))
          }
          
          
        </div>
      </div>
    </>
  )
}
