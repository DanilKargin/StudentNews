import '../App.css'
import './css/NewsList.css'
import CatalogBar from './HomeComponents/CatalogBar.js'
import SearchInput from './HomeComponents/SearchInput.js'
import Catalog from './HomeComponents/Catalog.js'
import { TfiCalendar} from 'react-icons/tfi'
import text from './TestData/NewsText.js'
import { TfiComments} from 'react-icons/tfi'

const NewsRead = () => {
    
    return (
        <div>
            <CatalogBar/>
            <div className="main-div-block news-list">
                <div>
                    <h1>First test news name</h1>
                    <img className="news-img" src={require('./TestImages/Carousel-Img-1.webp')}/>
                    <p className="news-item-date"><TfiCalendar/><i>Откябрь 1, 2024</i></p>
                    <p>{text}</p>
                    <a href="/" className="comments-button"><TfiComments className="comments-icon"/>8</a>
                </div>
                <div className="help-panel">
                            <SearchInput/>
                            <Catalog/>
                </div>
            </div>
        </div>
    )
}
export default NewsRead