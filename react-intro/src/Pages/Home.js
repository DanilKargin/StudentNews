import rect, {Component} from 'react'
import CatalogBar from './HomeComponents/CatalogBar'
import {Carousel} from './HomeComponents/Carousel.js'
import '../App.css'
import CarouselItem from './HomeComponents/CarouselItem.js'
import NewsListItem from './HomeComponents/NewsListItem.js'
import SearchInput from './HomeComponents/SearchInput.js'
import Catalog from './HomeComponents/Catalog.js'

export default class Home extends Component {
    render(){
        return(
            <div>
                <CatalogBar/>
                <div className="main-div-block">
                    <Carousel>
                        <div className="item item-1" >
                            <CarouselItem news={{
                                name:'First test news name',
                                description:'Some description',
                                link:'news/1',
                                date:'Октябрь 3, 2024'
                            }}/>
                        </div>
                        <div className="item item-2" >
                            <CarouselItem news={{
                                name:'Second test news name',
                                description:'Some description',
                                link:'news/1',
                                date:'Октябрь 2, 2024'
                            }}/>
                        </div>
                        <div className="item item-3" >
                            <CarouselItem news={{
                                name:'Third test news name',
                                description:'Some description',
                                link:'news/1',
                                date:'Октябрь 1, 2024'
                            }}/>
                        </div>
                    </Carousel>
                    <h1>Новостная лента</h1>
                    <div className="news-list">
                        <div className="news-list-container">
                            <NewsListItem news={{
                                    name:'First test news name',
                                    description:'Some description',
                                    link:'news/1',
                                    date:'Октябрь 1, 2024',
                                    img: './TestImages/Carousel-Img-1.webp'
                                }}/>
                            <NewsListItem news={{
                                    name:'Second test news name',
                                    description:'Some description',
                                    link:'news/1',
                                    date:'Октябрь 1, 2024',
                                    img: './TestImages/Carousel-Img-1.webp'
                                }}/>
                            <NewsListItem news={{
                                    name:'Third test news name',
                                    description:'Some description',
                                    link:'news/1',
                                    date:'Октябрь 1, 2024',
                                    img: './TestImages/Carousel-Img-1.webp'
                                }}/>
                            <NewsListItem news={{
                                    name:'Fourth test news name',
                                    description:'Some description',
                                    link:'news/1',
                                    date:'Октябрь 1, 2024',
                                    img: './TestImages/Carousel-Img-1.webp'
                                }}/>
                            <NewsListItem news={{
                                    name:'Fifth test news name',
                                    description:'Some description',
                                    link:'news/1',
                                    date:'Октябрь 1, 2024',
                                    img: './TestImages/Carousel-Img-1.webp'
                                }}/>
                            <NewsListItem news={{
                                    name:'Sixth test news name',
                                    description:'Some description',
                                    link:'news/1',
                                    date:'Октябрь 1, 2024',
                                    img: './TestImages/Carousel-Img-1.webp'
                                }}/>
                        </div>
                        <div className="help-panel">
                            <SearchInput/>
                            <Catalog/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}