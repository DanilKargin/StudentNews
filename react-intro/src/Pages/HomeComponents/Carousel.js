import '../../App.css'
import '../css/Carousel.css'
import {useState, useEffect, Children, cloneElement} from 'react'
import { FaChevronLeft, FaChevronRight} from 'react-icons/fa'

export const Carousel =({children}) => {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    
    const handleLeftArrowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + 100
            return Math.min(newOffset, 0);
        })
    }
    const handleRightArrowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - 100
            const maxOffset = -(100 * (pages.length - 1))
            return Math.max(newOffset, maxOffset);
        })
    }
    useEffect(() => {
               setPages(
                   Children.map(children, child => {
                       return cloneElement(child, {
                        style: {
                           height: '100%',
                           minWidth: '100%',
                           maxWidth: '100%',
                       },
                    })
                   })
              )
               }, [])
    
    return (
        <div className="main-container">
            <div className="window">
                <div className="all-pages-container"
                style={{
                    transform: 'translateX(' + offset +'%)',    
                }}
                >{pages}</div>
            </div>
            <FaChevronLeft className="arrow arrow-left" onClick={handleLeftArrowClick}/>
            <FaChevronRight className="arrow arrow-right" onClick={handleRightArrowClick}/>
        </div>
    )
}