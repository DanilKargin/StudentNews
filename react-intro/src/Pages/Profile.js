import rect, {Component, useEffect, useState} from 'react'
import './css/Profile.css'
import { TfiCamera } from "react-icons/tfi";
import CustomInput from "./ProfileComponents/CustomInput.js"
import PasswordInput from "./ProfileComponents/PasswordInput.js"
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
        const navigate = useNavigate();
        const { user } = useAuth();
        const { login } = useAuth();
        const [data, setData] = useState({fio: '', email: ''});   
        
        const [password, setPassword] = useState(null);
        const [email, setEmail] = useState(null);
        const [fio, setFio] = useState(null);
        const [image, setImage] = useState(null);
    
        const fetchData = async () => {
            try{
            const response = await fetch('http://localhost:8080/user', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`, // Добавляем токен в заголовок
                  },
                });
                setData(await response.json());
                setImage(data.image);
                setFio(data.fio);
            }catch(error){
                if (error.response.status === 401) {
                    login(null);
                    navigate('/login');
                  }
            }
        };
        const fetchDataEdit = async () => {
                try{
                    alert(fio);
                    const response = await fetch('http://localhost:8080/user/edit', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Добавляем токен в заголовок
                      },
                        body: JSON.stringify({"image": image, "fio": fio })
                    });
                    setData(await response.json());
                }catch(error){
                    if (error.response.status === 401) {
                        login(null);
                        navigate('/login');
                      }
                }
            };
        useEffect(() => {
            fetchData();
        }, []);

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
                                                text: data.fio, 
                                                type: 'text',
                                                setData: setFio,
                                                onClick: fetchDataEdit}}/>
                            <CustomInput props={{
                                                regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 
                                                label: "Введите почту...",
                                                header: "Почта", 
                                                text: data.email, 
                                                type: 'email',
                                                setData: setEmail,
                                                onClick: fetchDataEdit}}/>
                            <PasswordInput props={{
                                                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                  header: "Пароль", 
                                                  text: '********', 
                                                  type: 'password'}}/>
                        </div>
                        <div className="delete-block">
                            <a className="delete-profile-button">Удалить мой профиль и все его данные</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }