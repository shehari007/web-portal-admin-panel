import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import Login from './components/login';
import { Routes, Route, Navigate, BrowserRouter, Router } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import { Fragment } from 'react';

function App() {

  return (

    <div className="main">

      <h2 className="main-header">Findme.com Network Admin Panel</h2>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<ProtectedRoute />}>
              <Route exact path='/' element={<Read />} />
            </Route>
            <Route exact path='/create' element={<ProtectedRoute />}>
              <Route exact path='/create' element={<Create />} />
            </Route>
            <Route exact path='/update' element={<ProtectedRoute />}>
              <Route exact path='/update' element={<Update />} />
            </Route>
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </div>


  );
}

export default App;
