import SearchInput from './HomeComponents/SearchInput.js'
import {DraftsItem} from './DraftComponents/DraftsItem.js'
import Catalog from './HomeComponents/Catalog.js'
import {useState, useEffect} from 'react'
import { useAuth } from '../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

export const Drafts = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { login } = useAuth();
    let { name } = useParams();
    
    const [draftList, setDraftList] = useState([]);
    const fetchData = async (search) => {
            try{
            let link = 'http://localhost:8080/article/reporter/drafts';
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
                setDraftList(result);
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
            }
        };
                    
    const fetchDeleteItem = async (_id) => {
            try{
            const response = await fetch('http://localhost:8080/article/reporter/draft?id=' + _id, {
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
        const fetchChangeStatusItem = async (_id) => {
            try{
            const response = await fetch('http://localhost:8080/article/reporter/draft/change-ready?id=' + _id, {
                  method: 'PUT',
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
                <h2>Черновики</h2>
                <p>./ Черновики / {name}</p>
                <div className="news-list">
                    <div className="news-drafts-container">
                        {draftList.length === 0 &&
                            <h3>Список черновиков пуст</h3>
                        }
                        {draftList.map((item) => (
                            <DraftsItem props={{
                                        id: item.id,
                                        name: item.name,
                                        link: /draft/ + item.id,
                                        delete_click: fetchDeleteItem,
                                        ready_click: fetchChangeStatusItem
                                }}/>
                            ))
                        }
                    </div>
                    <div className="help-panel">
                        <SearchInput props={{ link: "/drafts/"}}/>
                        <div className="">
                            <a href="/draft/new"className="create-draft-button">Создать статью</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}