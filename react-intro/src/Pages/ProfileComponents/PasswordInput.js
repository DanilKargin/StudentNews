import '../css/Profile.css'
import {useState} from 'react'
import { TfiClose, TfiPencil} from 'react-icons/tfi'

const PasswordInput = ({props}) => {
    const [value, setValue] = useState(props.text);
    const [tempValue, setTempValue] = useState("");
    const [tempValue2, setTempValue2] = useState("");
    
    const [visibility_a, setVisibility_a] = useState("block");
    const [visibility_input, setVisibility_input] = useState("none");
    
    const [errorLabel, setErrorLabel] = useState("Неккоректный формат");
    const [visibility_error, setVisibility_error] = useState("none");
    
    const inputOpenOnClick = () => {
        setTempValue("");
        setTempValue2("");
        setValue("");
        setVisibility_error("none");
        setVisibility_input("block");
        setVisibility_a("none");
    }
    const inputCloseOnClick = () => {
        setVisibility_input("none");
        setVisibility_a("block");
    }
    const saveText = () => {
        if(tempValue !== tempValue2){
            setVisibility_error("block");
            setErrorLabel("Пароли не совпадают");
        }else if(!props.regex.test(tempValue)){
            setVisibility_error("block");
            setErrorLabel("Слишком простой пароль");   
        }else{
            setVisibility_input("none");
            setVisibility_a("block");
            props.setData(tempValue);
        }
    }
    
    return(
        <div className="input-block">
            <h3>{props.header}</h3>
            <div style={{display: visibility_a }}>
                <div className="input-block-edit">
                    <a style={{width:"100%"}} onClick={inputOpenOnClick}>{props.text}</a>
                    <a style={{textAlign:"right"}} onClick={inputOpenOnClick}><TfiPencil/></a>
                </div>
            </div>
            <div style={{display: visibility_input }}>
                <label className="error-label" style={{display: visibility_error}}>*{errorLabel}</label>
                <div className="input-block-edit" >
                    <input 
                        type={props.type}
                        value={tempValue}
                        placeholder={'Введите пароль...'}
                        onChange={event => setTempValue(event.target.value)}
                        />
                    <input
                        type={props.type}
                        value={tempValue2}
                        placeholder={'Подтвердите пароль...'}
                        onChange={event => setTempValue2(event.target.value)}
                        />
                    <a style={{textAlign:"right"}} onClick={inputCloseOnClick}><TfiClose/></a>
                </div>
                <button onClick={saveText} style={{marginTop: "2vh"}}>СОХРАНИТЬ</button>
            </div>
        </div>
        )
}
export default PasswordInput