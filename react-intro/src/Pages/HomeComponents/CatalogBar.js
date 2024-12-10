import React, {Component, useEffect, useState} from 'react'

const CatalogBar = () => {
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
            <nav>
                <div className="main-div-block">
                    <ul id="menu_list" className="category-list">
                        {catalogs.map((item) => (
                            <li>
                                <a href={"/search/category/"+ item.name} title={item.name}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
    );
}
export default CatalogBar;