import rect, {Component} from 'react'
import './css/Profile.css'
import { TfiCamera } from "react-icons/tfi";
import CustomInput from "./ProfileComponents/CustomInput.js"
import PasswordInput from "./ProfileComponents/PasswordInput.js"

export default class Profile extends Component {
    render(){
        return(
            <div>
                <div className="profile-div">
                    <div className="main-div-block">
                        <div className=".profile-div-block">
                            <div className="profile-img-container">
                                <img src={require("./TestImages/Profile.png")} className="profile-img"/>
                                <TfiCamera className="photo-icon"/>
                            </div>
                        </div>
                        <div className="profile-div-block">
                            <h2>Персональные данные</h2>
                            <CustomInput props={{
                                                regex: /^[А-ЯA-Z][а-яёa-z]+[ ]+[А-ЯA-Z][а-яёa-z]*$/,
                                                label: "Введите имя и фамилию...", 
                                                header: "Имя Фамилия", 
                                                text: 'Иванов Иван', 
                                                type: 'text'}}/>
                            <CustomInput props={{
                                                regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 
                                                label: "Введите почту...",
                                                header: "Почта", 
                                                text: 'example@mail.ru', 
                                                type: 'email'}}/>
                            <PasswordInput props={{
                                                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                  header: "Пароль", 
                                                  text: '********', 
                                                  type: 'password'}}/>
                        </div>
                        <div className="delete-block">
                            <a href="/login" className="delete-profile-button">Удалить мой профиль и все его данные</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}