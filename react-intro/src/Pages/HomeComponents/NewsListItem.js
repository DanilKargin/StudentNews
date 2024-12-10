import '../css/NewsList.css'
import { TfiCalendar} from 'react-icons/tfi'

const NewsListItem =({news}) => (
    <div className="news-item">
        <a href={news.link}><img className="news-img" src={news.img}/></a>
        <p className="news-item-date"><TfiCalendar/><i>{new Date(news.date).toLocaleString()}</i></p>
        
        <a className="news-item-name" href={news.link} ><h2>{news.name}</h2></a>
    </div>
)
export default NewsListItem