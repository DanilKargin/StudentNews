import '../css/Drafts.css'
import {TfiPencil, TfiNa} from 'react-icons/tfi'

export const DraftsItem = ({props}) => {
    
    
    return(
        <div className="drafts-item">
            <div className="drafts-item-container">
                <h2>{props.name}</h2>
                <a href="/" className="tfi-icon">
                    <TfiPencil/>
                </a>
                <a href="./" className="tfi-icon">
                    <TfiNa/>
                </a>
            </div>
        </div>
    )
}