import '../css/NewsList.css'
import { TfiCalendar} from 'react-icons/tfi'

const NewsListItem =({news}) => (
    <div className="news-item">
        <a href={news.link}><img className="news-img" src={require('../TestImages/Carousel-Img-1.webp')}/></a>
        <p className="news-item-date"><TfiCalendar/><i>{news.date}</i></p>
        
        <a className="news-item-name" href={news.link} ><h2>{news.name}</h2></a>
        <p>{news.description}</p>
    </div>
)
export default NewsListItem