import {useEffect, useState} from 'react'

const Catalog = ({children}) => {
    const [catalogs, setCatalogs] = useState([]);
        const fetchDataCategory = async () => {
            try{
            const response = await fetch('http://localhost:8080/category/list', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                var result = await response.json();
                setCatalogs(result);
            }catch(error){
                alert(error.message);
            }
        };
     useEffect(() => {
         fetchDataCategory();
     }, []);
    return(
    <div>
        <div className="catalog-name"><p>РАЗДЕЛЫ САЙТА</p></div>
        <ul id="menu_list">
                        {catalogs.map((item) => (
                            <li>
                                <a href={"/search/category/" + item.name} title={item.name}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
    </div>
)}
export default Catalog