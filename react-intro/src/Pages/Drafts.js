import SearchInput from './HomeComponents/SearchInput.js'
import {DraftsItem} from './DraftComponents/DraftsItem.js'
import Catalog from './HomeComponents/Catalog.js'

export const Drafts = () => {
    
    return(
        <div className="main-drafts-container">
            <div className="main-div-block">
                <h2>Черновики</h2>
                <div className="news-list">
                    <div className="news-drafts-container">
                        <DraftsItem props={{
                                    name: "First test draft name",
                            }}/>
                        <DraftsItem props={{
                                    name: "Second test draft name",
                            }}/>
                        <DraftsItem props={{
                                    name: "Third test draft name",
                            }}/>
                    </div>
                    <div className="help-panel">
                        <SearchInput/>
                        <div className="">
                            <a href="/drafts/1"className="create-draft-button">Создать статью</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}