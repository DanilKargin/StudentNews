import {useState, useEffect} from 'react'
import SearchInput from './HomeComponents/SearchInput.js'
import {DraftsItem} from './DraftComponents/DraftsItem.js'
import Catalog from './HomeComponents/Catalog.js'
import './css/RedactorPage.css'
import { useAuth } from '../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

export const RedactorPage = () => {
    const { user } = useAuth();
    const { login } = useAuth();
    const navigate = useNavigate();
    let { name } = useParams();
    
    const [readyList, setReadyList] = useState([]);
    const [category, setCategory] = useState('');
    const [deleteCategory, setDeleteCategory] = useState('');
    const [categories, setCategories] = useState([]);
    
    const fetchDataCategory = async () => {
            try{
            const response = await fetch('http://localhost:8080/category/list', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                var result = await response.json();
                setCategories(result);
            }catch(error){
                alert(error.message);
            }
    };
    const fetchDataAddCategory = async (name) => {
            try{
            const requestData = {
                        name: name
                    }
            const response = await fetch('http://localhost:8080/category/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  },
                  body: JSON.stringify(requestData),
                });
                var result = await response.json();
                if (result.response?.status === 401 || result.response?.status === 403) {
                        login(null);
                        navigate('/login');
                        return;
                }
                if(result.content.length !== 0){
                    alert(result.content);
                }else{
                    alert(result.error);
                }
            }catch(error){
                    alert(error.message);
            }
    };
    
    const fetchData = async (search) => {
            try{
            let link = 'http://localhost:8080/article/ready';
            if(search !== undefined){
                link += "/search?s=" + search;
            }
            const response = await fetch(link, {
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
                setReadyList(result);
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
            }
    };

    const fetchDataDeleteCategory = async (name) => {
            try{
            const requestData = {
                        name: name
                    }
            const response = await fetch('http://localhost:8080/category/delete', {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  },
                  body: JSON.stringify(requestData),
                });
                var result = await response.json();
                if (result.response?.status === 401 || result.response?.status === 403) {
                        login(null);
                        navigate('/login');
                        return;
                }
                if(result.content.length !== 0){
                    alert(result.content);
                }else{
                    alert(result.error);
                }
            }catch(error){
                alert(error.message);
            }
    };
                    
    const addCategory_onClick = () => {
        if(category.length === 0){
            alert("Строка названия не должна быть пустым");     return;
        }
        fetchDataAddCategory(category);                
    };
    const deleteCategory_onClick = () => {
        if(deleteCategory.length === 0){
            alert("Категория не выбрана");
            return;
        }
        fetchDataDeleteCategory(deleteCategory);                
    };
    const fetchChangeStatusItem = async (_id) => {
            try{
            const requestData = {
                        id: _id,
                        image: null,
                        name: '',
                        category: '',
                        content: ''
                    };
            const response = await fetch('http://localhost:8080/article/ready/save-publish', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                    body: JSON.stringify(requestData),
                });
                if(response.status === 401 || response.status === 403){
                    login(null);
                    navigate('/login');
                    return;
                }
                var result = await response.json();
                if(result.content.length !== 0){
                        alert(result.content);
                    }else{
                        alert(result.error);
                    }
                window.location.reload();
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
            }
        };
        const fetchReject = async (_id) => {
            try{
            const requestData = {
                        id: _id,
                        image: null,
                        name: '',
                        category: '',
                        content: ''
                    };
            const response = await fetch('http://localhost:8080/article/ready/reject', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                    body: JSON.stringify(requestData),
                });
                if(response.status === 401 || response.status === 403){
                    login(null);
                    navigate('/login');
                    return;
                }
                var result = await response.json();
                if(result.content.length !== 0){
                        alert(result.content);
                    }else{
                        alert(result.error);
                    }
                window.location.reload();
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
            }
        };
    useEffect(() => {
            fetchData(name);
        }, []);
    return(
        <div className="main-drafts-container">
            <div className="main-div-block">
                <h2>Готовые к публикации</h2>
                <p>./ Готовые к публикации / {name}</p>
                <div className="news-list">
                    <div className="news-drafts-container">
                     {readyList.length === 0 &&
                            <h3>Список пуст</h3>
                        }
                    {readyList.map((item) => (
                        <DraftsItem props={{
                                        id: item.id,
                                        name: item.name,
                                        link: "/redactor/article/" + item.id,
                                        delete_click: fetchReject,
                                        ready_click: fetchChangeStatusItem
                                }}/>
                        ))
                    }
                    </div>
                    <div className="help-panel">
                        <SearchInput props={{ link: "/redactor/"}}/>
                        <p>РАБОТА С КАТЕГОРИЕЙ</p>
                        <div className="help-cont">
                            <a href="#openModal"className="create-draft-button">Создать категорию</a>
                        </div>
                        <div className="help-cont">
                            <a href="#openDeleteModal" className="create-draft-button" onClick={fetchDataCategory}>Удалить категорию</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="openModal" className="modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Создание категории</h3>
                    <a href="#close" title="Close" className="close">×</a>
                  </div>
                  <div className="modal-body">    
                    <p><b>Название категории</b></p>
                    <input style={{width: '100%'}} onChange={event => setCategory(event.target.value)}/>
                    <a href="#close" className="submit-button" onClick={addCategory_onClick} >Добавить</a>
                  </div>
                </div>
              </div>
            </div>
            <div id="openDeleteModal" className="modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Удаление категории</h3>
                    <a href="#close" title="Close" className="close">×</a>
                  </div>
                  <div className="modal-body">    
                    <p><b>Выбрать категорию</b></p>
                    <select onChange={event => setDeleteCategory(event.target.value)} id="categories" className="select-category" style={{width: '100%'}}>
                      {categories.map((item) => (
                        <option value={item.name}>{item.name}</option>
                       ))}
                    </select>
                    <a href="#close" className="submit-button" onClick={deleteCategory_onClick}>Удалить</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}