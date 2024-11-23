import rect, {Component, useState} from 'react'
import './css/Login.css'

export const Register = () => {
    const [errorLogin, setErrorLogin] = useState("Строка не может быть пустой");
    const [visibility_error, setVisibility_error] = useState("none");
    
    const [errorPassword, setErrorPassword] = useState("Строка не может быть пустой");
    const [visibility_errorPassword, setVisibility_errorPassword] = useState("none");
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setPassword_confirm] = useState("");
    
    const submit_onClick = () => {
        if(password !== confirm_password){
            setErrorPassword("Пароли не совпадают");
            setVisibility_errorPassword("block");
        }
        if(login.length == 0){
            setErrorLogin("Строка не может быть пустой");
            setVisibility_error("block");
        }
        if(password.length == 0){
            setErrorPassword("Строка не может быть пустой");
            setVisibility_errorPassword("block");
        }else {
            setVisibility_error("none");
            setVisibility_errorPassword("none");
        }
    }
        return(
        <div className="all-login-page">
            <form className="login-container">
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
                <button type="submit" onClick={submit_onClick}>Зарегистрироваться</button>
                <div className="bottom-block">
                    <a href="/login">Войти</a>
                </div>
            </form>
        </div>
    )
}