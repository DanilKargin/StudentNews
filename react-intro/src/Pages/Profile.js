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
        
        const [password, setPassword] = useState('');
        const [fio, setFio] = useState('');
        const [image, setImage] = useState(require("./TestImages/Profile.png"));
    
        const setDataFio = (value) => {
            fetchDataEdit(null, value, '');
        }
        const setDataPassword = (value) => {
            fetchDataEdit(null, '', value);
        }
        
        const fetchData = async () => {
            try{
            const response = await fetch('http://localhost:8080/user', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                });
                if(response.status === 401 || response.status === 403){
                    login(null);
                    navigate('/login');
                    return;
                }
                var result = await response.json();
                setImage(`data:image/png;base64,${result.image}`);
                setFio(result.fio);
                
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
            }
        };
        const onChangePhoto = (event) => {
               const file = event.target.files[0]; // Получаем первый выбранный файл
                if (file) {
                    const reader = new FileReader();

                    // Читаем файл как массив байтов
                    reader.readAsArrayBuffer(file);

                    reader.onload = function(e) {
                        const arrayBuffer = e.target.result;
                        const byteArray = Array.from(new Uint8Array(arrayBuffer));                     
                        fetchDataEdit(byteArray, "", "");
                    };

                    reader.onerror = function() {
                        console.error("Ошибка при чтении файла");
                    };
                }
            }
        const deleteButton_onClick = () => {
            const confirmBox = window.confirm(
              "Вы уверены в том, что хотите удалить профиль и все данные?"
            )
            if (confirmBox === true) {
                    const confirmConfirmBox = window.confirm(
                      "Вы точно уверены, что хотите удалить профиль?"
                    )
                    if (confirmConfirmBox === true) {
                      fetchDataDelete();
                    }
            }   
        }
        const signOut_onClick = () => {
            const confirmBox = window.confirm(
              "Вы уверены в том, что хотите выйти из аккаунта?"
            )
            if (confirmBox === true) {
                navigate("/login");
                login(null);
            }         
        }
        const fetchDataEdit = async (img, name, pass) => {
                try{
                    const requestData = {
                        image: img,
                        fio: name,
                        password: pass
                    }
                    const response = await fetch('http://localhost:8080/user/edit', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                      },
                        body: JSON.stringify(requestData),
                    });
                    if (!response.ok) {
                        throw new Error('Неверный email или пароль');
                      }
                    var result = await response.json()
                    setImage(`data:image/png;base64,${result.image}`);
                    setFio(result.fio);
                    alert("Изменения сохранены");
                }catch(error){
                    if (error.response?.status === 401) {
                        login(null);
                        navigate('/login');
                      }
                    alert(error.message);
                }
            };
            const fetchDataDelete = async () => {
            try{
            const response = await fetch('http://localhost:8080/delete', {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                });
                if(response.status === 401 || response.status === 403){
                    login(null);
                    navigate('/login');
                    return;
                }
                navigate('/login');
                login(null);
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
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
                                <img src={image} className="profile-img"/>
                                <div>
                                    <label for="file"><TfiCamera className="photo-icon"/></label>
                                    <input id="file" onChange={onChangePhoto} type="file" accepts=".jpg, .jpeg, .png"/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-div-block">
                            <h2>Персональные данные</h2>
                            <CustomInput props={{
                                                regex: /^[А-ЯA-Z][а-яёa-z]+[ ]+[А-ЯA-Z][а-яёa-z]*$/,
                                                label: "Введите имя и фамилию...", 
                                                header: "Имя Фамилия", 
                                                text: fio, 
                                                type: 'text',
                                                setData: setDataFio,
                                                }}/>
                            <PasswordInput props={{
                                                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                  header: "Пароль", 
                                                  text: '********', 
                                                  type: 'password',
                                                  setData: setDataPassword}}/>
                        </div>
                        <div className="delete-block">
                            <a className="delete-profile-button" onClick={deleteButton_onClick}>Удалить мой профиль и все его данные</a>
                        </div>
                        <div className="delete-block">
                            <a className="delete-profile-button" onClick={signOut_onClick}>Выйти из аккаунта</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }