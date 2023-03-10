import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppoinementForm from './AppointmentForm';
import SearchAppointment from './SearchAppointment';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='inventory'>
            <Route path="models">
              <Route index element={<ModelList />}/>
              <Route path="new" element={<ModelForm />}/>
            </Route>
            <Route path="automobiles">
              <Route index element={<AutomobileList />}/>
              <Route path="new" element={<AutomobileForm />} />
            </Route>
          </Route>
          <Route path='services'>
            <Route path="technicians">
              <Route index element={<TechnicianList />} />
              <Route path='new' element={<TechnicianForm />} />
            </Route>
            <Route path='appointments'>
              <Route index element={<AppointmentList />} />
              <Route path='new' element={<AppoinementForm />} />
              <Route path='search' element={<SearchAppointment />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App;
