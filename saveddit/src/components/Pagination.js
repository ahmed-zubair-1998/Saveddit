import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga';

import Post from './Post'


const PageList = ({ currentPage, setCurrentPage, pages, moveToTop }) => {
    const pageListSize = 7

    const handleClick = pageNumber => {
        if (pageNumber === currentPage) return
        setTimeout(moveToTop, 300)
        setCurrentPage(pageNumber)
    }

    const range = (start, end) => {
        if (!end || start === end) return [start]
        return [start, ...range(start + 1, end)]
    }


    if (pages === 1) {
        return (
            <button className="paginator-button" onClick={() => handleClick(1)}>1</button>
        )
    }
    if (pages <= pageListSize) {
        return (
            <div className="space-x-1 sm:space-x-2">
                {
                    range(1, pages).map(pageNumber => {
                        return (
                            <button className="paginator-button" key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
            </div>
        )
    }
    if (currentPage > 4 && currentPage < (pages - 3)) {
        return (
            <div className="space-x-2">
                <button className="paginator-button" onClick={() => handleClick(1)}>1</button>
                <button className="paginator-button cursor-not-allowed">...</button>
                {
                    range(currentPage - 1, currentPage + 1).map(pageNumber => {
                        return (
                            <button className="paginator-button" key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
                <button className="paginator-button cursor-not-allowed">...</button>
                <button className="paginator-button" onClick={() => handleClick(pages)}>{pages}</button>
            </div>
        )
    }
    if (currentPage < 5) {
        return (
            <div className="space-x-2">
                {
                    range(1, 5).map(pageNumber => {
                        return (
                            <button className="paginator-button" key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
                <button className="paginator-button cursor-not-allowed">...</button>
                <button className="paginator-button" onClick={() => handleClick(pages)}>{pages}</button>
            </div>
        )
    }
    if (currentPage > (pages - 4)) {
        return (
            <div className="space-x-1 sm:space-x-2">
                <button className="paginator-button" onClick={() => handleClick(1)}>1</button>
                <button className="paginator-button cursor-not-allowed">...</button>
                {
                    range(pages - 4, pages).map(pageNumber => {
                        return (
                            <button className="paginator-button" key={pageNumber} onClick={() => handleClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        )
                    })
                }
            </div>
        )
    }
}


const PageIndex = (props) => {
    const handlePrevClick = () => {
        if (props.currentPage - 1 === 0) {
            return
        }
        props.setCurrentPage(props.currentPage - 1)
    }

    const handleNextClick = () => {
        if (props.currentPage + 1 > props.pages) {
            return
        }
        props.setCurrentPage(props.currentPage + 1)
    }

    return (
        <div className="flex flex-col items-center py-4 space-y-2">
            <div className="flex items-center space-x-2 sm:mx-4 my-2 text-gray-700">
                <button className="rounded-full sm:p-2 p-1 bg-red-300 hover:bg-red-400 hover:text-blue-0 font-semibold fill-current" onClick={handlePrevClick}>
                    <svg className="h-6 w-6" viewBox="0 0 20 20">
                        <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                    </svg>
                </button>
                <PageList
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}
                    pages={props.pages}
                    moveToTop={props.moveToTop}
                />
                <button className="rounded-full sm:p-2 p-1 bg-red-300 hover:bg-red-400 hover:text-blue-0 font-semibold fill-current" onClick={handleNextClick}>
                    <svg className="h-6 w-6" viewBox="0 0 20 20">
                        <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
                    </svg>
                </button>
            </div>

            <div className="font-bold">
                Current Page: {props.currentPage}
            </div>
        </div>
    )
}


const List = ({ list }) => {
    return (
        <div className="Posts">
            {list.map(post => <Post post={post} key={post.url} />)}
        </div>
    )
}


const Pagination = ({ list, moveToTop }) => {
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
                if (idx >= startingIndex && idx < endingIndex) {
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
                if (idx >= startingIndex && idx < endingIndex) {
                    return item
                }
            })
        )
        setCurrentPage(1)
    }, [list])

    const changePage = (pageNum) => {
        ReactGA.event({
            category: 'Page Change',
            action: 'Change Current Page',
            label: pageNum.toString()
        });

        setCurrentPage(pageNum)
    }


    return (
        <div>
            <List list={currentList} />
            <PageIndex
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={changePage}
                moveToTop={moveToTop}
            />
            <button onClick={moveToTop}>Go To Top</button>
        </div>
    )
}

export default Pagination
