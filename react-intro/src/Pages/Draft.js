import {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {TfiPencil} from 'react-icons/tfi'

export const Draft = () => {
    const editorRef = useRef();
    const [login, setName] = useState("");
    const [photo, setPhoto] = useState(require('./TestImages/Camera.png'));
    
   const onChangePhoto = (event) => {
     if (event.target.files && event.target.files[0]) {
       setPhoto(URL.createObjectURL(event.target.files[0]));
     }
    }
    return(
        <div className="main-drafts-container">
            <div className="main-div-block"> 
                <h2>Черновик</h2>
                <h4>Заголовок:</h4>
                <input onChange={event => setName(event.target.value)} type="text"/>
                <h4>Фотография:</h4>
                <div className="draft-img-container">
                    <img className="draft-img" src={photo}/>
                    <div>
                        <label for="file"><TfiPencil/></label>
                        <input id="file" onChange={onChangePhoto} type="file" accepts=".jpg, .jpeg, .png"/>
                        
                    </div>
                </div>
                <Editor apiKey='350iwossgka6gpjd93uvechmucp9qka4p7tqv7ei79ikffa8'
                    onInit={ (evt, editor) => editorRef.current = editor}
                    init={{
                          menubar: false,
                         }}
                />
                <button className="submit-button" type="submit">Сохранить</button>
            </div>
        </div>
    )
}