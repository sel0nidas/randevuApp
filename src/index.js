import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import './index.css';
//import App from './App';
import Login from './Login';
import Register from './Register';
import Calendar from './Calendar';
import reportWebVitals from './reportWebVitals';
import ContextWrapper from './ContextWrapper';
import Choose from './CalendarChoose'
import Settings from './Settings'
//<App />
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>

      <Route exact path='/' element={<Login />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/choose' element={
		    <Choose />
        } />
      <Route exact path='/calendar' element={
      
      <ContextWrapper>
		    <Calendar />
      </ContextWrapper>
      } />
      <Route exact path='/settings' element={<Settings />} />
      </Routes>
    </Router>
    {/* <ContextWrapper>
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/calendar' element={<Calendar />} />
        <Route exact path='/choose' element={<Choose />} />
    
      </Routes>
    </Router>
    </ContextWrapper> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
