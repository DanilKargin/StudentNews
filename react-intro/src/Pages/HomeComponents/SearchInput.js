import { TfiSearch} from 'react-icons/tfi'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const SearchInput = ({props}) => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const search_onClick =() =>{
        if(value.length ===0){
            alert("Строка не должна быть пустой");
            return;
        }
        const link = props.link + value;
        console.log(props.link);
        navigate(link);
    }
    return(
    <form>
        <p>ПОИСК</p> 
        <div style={{
            position: 'relative',
            width: '100%',
            marginBottom: '50px',
        }}>
            <input onChange={event => setValue(event.target.value)} placeholder="Поиск по ленте..." style={{width: '100%'}}/>
            <button type="submit" onClick={search_onClick} className="search-button"><TfiSearch className="search-icon"/></button>
        </div>
    </form>
)}

export default SearchInput