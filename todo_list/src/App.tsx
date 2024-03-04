

import 'bootstrap/dist/css/bootstrap.min.css';
import TabsComponent, { ITasks } from './components/tabs';
const App = () => {
  const tasks:ITasks = {activeTasks:['first','second'],completedTasks:['third','last']};

  return (   
     <div>
    <h1>Task Managment</h1>
    <TabsComponent activeTasks={tasks.activeTasks} completedTasks={tasks.completedTasks} />
  </div>);
};

export default App;
