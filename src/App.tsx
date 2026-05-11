import './app.css';
import { useState } from 'react';
import Icon from './components/Icon';
import { exerciresList, type ExerciresItem } from './constants/paths';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentExercise, setCurrentExercise] = useState('')
  const renderComponent = exerciresList.find(item => item.name === currentExercise)
  return (
    <>
      <Toaster position="top-center" />
      <div className="app">
        <nav className="sidebar">
          <div className="sidebar-top">
            <span className="menu-box">
              <Icon name='menu' size={20} color="#E9E9E9" />
            </span>
            <div>
              <ul className="icon-list">
                {exerciresList.map((item, idx) => {
                  return (
                    <li onClick={() => setCurrentExercise(item.name)}>
                      <Icon 
                        name={item.icon} 
                        size={25} 
                        color="#FFFFFF"
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name='setting' size={25} color="#FFFFFF"/>
          </div>
        </nav>
        <main className="main">
          {renderComponent && renderComponent.component}
        </main>
      </div>
    </>
  )
}

export default App
