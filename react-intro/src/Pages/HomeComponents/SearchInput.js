import { TfiSearch} from 'react-icons/tfi'

const SearchInput =() => (
    <div>
        <p>ПОИСК</p> 
        <div style={{
            position: 'relative',
            width: '100%',
            marginBottom: '50px',
        }}>
            <input placeholder="Поиск по ленте..." style={{width: '100%'}}/>
            <a href='./'><TfiSearch className="search-icon"/></a>
        </div>
    </div>
)

export default SearchInput