import { useEffect, useRef, useState } from 'react';
import { NavLink, Routes, Route } from 'react-router';
import Alltaks from './Alltasks';
import Pending from './pending';
import Completed from './completed';
// import './App.css'

function App() {

  const task = useRef();
  const firstrender = useRef(true);
  const [todos, settodos] = useState([]);
  const [edit, setedit] = useState({ isedit: false, editidx: -1 });

  //getting from localstorage
  useEffect(() => {
    let todosLS = localStorage.getItem("todos");
    if (todosLS) {
      settodos(JSON.parse(todosLS));
    }
  }, [])

  //setting to localstorage
  useEffect(() => {
    if (firstrender.current) {
      firstrender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //pressing escape to stop editing the task
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setedit({ isedit: false, editidx: -1 });
        task.current.value = "";
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);


  //add and edit button clicked
  function handleadd(e) {
    e.preventDefault();
    let todo = task.current.value.trim();

    if (!edit.isedit) { //adding new task
      if (todo) {
        settodos([...todos, { todo, iscompleted: false }]);
        task.current.value = "";
      }
    }

    else { //editing task
      if (todo) {
        todos[edit.editidx].todo = todo;
        settodos([...todos]);
        task.current.value = "";
      }
      setedit({ isedit: false, editidx: -1 });
    }
  }

  function handleedit(i) {
    task.current.value = todos[i].todo;
    task.current.focus();
    setedit({ isedit: true, editidx: i });
  }

  function handledelete(i) {
    if (confirm("want to delete the task")) {
      todos.splice(i, 1);
      settodos([...todos]);
    }
  }

  function handlecheckbox(i) {
    todos[i].iscompleted = !todos[i].iscompleted;
    settodos([...todos]);
  }

  function handlerefresh() {
    if (confirm("Want to create new Task list, All current tasks will be deleted")) {
      settodos([]);
      setedit({ isedit: false, editidx: -1 })
    }
  }

  return (
    <div className='flex justify-center bg-secondarybg text-white min-h-screen'>

      <div className='maincontainer h-fit w-[95vw] max-w-[600px]  2xl:max-w-[800px] bg-primarybg my-4 p-4 sm:p-6 md:p-8 rounded-xl'>

        {/* progress */}
        <div className="p-3 sm:p-4 border-2 border-solid border-purple rounded-xl flex justify-between items-center">
          <div className="details">
            <h1 className='text-4xl'>Focus Flow..</h1>
            <p className='font-extralight'>Focus better Flow faster!</p>
          </div>
          <div>
            <button className='bg-purple text-white text-xl font-bold w-20 h-10 rounded-xl hover:bg-teal cursor-pointer' onClick={handlerefresh}>Refresh</button>
          </div>
        </div>


        {/* form */}
        <form className='w-full my-8 flex gap-[2%] items-center'>

          <input type="text" placeholder="enter new task" className='w-full h-10 bg-secondarybg text-base rounded-[0.25rem] px-2 border-1 border-solid border-purple outline-none' ref={task} />

          <button className={`${!edit.isedit ? "bg-purple" : "bg-yellow-600"} h-8 w-10 rounded-sm border-1 border-solid border-transparent hover:bg-teal cursor-pointer`} onClick={(e) => handleadd(e)}>{!edit.isedit ? "Add" : "Edit"}</button>
        </form>

        {/* navbar */}
        <div className="w-full px-2 py-1 bg-secondarybg flex justify-between rounded-sm border-0 text-gray-400">
          <NavLink to="/pending" className={({isActive})=>(isActive?"text-teal  rounded-sm":"")}> Active</NavLink>
          <NavLink to="/" className={({isActive})=>(isActive?"text-teal  rounded-sm":"")}> All tasks</NavLink>
          <NavLink to="/completed" className={({isActive})=>(isActive?"text-teal  rounded-sm":"")}> Completed</NavLink>
        </div>

        {/* tasklist */}
        <main>
        <Routes>
          <Route path='/'
            element={<Alltaks todos={todos} edit={edit} handleedit={handleedit} handledelete={handledelete} handlecheckbox={handlecheckbox} />} />

          <Route path='/pending'
            element={<Pending todos={todos} edit={edit} handleedit={handleedit} handledelete={handledelete} handlecheckbox={handlecheckbox} />} />

          <Route path='/completed'
            element={<Completed todos={todos} edit={edit} handleedit={handleedit} handledelete={handledelete} handlecheckbox={handlecheckbox} />} />

        </Routes>
        </main>

        {todos.length == 0 ? <p className='mt-8 text-2xl text-center'>..Add your tasks..</p> : null}

      </div>

    </div>
  )
}

export default App;