import {Children} from 'react'
import '../../App.css'
import '../css/Carousel.css'

const CarouselItem = ({news}) => (
    <div className="carousel-news-data">
        <h1>{news.name}</h1>
        
        <h3>{news.description}</h3>
        <a href={news.link}>Читать</a>
        <h3><b><i>{news.date}</i></b></h3>
    </div>
);
export default CarouselItem