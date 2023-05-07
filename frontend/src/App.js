
import { Routes,Route } from "react-router-dom";
import './App.css';
import Register from './pages/authentication/RegisterForm';


function App() {
  return (
 <Routes>
    <Route path='/register' element={<Register/>}></Route>
  
 </Routes>
  );
}

export default App;
