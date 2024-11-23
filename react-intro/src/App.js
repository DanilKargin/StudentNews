import Home from './Pages/Home.js'
import Profile from './Pages/Profile.js'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from './Header.js'
import Footer from './Footer.js'
import NewsRead from './Pages/NewsRead.js'
import {Login} from './Pages/Login.js'
import {Register} from './Pages/Register.js'
import {Drafts} from './Pages/Drafts.js'
import {Draft} from './Pages/Draft.js'

function App() {
  return (
    <Router>
    <div className="App">
        <div>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/news/:id" element={<NewsRead />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/drafts" element={<Drafts />}/>
                    <Route path="/drafts/:id" element={<Draft />}/>
                    <Route path="*" element={<h2>Ресурс не найден</h2>} />
                </Routes>
            <Footer/>
        </div>
    </div>
    </Router>
  );
}

export default App;
