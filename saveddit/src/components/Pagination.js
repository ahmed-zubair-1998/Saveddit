import React, { useEffect, useState } from 'react'


const PageList = ({currentPage, setCurrentPage, pages}) => {
    const pageListSize = 7

    const handleClick = pageNumber => {
        if(pageNumber === currentPage) return
        setCurrentPage(pageNumber)
    }

    const range = (start, end) => {
        if(!end || start === end) return [start]
        return [start, ...range(start+1, end)]
    }


    if(pages === 1){
        return (
            <button onClick={() => handleClick(1)}>1</button>
        )
    }
    if(pages <= pageListSize){
        return (
            <span>
                {
                    range(1, pages).map(pageNumber => {
                        return (
                            <button key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
            </span>
        )
    }
    if(currentPage > 4 && currentPage < (pages-3)){
        return (
            <span>
                <button onClick={() => handleClick(1)}>1</button>
                <button>...</button>
                {
                    range(currentPage-1, currentPage+1).map(pageNumber => {
                        return (
                            <button key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
                <button>...</button>
                <button onClick={() => handleClick(pages)}>{pages}</button>
            </span>   
        )
    }
    if(currentPage < 5){
        return (
            <span>
                {
                    range(1, 5).map(pageNumber => {
                        return(
                            <button key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
                <button>...</button>
                <button onClick={() => handleClick(pages)}>{pages}</button>
            </span>
        )
    }
    if(currentPage > (pages-4)){
        return (
            <span>
                <button onClick={() => handleClick(1)}>1</button>
                <button>...</button>
                {
                    range(pages-4, pages).map(pageNumber => {
                        return (
                            <button key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
            </span>
        )
    }
}


const PageIndex = (props) => {
    const handlePrevClick = () => {
        if(props.currentPage-1 === 0){
            return
        }
        props.setCurrentPage(props.currentPage - 1)
    }

    const handleNextClick = () => {
        if(props.currentPage+1 > props.pages){
            return
        }
        props.setCurrentPage(props.currentPage + 1)
    }

    return (
        <div>
            <div>
                <span>
                    <button onClick={handlePrevClick}>Prev</button>
                    <PageList
                        currentPage={props.currentPage}
                        setCurrentPage={props.setCurrentPage}
                        pages={props.pages}
                    />
                    <button onClick={handleNextClick}>Next</button>
                </span>
            </div>
            <span>Current Page: {props.currentPage}</span>
        </div>
    )
}

const List = ({list}) => {
    return (
        <ul>
            {
                list.map(post => {
                    return (
                        <li key={post.url}>
                            <h4>{post.title}</h4>
                            <p>{post.text}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const Pagination = ({list}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentList, setCurrentList] = useState([])

    const listSize = list.length
    const pageSize = 10
    const pages = Math.ceil(listSize / pageSize)
    
    useEffect(() => {
        const startingIndex = pageSize * (currentPage - 1)
        const endingIndex = pageSize * currentPage
        setCurrentList(
            list.filter((item, idx) => {
                if(idx >= startingIndex && idx < endingIndex){
                    return item
                }
            })
        )
    }, [currentPage])

    useEffect(() => {
        const startingIndex = pageSize * (currentPage - 1)
        const endingIndex = pageSize * currentPage
        setCurrentList(
            list.filter((item, idx) => {
                if(idx >= startingIndex && idx < endingIndex){
                    return item
                }
            })
        )
        setCurrentPage(1)
    }, [list])

    return(
        <div>
            <List list={currentList} />
            <PageIndex
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default Pagination
