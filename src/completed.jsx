
export default function Completed({ todos, edit, handleedit, handledelete, handlecheckbox }) {
    return (
        <div className="todos mt-8">
            {
                todos.map((item, index) => {

                    if (!item.iscompleted) return;

                    else return (
                        <div className="item" key={index}>
                            <div className="task">
                                <input type="checkbox" checked={item.iscompleted} onChange={() => handlecheckbox(index)} />
                                <p className={item.iscompleted ? "line-through" : ""}>{item.todo}</p>
                            </div>

                            <div className="icons">
                                <button onClick={() => handleedit(index)} disabled={edit.isedit}>Edit</button>
                                <button onClick={() => handledelete(index)} disabled={edit.isedit}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}