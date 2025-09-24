import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineEditCalendar, MdOutlineFreeCancellation } from "react-icons/md";
import Particles from './Particles';
import SplitText from "./SplitText";
import Footer from './Components/Footer';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, [])

  const SaveToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    if (t) setTodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
    SaveToLocalStorage(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
    SaveToLocalStorage(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("")
    SaveToLocalStorage(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    SaveToLocalStorage(newTodos)
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div style={{ width: '100%', height: '900px', position: 'relative' }}>
      {/* Particles Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Particles
          particleColors={['#f472b6', '#f472b6']}
          particleCount={1000}
          particleSpread={7}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Navbar */}
        <Navbar />

        {/* Add Task */}
        <div className="AddTodo flex flex-col sm:flex-row items-center justify-center mx-auto max-w-4xl my-5 rounded-xl p-5 bg-violet-100 border-2 border-violet-800 gap-4">
          {/* Heading */}
          <h1 className="text-xl font-bold px-5 py-1 justify-start">Add a Task</h1>

          {/* Input + Button wrapper */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="border-2 border-pink-700 rounded px-3 py-2 w-full sm:w-96"
              placeholder="What's your next task..."
            />
            <button
              onClick={handleAdd}
              className="border border-zinc-50 font-bold px-6 py-2 rounded-lg bg-[url('/public/images/nav-bg.avif')] bg-cover bg-center text-white hover:border-purple-600 w-full sm:w-auto text-center"
            >
              ADD
            </button>
          </div>
        </div>

        {/* bg-[url('/public/images/button-bg.jpg')] */}
        {/* Todo List */}
        <div className="todosList mx-auto max-w-4xl my-5 rounded-xl p-5 bg-transparent bg-cover bg-center">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h1 className="text-xl font-bold px-5 text-white">Your ToDo's</h1>
            <div className="flex gap-3 hover:border-2 hover:border-pink-400 hover:bg-pink-400 text-white hover:text-black hover:rounded-xl px-3 items-center">
              <input
                type="checkbox"
                onChange={toggleFinished}
                checked={showFinished}
                className="w-4 h-4 flex-shrink-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              SHOW FINISHED
            </div>
          </div>

          {/* No tasks */}
          {todos.length === 0 && (
            <div className="flex font-mono font-extrabold text-white m-3 p-2 justify-center text-2xl">
              No work Today !
            </div>
          )}

          {/* Task items */}
          {todos.map((item) =>
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todos flex flex-col sm:flex-row items-start sm:items-center justify-between m-5 p-3 bg-transparent rounded-lg"
              >
                {/* Task text with checkbox */}
                <div className="flex items-center gap-5 p-2 px-4 text-black font-serif rounded-3xl bg-white w-full sm:max-w-xl">
                  <input
                    type="checkbox"
                    className="w-5 h-5 flex-shrink-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    name={item.id}
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                {/* Buttons (below on mobile, right on desktop) */}
                <div className="buttons flex justify-end gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="h-10 bg-pink-400 font-bold text-white px-4 p-1 rounded-[10px] hover:bg-violet-800 hover:border-2 hover:border-white"
                  >
                    <MdOutlineEditCalendar size={30} />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="h-10 bg-pink-400 font-bold text-white px-4 p-1 rounded-[10px] hover:bg-violet-800 hover:border-2 hover:border-white"
                  >
                    <MdOutlineFreeCancellation size={30} />
                  </button>
                </div>
              </div>
            )
          )}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
