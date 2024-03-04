import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './tabs.css';
import Spinner from 'react-bootstrap/Spinner';

export interface ITasks{
  activeTasks?:string[]; 
  completedTasks?:string[];
}
const TabsComponent = (props:ITasks) => {
  const [newTask, setNewTask] = useState('');
  const [activeTasks, setActiveTasks] = useState(props.activeTasks);
  const [completedTasks, setCompletedTasks] = useState(props.completedTasks);
  const [loading, setLoading] = useState(false);

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
  if (completedTasks?.length==0) {
    return <p>No Completed tasks</p>;
  } 
  
}
function deleteCompletedTask(event:any){
  console.log(event.target.id)
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
function handleTabChange() {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
}

    return (
      <>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={handleTabChange}
          
        >
        <Tab eventKey="activeTasks" title="Active Tasks">
           {!loading && (
            <>
          <div className='col-md-3' >
            <InputGroup className="mb-3">
               <Form.Control
                placeholder="Add a Task"
                aria-label="Add a Task"
                aria-describedby="Add a Task"
                onChange={handleInputChange}      
                value={newTask}
                />
              <Button disabled={newTask?false:true} onClick={addNewTask} variant="primary" id="addTask">
              Create
              </Button>
            </InputGroup>
          </div>
        {noActiveTasks()}
        
    <ListGroup >       
      {activeTasks?.map((item:string, index:number) => (
      <ListGroup.Item className="custom-list-item"  key={index} >
        <p>{item}</p>
        <p>check if completed</p>
        <input className='me-2'  
          onClick={handleCheckboxChange} defaultChecked={false}
          id={index.toString()} type="checkbox" />
      <Button className='me-2'  id={index.toString()} onClick={deleteActiveTask} variant="danger" ><i className="bi bi-trash" ></i></Button>
      </ListGroup.Item>
      ) )}
      </ListGroup>
        </>
           )}
         </Tab>
        <Tab eventKey="completedTasks" title="Completed Tasks">
          {noCompletedTasks()}
          {!loading && (
            <>
          <ListGroup >
        {completedTasks?.map((item,index) => (
    <ListGroup.Item className="custom-list-item"  key={index} >
        <p>{item}</p>
        <p>uncheck if not completed</p>
       <input className='me-2'  
        onClick={handleCheckboxChange} defaultChecked={true}
        id={index.toString()} type="checkbox" />
      <Button className='me-2'  id={index.toString()} onClick={deleteCompletedTask} variant="danger" ><i className="bi bi-trash" ></i></Button>
    </ListGroup.Item>
  ) )}
      </ListGroup>
        </>
          )}
          </Tab>
        </Tabs>
        {loading && (
          <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
          </div>
          )}

        </>
      );
 
 
 
}

export default TabsComponent;


