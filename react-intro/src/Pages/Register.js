import rect, {Component, useState, useEffect} from 'react'
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
    
    const [visibility_inputs, setVisibility_inputs] = useState("block");
    const [visibility_result, setVisibility_result] = useState("none");
    
    const [result, setResult] = useState("Загрузка...");
    const [isActiveResend, setIsActiveResend] = useState('none');
    
    const [seconds, setSeconds] = useState(60);
    const [isActiveTimer, setIsActiveTimer] = useState(false);
    
    useEffect(() => {
    let interval = null
    if (isActiveTimer) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000)
      if(seconds == 0){
          setIsActiveTimer(false);
          setIsActiveResend('all');
      }
    }else if (!isActiveTimer && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  }, [isActiveTimer, seconds])
  
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
    const resend_emailVerification = async () => {
        setIsActiveResend('none');
         setSeconds(60);
         setIsActiveTimer(true);
        try {
          const response = await fetch('http://localhost:8080/auth/resend-token?email=' + login, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error('Ошибка отправки письма. Попробуйте позже');
          }

          const data = await response.json();
          if(data.content.length === 0){
              alert(data.error);
          }else{
              setResult(data.content);
          }
            
        } catch (err) {
          alert(err.message);
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
          setResult(data.content);
          setVisibility_inputs('none');
          setVisibility_result('block');
          setIsActiveTimer(true);
        } catch (err) {
          setErrorLogin(err.message);
        }
  };
    
        return(
        <div className="all-login-page">
            <div className="login-container">
                <h2>Регистрация</h2>
                <div style={{display: visibility_inputs}}>
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
                </div>
                <div style={{display: visibility_result}}>
                    <h3>{result}</h3>
                    <a href='#' onClick={resend_emailVerification}
                    style={{pointerEvents: isActiveResend}}>Отправить сообщение повторно</a>
                    <div>через {seconds}</div>
                </div>
                <div className="bottom-block">
                    <a href="/login">Войти</a>
                </div>
            </div>
        </div>
    )
}