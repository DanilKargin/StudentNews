import '../css/Profile.css'
import {useState} from 'react'
import { TfiClose, TfiPencil} from 'react-icons/tfi'

const CustomInput = ({props}) => {
    const [value, setValue] = useState(props.text);
    const [tempValue, setTempValue] = useState("");
    
    const [visibility_a, setVisibility_a] = useState("block");
    const [visibility_input, setVisibility_input] = useState("none");
    
    const [errorLabel, setErrorLabel] = useState("Неккоректный формат");
    const [visibility_error, setVisibility_error] = useState("none");
    
    const inputOpenOnClick = () => {
        setTempValue("");
        setVisibility_error("none");
        setVisibility_input("block");
        setVisibility_a("none");
    }
    const inputCloseOnClick = () => {
        setVisibility_input("none");
        setVisibility_a("block");
    }
    const saveText = () => {
        if(tempValue.length === 0){    
            setVisibility_error("block");
            setErrorLabel("Строка не должна быть пустой");
        }else if(tempValue.length >= 20){
            setVisibility_error("block");
            setErrorLabel("Максимальный размер строки не более 20 символов");
        }else if(!props.regex.test(tempValue)){
            setVisibility_error("block");
            setErrorLabel("Неккоректный формат")
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
                        placeholder={props.label}
                        onChange={event => setTempValue(event.target.value)}
                        />
                    <button onClick={saveText} style={{textAlign:"right"}}>СОХРАНИТЬ</button>
                    <a style={{textAlign:"right"}} onClick={inputCloseOnClick}><TfiClose/></a>
                </div>
            </div>
        </div>
        )
}
export default CustomInput