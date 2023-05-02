import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { resultsCountTotalAtom, selectModeAtom } from '../store/store'
import { useSearchParams } from 'react-router-dom'

const SearchForm = () => {
  const countTotal = useAtomValue(resultsCountTotalAtom)
  const [orderBy, setOrderBy] = useState('dateCreated')
  const selectMode = useAtomValue(selectModeAtom)
  useEffect(() => {
    setOrderBy('dateCreated')
  }, [selectMode])

  const [order, setOrder] = useState<'asc'|'desc'>('desc')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const searchParamsOrder = searchParams.get('sort')?.slice(-1)
    let sortOrder = ''
    if (searchParamsOrder === '+') {
      sortOrder = 'asc'
    } else if (searchParamsOrder === '-') {
      sortOrder = 'desc'
    }
    if (sortOrder !== '' && sortOrder !== order) {
      setOrder(sortOrder as 'asc'|'desc')
    }

    const sortBy = searchParams.get('sort')?.slice(0, -1)
    if (sortBy && sortBy !== orderBy) {
      setOrderBy(sortBy)
    }
  }, [order, orderBy, searchParams])

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queries: {[key: string]: string} = {}
    searchParams.delete('q')
    for (const [key, value] of searchParams.entries()) {      
      queries[key] = value
    }
    console.log(e.currentTarget.value)
    if (e.currentTarget.value) {
      queries['q'] = e.currentTarget.value
    }
    setSearchParams(queries)
  }

  const sortKeyValues = useMemo(() => {
    const sorts = [
      {key: 'dateCreated', value: 'Date Created'},
      {key: 'dateModified', value: 'Date Modified'},
      {key: 'datePublished', value: 'Date Published'},
      // {key: '_annotation.date_size', value: 'Data Size'},→→ ElasticSearchで数値に変更しないと対応できない
    ]
    if (selectMode === 'project') {
      sorts.push({key: 'identifier.keyword', value: 'Project ID'})
    } else if (selectMode === 'genome') {
      sorts.push({key: 'identifier.keyword', value: 'Genome ID'})
    }
    return sorts
  }, [selectMode])

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.currentTarget.value)
  }

  useEffect(()  => {
    const queries: {[key: string]: string} = {}
    searchParams.delete('sort')
    for (const [key, value] of searchParams.entries()) {      
      queries[key] = value
    }
    queries['sort'] = `${orderBy}${order === 'desc' ? '-' : '+'}`
    setSearchParams(queries)
  }, [orderBy, order, searchParams])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className='search' onSubmit={(e) => handleSubmit(e)}>
      <p className='search__results-number'>
        {countTotal.itemCount + ' / ' + countTotal.total}
      </p>
      <input
        type='search'
        className='search__input'
        placeholder='Search Keyword'
        onChange={(e) => handleKeyword(e)}
        value={searchParams.get('q') ?? ''}
      />
      <label htmlFor='sort' className='search__sort-label'>order by</label>
      <select
        name='sortType'
        id='sort'
        className='search__sort-select'
        onChange={(e) => handleSort(e)}
        value={orderBy}
      >
        {sortKeyValues.map((record, index) => {
          return <option key={index} value={record.key}>{record.value}</option>
        })}
      </select>
      <div className='search__order'>
        <button onClick={(_e) => setOrder('asc')} className={`search__order__button${(order === 'asc' ? ' active' : '')}`}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'>
            <path d='M10.59 7.42L6 2.83L1.41 7.42L0 6L6 -1.90735e-06L12 6L10.59 7.42Z' fill='#D9D9D9' />
          </svg>
        </button>
        <button onClick={(_e) => setOrder('desc')} className={`search__order__button${(order === 'desc' ? ' active' : '')}`}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'>
            <path d='M1.41 0.580002L6 5.17L10.59 0.580002L12 2L6 8L0 2L1.41 0.580002Z' fill='#D9D9D9' />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchForm
