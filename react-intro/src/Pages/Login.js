import rect, {Component, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Login.css'
import { useAuth } from '../AuthContext';

export const Login = () => {
    const [errorLogin, setErrorLogin] = useState("Строка не может быть пустой");
    const [visibility_error, setVisibility_error] = useState("none");
    
    const [errorPassword, setErrorPassword] = useState("Строка не может быть пустой");
    const [visibility_errorPassword, setVisibility_errorPassword] = useState("none");
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const submit_onClick = () => {
        var flag = true;
        if(email.length == 0){
            setErrorLogin("Строка не может быть пустой");
            setVisibility_error("block");
            flag = false;
        }else{
            setVisibility_error("none");
        }
        if(password.length == 0){
            setErrorPassword("Строка не может быть пустой");
            setVisibility_errorPassword("block");
            flag = false;
        }else {
            setVisibility_errorPassword("none");
        }
        if(flag){
            handleLogin();
        }
    }
    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:8080/auth/sign-in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email, "password": password }),
          });

          if (!response.ok) {
            throw new Error('Неверный email или пароль');
          }

          const data = await response.json();
          if(data.token.length === 0){
              setErrorLogin(data.error);
              setVisibility_error("block");
              return;
          }
          login({ token: data.token, role: data.role });
          localStorage.setItem('token', data.token);
          navigate('/profile');
        } catch (err) {
          setErrorLogin(err.message);
        }
  };
    
        return(
        <div className="all-login-page">
            <div className="login-container">
                <h2>Вход</h2>
                <div className="input-login-block">
                    <div className="input-login-div">
                        <label>Почта:</label>
                        <label style={{display: visibility_error}} className="error-label">*{errorLogin}</label>
                        <input onChange={event => setEmail(event.target.value)} type="email"/>
                    </div>
                    <div className="input-login-div">
                        <label>Пароль:</label>
                        <label style={{display: visibility_errorPassword}} className="error-label">*{errorPassword}</label>
                        <input onChange={event => setPassword(event.target.value)} type="password"/>
                    </div>
            
                </div>
                <button onClick={submit_onClick}>Войти</button>
                <div className="bottom-block">
                    <a href="/register">Регистрация</a>
                </div>
            </div>
        </div>
    )
}