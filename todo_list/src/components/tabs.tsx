import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

export interface ITasks{
  activeTasks?:string[]; 
  completedTasks?:string[];
}
const TabsComponent = (props:ITasks) => {
  const [newTask, setNewTask] = useState('');
  const [activeTasks, setActiveTasks] = useState(props.activeTasks);
  const [completedTasks, setCompletedTasks] = useState(props.completedTasks);

   const handleInputChange = (event:any) => {
    setNewTask(event.target.value);
  };
function addNewTask(){
activeTasks?.push(newTask);   
 setNewTask('');
}
const noActiveTasks = () => {
  if (activeTasks?.length==0) {
    return <p>No Active tasks</p>;
  } 
  
}
const noCompletedTasks = () => {
  if (activeTasks?.length==0) {
    return <p>No Completed tasks</p>;
  } 
  
}
function deleteCompletedTask(event:any){
  setCompletedTasks(completedTasks?.filter((_item, index) => 
  index != event.target.id));}

function deleteActiveTask(event:any){
  console.log(event.target.id)
  setActiveTasks(activeTasks?.filter((_item, index) => 
  index != event.target.id));
}
 const handleCheckboxChange = (event:any) => {

if(event.target.checked && activeTasks){

  completedTasks?.push(activeTasks[event.target.id]);
  deleteActiveTask(event);
    event.target.checked=!event.target.checked;
}
else if(!event.target.checked && completedTasks){
  activeTasks?.push(completedTasks[event.target.id]);
  deleteCompletedTask(event);
  event.target.checked=!event.target.checked;
}
};
    return (
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
          
        >
          <Tab eventKey="activeTasks" title="Active Tasks">
          <div className='col-md-3'>
          <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add a Task"
          aria-label="Add a Task"
          aria-describedby="Add a Task"
          onChange={handleInputChange}      
          value={newTask}

        />
        <Button disabled={newTask?false:true} onClick={addNewTask} variant="outline-secondary" id="addTask">
          Create
        </Button>
      </InputGroup>
       </div>
      {noActiveTasks()}
          <ul>
          {activeTasks?.map((item:string, index:number) => (
          <li className='d-flex align-items-center mb-2' key={index}><p className='me-2 mb-0'>{item}</p>
          <input className='me-2'     
        onClick={handleCheckboxChange} defaultChecked={false}
    id={index.toString()} type="checkbox" />
           <Button className='me-2' id={index.toString()} onClick={deleteActiveTask} variant="danger" ><i className="bi bi-trash"></i></Button>
          </li>
        ))}</ul>
        
          </Tab>
          <Tab eventKey="completedTasks" title="Completed Tasks">
          {noCompletedTasks()}
          <ul>
           {completedTasks?.map((item,index) => (
           <li key={index}>{item}  
           <input    
        onClick={handleCheckboxChange} defaultChecked={true}
       id={index.toString()} type="checkbox" />
                 <Button  id={index.toString()} onClick={deleteCompletedTask} variant="danger"><i className="bi bi-trash"></i></Button>
           </li>   
         ))}</ul>
          </Tab>
        </Tabs>
      );
 
 
 
}

export default TabsComponent;


