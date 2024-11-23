import React from 'react'

const CatalogBar =() => (
            <nav>
                <div className="main-div-block">
                    <ul id="menu_list" className="category-list">
                        <li>
                            <a href="./education" title="Образование">Образование</a>
                        </li>
                        <li>
                            <a href="./economic" title="Экономика">Экономика</a>
                        </li>
                        <li>
                            <a href="./tech" title="Технологии">Технологии</a>
                        </li>
                    </ul>
                </div>
            </nav>
    );
export default CatalogBar;