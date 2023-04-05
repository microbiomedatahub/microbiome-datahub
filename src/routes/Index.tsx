// @ts-nocheck
import '../css/index.css'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import BioProjectList from '../components/BioProjectList'
import GenomeList from '../components/GenomeList'
import { projectSearchQueryAtom, resultCountAtom, selectModeAtom, totalAtom } from '../store/store'

function Index() {
  const [selectMode, setSelectMode] = useAtom(selectModeAtom)
  const resultCount = useAtomValue(resultCountAtom)
  const total = useAtomValue(totalAtom)

  return (
    <main className='app-main'>
      <nav className='tab-navigation'>
        <button
          className={`tab-navigation__link${selectMode === 'project' ? ' current' : ''}`}
          onClick={() => setSelectMode('project')}
        >
          PROJECT
        </button>
        <button
          className={`tab-navigation__link${selectMode === 'genome' ? ' current' : ''}`}
          onClick={() => setSelectMode('genome')}
        >
          GENOME
        </button>
      </nav>

      <form action='' className='search'>
        <p className='search__results-number'>
          {`${resultCount} / ${total}`}
        </p>
        <input type='search' className='search__input' placeholder='Search Keyword' />
        <label htmlFor='sort' className='search__sort-label'>order by</label>
        <select name='sortType' id='sort' className='search__sort-select'>
          {selectMode === 'project' && <option value='Project ID'>Project ID</option>}
          {selectMode === 'genome' && <option value='Genome ID'>Genome ID</option>}
        </select>
        <div className='search__order'>
          <button value='' className='search__order__button active'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'>
              <path d='M10.59 7.42L6 2.83L1.41 7.42L0 6L6 -1.90735e-06L12 6L10.59 7.42Z' fill='#D9D9D9' />
            </svg>
          </button>
          <button value='' className='search__order__button'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'>
              <path d='M1.41 0.580002L6 5.17L10.59 0.580002L12 2L6 8L0 2L1.41 0.580002Z' fill='#D9D9D9' />
            </svg>
          </button>
        </div>
      </form>

      {selectMode === 'genome'
        && <GenomeList />}
      {selectMode === 'project'
        && <BioProjectList />}
    </main>
  )
}

export default Index
