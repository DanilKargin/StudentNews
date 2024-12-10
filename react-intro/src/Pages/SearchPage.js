import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import CatalogBar from './HomeComponents/CatalogBar'
import NewsListItem from './HomeComponents/NewsListItem.js'
import SearchInput from './HomeComponents/SearchInput.js'
import Catalog from './HomeComponents/Catalog.js'

export const SearchPage = (props) => {
        const [newsList, setNewsList] = useState([]);
        let { text } = useParams();
        let { type } = useParams();
        const fetchData = async (name, search_type) => {
            try{
            const response = await fetch('http://localhost:8080/article/publications/'+search_type+'?s='+ name, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                var result = await response.json();
                setNewsList(result);
            }catch(error){
                    alert(error.message);
            }
        };
        useEffect(() => {
            fetchData(text, type);
        }, []);
    
        return(
            <div>
                <CatalogBar/>
                <div className="main-div-block">
                    <h2>Результат поиска</h2>
                    <p>./ Главная / <i>{text}</i></p>
                    <div className="news-list">
                        <div id="news-list" className="news-list-container">
                        {newsList.length === 0 &&
                                <h3>По вашему запросу ничего не найдено</h3>
                        }
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
                            <SearchInput/>
                            <Catalog/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
}