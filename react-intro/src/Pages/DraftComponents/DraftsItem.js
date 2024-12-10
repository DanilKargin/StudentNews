import '../css/Drafts.css'
import {TfiPencil, TfiNa, TfiCheck} from 'react-icons/tfi'

export const DraftsItem = ({props}) => {
    
    const delete_onClick = () => {
        const confirmBox = window.confirm(
              "Вы уверены в том, что хотите удалить черновик '"+ props.name +"'?"
            )
            if (confirmBox === true) {
                props.delete_click(props.id);
            }
    }
    const sendCheck_onClick = () => {
        const confirmBox = window.confirm(
              "Вы уверены в том, что хотите отправить черновик '"+ props.name +"' на проверку?"
            )
            if (confirmBox === true) {
                props.ready_click(props.id);
            }
    }
    return(
        <div className="drafts-item">
            <div className="drafts-item-container">
                <h2>{props.name}</h2>
                <a href="#" onClick={sendCheck_onClick} className="tfi-icon">
                    <TfiCheck/>
                </a>
                <a href={props.link} className="tfi-icon">
                    <TfiPencil/>
                </a>
                <a href="#" onClick={delete_onClick} className="tfi-icon">
                    <TfiNa/>
                </a>
            </div>
        </div>
    )
}