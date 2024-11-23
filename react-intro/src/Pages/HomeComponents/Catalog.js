

const Catalog = ({children}) => (
    <div>
        <div className="catalog-name"><p>РАЗДЕЛЫ САЙТА</p></div>
        <ul id="menu_list">
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
)
export default Catalog