import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BioProjectList from '../components/BioProjectList'
import GenomeItems from '../components/GenomeItems'
import SearchForm from '../components/SearchForm'
import { MicrobiomeMode } from '../main'
import { selectModeAtom } from '../store/store'

const SearchResults = () => {
  const { type } = useLoaderData() as MicrobiomeMode
  const setSelectMode = useSetAtom(selectModeAtom)

  useEffect(() => setSelectMode(type), [type])

  return (
    <main className='app-main'>
      <nav>
        <ul className='tab-navigation'>
          <li className={`tab-navigation__link${type === 'project' ? ' current' : ''}`}>
            {type !== 'project' ? <Link to='/projects'>PROJECT</Link> : 'PROJECT'}
          </li>
          <li className={`tab-navigation__link${type === 'genome' ? ' current' : ''}`}>
            {type !== 'genome' ? <Link to='/genomes'>GENOME</Link> : 'GENOME'}
          </li>
        </ul>
      </nav>

      <SearchForm />

      {type === 'project' && <BioProjectList />}
      {type === 'genome' && <GenomeItems />}
    </main>
  )
}

export default SearchResults
