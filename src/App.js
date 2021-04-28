import React from 'react';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            tasks:[]
        }
    }

    componentDidMount(){
        if(localStorage["tasks"]){
        let tasks = JSON.parse(localStorage["tasks"])
        
        this.setState({tasks:tasks})
        }
    }

    addTask=(task)=>{
        this.state.tasks.push(task);
        this.setState({tasks:this.state.tasks});
        this.saveToLocalStorage();
    }

    saveToLocalStorage=()=>{
        localStorage["tasks"] = JSON.stringify(this.state.tasks);
    }

    render(){
        return <div className="container text-center">
            <h1>ToDo</h1>
            <DisplayTasks tasks={this.state.tasks} />
            <AddTask addTask={this.addTask} />
        </div>
    }

}


class AddTask extends React.Component{

    constructor(props){
        super();
        this.state={
            task:"",
            error:""
        }
    }

    addTask=()=>{
        let task = {
            task:this.state.task,
            
        }
        this.props.addTask(task);
    }


    render(){
        return <div>
            {this.state.error}<br/>
            <input className="form-control w-50 d-inline-block" placeholder="Task Name" type="text" value={this.state.task} onChange={(e)=>this.setState({task:e.target.value})} />
            <button className="mx-2 btn btn-outline-primary" onClick={this.addTask} >Add</button>
        </div>
    }
}


class DisplayTasks extends React.Component{
    render(){
        return <div>
            {this.props.tasks.length > 0 ?this.props.tasks.map((item)=>{
                return <DisplayTask task={item} key={item.task} />
            }):"Empty"}
        </div>
    }
}

DisplayTasks.defaultProps={
  tasks:[]
}

class DisplayTask extends React.Component{
    
    render(){
        return <div >
            <div className="alert border" role="alert">
               {this.props.task.task}
            </div>  
        </div>

    }
}


export default App;