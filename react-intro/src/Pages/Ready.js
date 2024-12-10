import {useRef, useState, useEffect} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {TfiPencil} from 'react-icons/tfi'
import { useAuth } from '../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import './css/NewsList.css'

export const Ready = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { login } = useAuth(); 
    let { id } = useParams();
    
    const [catalogs, setCatalogs] = useState([]);
    const editorRef = useRef();
    
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(require('./TestImages/Camera.png'));
    const [photoByte, setPhotoByte] = useState(null);
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [a_id, setA_id] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorImg, setAuthorImg] = useState('');
    
    const fetchDataCategory = async () => {
            try{
            const response = await fetch('http://localhost:8080/category/list', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                var result = await response.json();
                setCatalogs(result);
            }catch(error){
                alert(error.message);
            }
        };
    const fetchDataLoad = async (draft_id, draft_category) => {
            try{
            const response = await fetch('http://localhost:8080/article/ready-get?id=' + draft_id, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                })
                if(response.status === 401 || response.status === 403){
                    login(null);
                    navigate('/login');
                    return;
                }
                var result = await response.json();
                setPhoto(`data:image/png;base64, ${result.image}`);
                setName(result.name);
                setCategory(result.category);
                setContent(result.content);
                setA_id(result.id);
                setAuthorName(result.userName); setAuthorImg(`data:image/png;base64,${result.userImage}`)
            }catch(error){
                if (error.response?.status === 401 ) {
                    login(null);
                    navigate('/login');
                  }
                    alert(error.message);
            }
        };
    const fetchSendToPublication = async (_id, _name, _img, _content, _category) => {
            try{
            const requestData = {
                        id: _id,
                        image: _img,
                        name: _name,
                        category: _category,
                        content: _content
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
     useEffect(() => {
         fetchDataCategory();
         fetchDataLoad(id);
     },[]);
   const onChangePhoto = (event) => {
               const file = event.target.files[0]; // Получаем первый выбранный файл
                if (file) {
                    setPhoto(URL.createObjectURL(event.target.files[0]));
                    const reader = new FileReader();

                    // Читаем файл как массив байтов
                    reader.readAsArrayBuffer(file);

                    reader.onload = function(e) {
                        const arrayBuffer = e.target.result;
                        const byteArray = Array.from(new Uint8Array(arrayBuffer));                     
                        setPhotoByte(byteArray);
                    };

                    reader.onerror = function() {
                        console.error("Ошибка при чтении файла");
                    };
                }
            }
   const save_onClick = () => {
       fetchSendToPublication(a_id, name, photoByte, editorRef.current.getContent(), category);
       navigate('/redactor')
   }
    return(
        <div className="main-drafts-container">
            <div className="main-div-block"> 
                <h2>Черновик</h2>
                <h4>Заголовок:</h4>
                <input value={name} onChange={event => setName(event.target.value)} type="text"/>
                <h4>Фотография:</h4>
                <div className="draft-img-container">
                    <img className="draft-img" src={photo}/>
                    <div>
                        <label for="file"><TfiPencil/></label>
                        <input id="file" onChange={onChangePhoto} type="file" accepts=".jpg, .jpeg, .png"/>
                    </div>
                </div>
                <h4>Категория:</h4>
                <select value={category} onChange={event => setCategory(event.target.value)} className="select-category" >
                  {catalogs.map((item) => (
                    <option value={item.name}>{item.name}</option>
                   ))}
                </select>
                <h4>Автор:</h4>
                <div className="author-box">
                        <img className="author-img" src={authorImg}/>
                        <div className="author-text">{authorName}</div>
                    </div>
                <Editor apiKey='350iwossgka6gpjd93uvechmucp9qka4p7tqv7ei79ikffa8'
                    onInit={ (evt, editor) => editorRef.current = editor}
                    initialValue={content}
                    init={{
                          menubar: false,
                         }}
                />
                <button onClick={save_onClick} className="submit-button" type="submit">Отправить на публикацию</button>
            </div>
        </div>
    )
}