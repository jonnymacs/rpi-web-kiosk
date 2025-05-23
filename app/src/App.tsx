import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChScreen from './Screens/ChooseScreen/ChScreen';
import Screen from './Screens/HomeScreen/Screen';
import PMScreen from './Screens/PayMethodScreem/PMScreen';
import OHScreen from './Screens/OrderHomeSreen/OHScreen';
import RScreen from './Screens/ReviewScreen/RScreen';
import CScreen from './Screens/CompleteScreen/CScreen';
import AdminScreen from './Screens/AdminScreen/AdminScreen';
import QueueScreen from './Screens/QueueScreen/QueueScreen';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Screen />} />      
          <Route path='/choose' element={<ChScreen />} />      
          <Route path='/paymethod' element={<PMScreen />} />      
          <Route path='/order' element={<OHScreen />} />      
          <Route path='/review' element={<RScreen />} />
          <Route path='/complete' element={<CScreen />} />

          {/* Admin Screen */}
          <Route path='/admin' element={<AdminScreen />} />

          {/* Queue Screen */}
          <Route path='/queue' element={<QueueScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
