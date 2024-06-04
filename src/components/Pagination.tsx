import { Link, useLocation } from 'react-router-dom'

const FirstPagination = ({ currentPage }: { currentPage: number }) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  if (currentPage === 1) {
    return <li className='pagination__item current'>1</li>
  } else {
    query.set('page', '1')
    return <Link className='pagination__item' to={`?${query.toString()}`}>1</Link>
  }
}

const FirstDot = (
  { currentPage, lastPage }: { currentPage: number; lastPage: number },
) => {
  if (lastPage < 4 || currentPage < 3) {
    return null
  }

  return (
    <>
      <div className='pagination__item dot'>
        <svg viewBox='0 0 31 4' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='2' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='11' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='20' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='29' cy='2' r='2' fill='#D9D9D9' />
        </svg>
      </div>
    </>
  )
}

const CenterPaginationItems = (
  { currentPage, lastPage }: { currentPage: number; lastPage: number },
) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  if (lastPage < 3) {
    return null
  }

  const paginationNumbers = [currentPage - 1, currentPage, currentPage + 1].filter((item) =>
    item > 1 && item < lastPage
  )

  return (
    <>
      {paginationNumbers.map((item) => {
        if (item === currentPage) {
          return <li key={item} className='pagination__item current'>{item}</li>
        } else {
          query.set('page', item.toString())
          return <Link key={item} className='pagination__item' to={`?${query.toString()}`}>{item}</Link>
        }
      })}
    </>
  )
}

const LastDot = (
  { currentPage, lastPage }: { currentPage: number; lastPage: number },
) => {
  if (lastPage < 4 || ((currentPage + 1) === lastPage || currentPage === lastPage)) {
    return null
  }

  return (
    <>
      <div className='pagination__item dot'>
        <svg viewBox='0 0 31 4' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='2' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='11' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='20' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='29' cy='2' r='2' fill='#D9D9D9' />
        </svg>
      </div>
    </>
  )
}

const LastPagination = ({ currentPage, lastPage }: { currentPage: number; lastPage: number }) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  if (lastPage === 1) {
    return null
  }

  if (currentPage === lastPage) {
    return <li className='pagination__item current'>{lastPage}</li>
  } else {
    query.set('page', lastPage.toString())
    return <Link className='pagination__item' to={`?${query.toString()}`}>{lastPage}</Link>
  }
}

const Pagination = ({ currentPage, lastPage }: { currentPage: number; lastPage: number }) => {
  return (
    <ol className='pagination' aria-label='ページャー'>
      <FirstPagination currentPage={currentPage} />
      <FirstDot currentPage={currentPage} lastPage={lastPage} />
      <CenterPaginationItems currentPage={currentPage} lastPage={lastPage} />
      <LastDot currentPage={currentPage} lastPage={lastPage} />
      <LastPagination currentPage={currentPage} lastPage={lastPage} />
    </ol>
  )
}

export default Pagination
