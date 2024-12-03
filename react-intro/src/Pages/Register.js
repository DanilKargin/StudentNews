import rect, {Component, useState} from 'react'
import './css/Login.css'

export const Register = () => {
    const login_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          
    const [errorLogin, setErrorLogin] = useState("Строка не может быть пустой");
    const [visibility_error, setVisibility_error] = useState("none");
    
    const [errorPassword, setErrorPassword] = useState("Строка не может быть пустой");
    const [visibility_errorPassword, setVisibility_errorPassword] = useState("none");
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setPassword_confirm] = useState("");
    
    const submit_onClick = () => {
        var flag = true;
        if(!login_regex.test(login)){
            setErrorLogin("Неккоректный формат");
            setVisibility_error("block");
            flag = false;
        }else{
            setVisibility_error("none");
        }
        
        if(!password_regex.test(password)){
            setErrorPassword("Пароль слишком легкий");
            setVisibility_errorPassword("block");
            flag = false;
        }else if(password !== confirm_password){
            setErrorPassword("Пароли не совпадают");
            setVisibility_errorPassword("block");
            flag = false;
        }else {
            setVisibility_errorPassword("none");
        }
        if(flag){
            handleRegister();
        }
    }
    const handleRegister = async () => {
        try {
          const response = await fetch('http://localhost:8080/auth/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": login, "password": password }),
          });

          if (!response.ok) {
            throw new Error('Неверный email или пароль');
          }

          const data = await response.json();
          if(data.content.length === 0){
              setErrorLogin(data.error);
              setVisibility_error("block");
              return;
          }
          alert(data.content);
          //navigate('/profile');
        } catch (err) {
          setErrorLogin(err.message);
        }
  };
        return(
        <div className="all-login-page">
            <div className="login-container">
                <h2>Регистрация</h2>
                <div className="input-login-block">
                    <div className="input-login-div">
                        <label>Почта:</label>
                        <label style={{display: visibility_error}} className="error-label">*{errorLogin}</label>
                        <input onChange={event => setLogin(event.target.value)} type="email"/>
                    </div>
                    <div className="input-login-div">
                        <label>Пароль:</label>
                        <label style={{display: visibility_errorPassword}} className="error-label">*{errorPassword}</label>
                        <input onChange={event => setPassword(event.target.value)} type="password"/>
                    </div>
                    <div className="input-login-div">
                        <label>Повторите пароль:</label>
                        <input onChange={event => setPassword_confirm(event.target.value)} type="password"/>
                    </div>
            
                </div>
                <button onClick={submit_onClick}>Зарегистрироваться</button>
                <div className="bottom-block">
                    <a href="/login">Войти</a>
                </div>
            </div>
        </div>
    )
}