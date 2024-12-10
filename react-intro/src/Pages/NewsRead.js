import '../App.css'
import './css/NewsList.css'
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import CatalogBar from './HomeComponents/CatalogBar.js'
import SearchInput from './HomeComponents/SearchInput.js'
import Catalog from './HomeComponents/Catalog.js'
import { TfiCalendar} from 'react-icons/tfi'
import text from './TestData/NewsText.js'
import { TfiComments} from 'react-icons/tfi'
import {CommentItem} from './HomeComponents/CommentItem.js'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const NewsRead = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { login } = useAuth(); 
    
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsVisibility, setCommentsVisibility] = useState("none");
    const [comment, setComment] = useState("");
    let { id } = useParams();
    
    const fetchData = async (search_id) => {
            try{
            const response = await fetch('http://localhost:8080/article/publication?id='+ search_id, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                var result = await response.json();
                setNews(result);
            }catch(error){
                    alert(error.message);
            }
        };
        const fetchDataCommentsLoad = async (article_id) => {
            try{
            const response = await fetch('http://localhost:8080/comment/list?id='+ article_id, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                var result = await response.json();
                setComments(result);
            }catch(error){
                    alert(error.message);
            }
        };
        const fetchDataSendComment = async (commentValue, article_id) => {
            try{
            const request = {
                comment: commentValue,
                article_id: article_id
            }
            const response = await fetch('http://localhost:8080/comment/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  },
                    body: JSON.stringify(request),
                });
                if(response.status === 401){
                    login(null);
                    navigate('/login');
                }
                var result = await response.json();
                if(result.error.length !== 0){
                    alert(result.error.length);
                }
            }catch(error){
                    alert(error.message);
            }
        };
        useEffect(() => {
            fetchData(id);
        }, []);
    
        useEffect(() => {
            if(news !== null){
                const block = document.getElementById("content");
                block.innerHTML = news.content;
            }
        }, [news]);
        const comments_onClick = () => {
            if(commentsVisibility === "none"){
                fetchDataCommentsLoad(id);
                setCommentsVisibility("block");
            }else{
                setCommentsVisibility("none");
            }
        }
        const commentSend_onClick = () => {
            if(comment.length === 0){
                alert("Строка не должна быть пустой");
            }else{
                fetchDataSendComment(comment, id);
            }
        }
    
    return (
        <div>
            <CatalogBar/>
            <div className="main-div-block news-list">
                {news !== null &&
                <div>
                    <p>./ Главаная / {news.category} / <i>{news.name}</i></p>
                    <h1>{news.name}</h1>
                    <img className="news-img-read" src={`data:image/png;base64,${news.image}`}/>
                    <p className="news-item-date"><TfiCalendar/><i>{new Date(news.create_date).toLocaleString()}</i></p>
                    <div id="content"></div>
                    <p><b>Автор статьи:</b></p>
                    <div className="author-box">
                        <img className="author-img" src={`data:image/png;base64,${news.userImage}`}/>
                        <div className="author-text">{news.userName}</div>
                    </div>
                    <a onClick={comments_onClick} className="comments-button"><TfiComments className="comments-icon"/></a>
                    <div style={{display: commentsVisibility}} className="commentsBlock">
                        <h3>Комментарии:</h3>
                        {comments.length === 0 && 
                            <p>Будь первым кто оставит комментарий к данной статье.</p>
                        }
                        {comments.map((item) => (
                            <CommentItem props={{
                                comment: item.comment,
                                img: item.userImage,
                                name: item.userName,
                                date: item.create_date
                            }}/>  
                        ))
                        }
                        <div className="input-comments-block">
                            <h4>Написать комментарий:</h4>
                            <input placeholder="Написать комментарий..." onChange={(event) => setComment(event.target.value)}/>
                            <button onClick={commentSend_onClick}>Отправить</button>
                        </div>
                    </div>
                </div>
                }
                <div className="help-panel">
                            <SearchInput/>
                            <Catalog/>
                </div>
            </div>
        </div>
    )
}
export default NewsRead