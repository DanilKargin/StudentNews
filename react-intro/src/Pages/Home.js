import rect, {Component, useEffect, useState} from 'react'
import CatalogBar from './HomeComponents/CatalogBar'
import {Carousel} from './HomeComponents/Carousel.js'
import '../App.css'
import CarouselItem from './HomeComponents/CarouselItem.js'
import NewsListItem from './HomeComponents/NewsListItem.js'
import SearchInput from './HomeComponents/SearchInput.js'
import Catalog from './HomeComponents/Catalog.js'
import { useNavigate } from 'react-router-dom';
import './css/NewsList.css'
import { TfiCalendar} from 'react-icons/tfi'

export const Home = () => {
        const [newsList, setNewsList] = useState([]);
    
        const fetchData = async () => {
            try{
            const response = await fetch('http://localhost:8080/article/publications', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                var result = await response.json();
                setNewsList(result);
            }catch(error){
                    alert(error.message);
            }
        };
        useEffect(() => {
            fetchData();
        }, []);
    
        return(
            <div>
                <CatalogBar/>
                <div className="main-div-block">
                    <Carousel>
                            <div className="item item-1" >
                                <CarouselItem news={{
                                    name: "П",
                                    description:'Some description',
                                    link:'news/1',
                                    date: "П"
                                }}/>
                            </div>
                    </Carousel>
                    <h1>Новостная лента</h1>
                    <div className="news-list">
                        <div id="news-list" className="news-list-container">
                            {newsList.map((item) => (
                                <NewsListItem news={{
                                    name: item.name,
                                    description:'Some description',
                                    link:'/news/' + item.id,
                                    date: item.create_date,
                                    img: `data:image/png;base64,${item.image}`
                                }}/>
                            ))}
                        </div>
                        <div className="help-panel">
                            <SearchInput props={{link: "/search/name/"}}/>
                            <Catalog/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
}