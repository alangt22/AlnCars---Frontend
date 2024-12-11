import { Outlet } from 'react-router-dom'
//components
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'


//Context
import {UserProvider} from './context/UserContext'

function App() {
  
  return (
    <div className="App">
        <UserProvider>
          <Navbar/>
          <Message/>
          <Container>
            <Outlet/>
          </Container>
          <Footer/>
        </UserProvider>
    </div>
  )
}

export default App;