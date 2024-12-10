

export const CommentItem = ({props}) => {
    
    return(
        <div className="comment-item">
            <img src={`data:image/png;base64,${props.img}`} className="author-img"/>
            <div>
                <div>
                    <b>{props.name} </b>
                    {new Date(props.date).toLocaleString()}
                </div>
                {props.comment}
            </div>
        </div>
    )
}