// import './App.css';
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout';

//import Register from './Register';
import Signin from './Signin';
import Home from './Pages/Home';
import LinkPage from './Pages/LinkPage';
import Unauthorized from './Pages/Unauthorized';
import Auth from './Pages/Auth';
import Missing from './Pages/Missing';
import { AuthProvider } from './Context/authProvider';
import Protect from './Pages/Protected'

import Employee from './Pages/admin/Employee';
import Company from './Pages/admin/Company';
import Dashboard from './Pages/admin/Dashboard';
import AddCompany from './Pages/admin/AddCompany';
import AddDepartment from './Pages/admin/AddDepartment';
import AddEmployee from './Pages/admin/AddEmployee';
import UploadDepartment from './Pages/admin/UploadDepartment';
import UploadEmployee from './Pages/admin/UploadEmployee';


import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/signin" element={<Login/>}/>
      <Route path ='/register' element={<Register/>}/>

      {/* <Route path = '/signin' element={<Signin/>}/> */}

      <Route path = '/' element={<Layout/>}>
        <Route path="/linkpage" element={<LinkPage/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path = '/protected' element={<Protect/>}/>

        {/* {Admin Protected Routes} */}
        <Route element={<Auth allowedRoles={[2]}/>}>
          {/* <Route path = '/dashboard1' element={<Dashboard/>}/>
          <Route path = '/employees1' element={<Employee/>}/>
          <Route path = '/company1' element={<Company/>}/> */}
        </Route>
        {/* {Companies Protected Routes} */}
        <Route element={<Auth allowedRoles={[1]}/>}>
          <Route path = '/dashboard' element={<Dashboard/>}/>
          <Route path = '/employees' element={<Employee/>}/>
          <Route path = '/company' element={<Company/>}/>
          <Route path = '/add-company' element={<AddCompany/>}/>
          <Route path = '/add-department' element={<AddDepartment/>}/>
          <Route path = '/add-employee' element={<AddEmployee/>}/>
          <Route path = '/uploads-departments' element={<UploadDepartment/>}/>
          <Route path = '/uploads-employees' element={<UploadEmployee/>}/>

        </Route>
        
        <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </AuthProvider>
    
      
  );
}

export default App;