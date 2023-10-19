import { useEffect, useState } from 'react';

function Todo1() {

    let [record, setRecord] = useState([])
    // let [active, setActive] = useState(false);
    // let [deactive, setdeactive] = useState(true);
    let [com, setCom] = useState("All");
    useEffect(() => {
        let localRecord = JSON.parse(localStorage.getItem('Todo'));
        if (localRecord == null) {
            setRecord([]);
        }
        else {
            setRecord(localRecord);
        }
    }, setRecord);

    var deleteTask = (id) => {
        let pos = record.findIndex(v => v.id == id);
        // alert("record Delete..")
        record.splice(pos, 1);
        setRecord(record);
        localStorage.setItem('Todo', JSON.stringify(record));
        let localRecord = JSON.parse(localStorage.getItem('Todo'));
        setRecord(localRecord);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            name: e.target.addtask.value,
            id: Math.round(Math.random() * 1000),
            active: false,

        }
        console.log(obj);
        let newrecord = ([...record, obj]);
        setRecord(newrecord);
        localStorage.setItem('Todo', JSON.stringify(newrecord));
        e.target.addtask.value = "";
    }

    let changeInputValue = (e) => {
        record[e.target.value].active = true;
        setRecord(record);
        localStorage.setItem('Todo', JSON.stringify(record));
    }

    let searchTask = (e) => {
        console.log(e.target.value);
        //     var searchItems = e.target.value;
        //     console.log(searchItems);
        //     var filterItems = record.filter(function (Task) {
        //         Task.name.includes(searchItems);
        //     });
        //     console.log(filterItems);
        //     setRecord(filterItems);
    }

    return (
        <div>
            <div className='parent' name="alltask">
                <h1 style={{ textAlign: "center" }}>THINGS TO DO</h1>
                <form method="post" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Add New" className="search" name="addtask" />
                    <button>Add Task</button>
                </form>
                <div className="allTask">
                    {com == "Pending"
                        ?
                        record.map((v, i) => {
                            return (

                                <div className='taskshow'>
                                    {v.active == false ?

                                        <ul>
                                            <li><input type="checkbox" value={i} onKeyUp={(e) => changeInputValue(e)} /></li>
                                            <li>{v.name} .</li>
                                            <li><button onClick={() => deleteTask(v.id)}>❌</button></li>
                                        </ul>
                                        : ""
                                    }
                                </div>
                            )
                        })
                        :
                        com == "Completed"
                            ?
                            record.map((v, index) => {
                                return (

                                    <div className='taskshow'>
                                        {v.active == true ?

                                            <ul>
                                                <li><input type="checkbox" checked value={index} onChange={(e) => changeInputValue(e)} /></li>
                                                <li>{v.name} .</li>
                                                <li><button onClick={() => deleteTask(v.id)}>❌</button></li>
                                            </ul>
                                            : ""
                                        }
                                    </div>
                                )
                            })
                            : com == "All"
                                ?
                                record.map((v, index) => {
                                    return (
                                        <div className='taskshow'>
                                            {v.active == true ?
                                                <ul>
                                                    <li><input type="checkbox" checked value={index} onChange={(e) => changeInputValue(e)} /></li>
                                                    <li>{v.name} .</li>
                                                    <li><button onClick={() => deleteTask(v.id)}>❌</button></li>
                                                </ul>
                                                : <ul>
                                                    <li><input type="checkbox" value={index} onChange={(e) => changeInputValue(e)} /></li>
                                                    <li>{v.name} .</li>
                                                    <li><button onClick={() => deleteTask(v.id)}>❌</button></li>
                                                </ul>
                                            }
                                        </div>
                                    )
                                }) : ""

                    }
                </div>




                <div className='footer'>
                    <div className='searchbar'>
                        <button >+</button>
                        <div class="search-box">
                            <input class="search-input" type="text" name="" placeholder="Search" onChange={(e) => searchTask(e)} id="search" />
                            <a href="#" style={{ textDecoration: "none" }} class="search-btn">
                                <p>🔎</p>
                            </a>
                        </div>
                    </div>
                    <span className='border'></span>
                    <p>{record.length} Task Hear</p>
                    <div className='btn'>
                        <input type="submit" value="All" onClick={() => setCom("All")} />
                        <input type="submit" value="Pending" onClick={() => setCom("Pending")} />
                        <input type="submit" value="Completed" onClick={() => setCom("Completed")} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Todo1;