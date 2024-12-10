import {Home} from './Pages/Home.js'
import {Profile} from './Pages/Profile.js'
import './App.css'
import { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation, useNavigate, Link} from "react-router-dom"
import Header from './Header.js'
import Footer from './Footer.js'
import NewsRead from './Pages/NewsRead.js'
import {Login} from './Pages/Login.js'
import {Register} from './Pages/Register.js'
import {Drafts} from './Pages/Drafts.js'
import {Draft} from './Pages/Draft.js'
import {RedactorPage} from './Pages/RedactorPage.js'
import {SearchPage} from './Pages/SearchPage.js'
import {Ready} from './Pages/Ready.js'
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
    <div className="App">
        <div>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/news/:id" element={<NewsRead />}/>
                    <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/search/:type/:text" element={<SearchPage />}/>
                    <Route path="/drafts" element={<PrivateRoute roles={['Reporter']}><Drafts/></PrivateRoute>}/>
                    <Route path="/drafts/:name" element={<PrivateRoute roles={['Reporter']}><Drafts/></PrivateRoute>}/>
                    <Route path="/draft/:id" element={<PrivateRoute roles={['Reporter']}><Draft/></PrivateRoute>}/>
                    <Route path="/redactor" element={<PrivateRoute roles={['Redactor']}><RedactorPage/></PrivateRoute>}/>
                    <Route path="/redactor/:name" element={<PrivateRoute roles={['Redactor']}><RedactorPage/></PrivateRoute>}/>
                    <Route path="/redactor/article/:id" element={<PrivateRoute roles={['Redactor']}><Ready/></PrivateRoute>}/>
                    <Route path="*" element={<h2>Ресурс не найден</h2>} />
                </Routes>
            <Footer/>
        </div>
    </div>
    </Router>
  );
}

export default App;
