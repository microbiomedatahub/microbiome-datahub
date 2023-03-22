// @ts-nocheck
import '../css/index.css'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { projectSearchQueryAtom, selectModeAtom } from '../store/store'

function Index() {
  const pSearchQuery = useAtomValue(projectSearchQueryAtom)
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const retrieveBioProject = async (url: string, { arg }) => {
    const res = await fetch('https://mb.ddbj.nig.ac.jp' + url, {
      method: 'POST',
      ...arg,
    })
    return await res.json()
  }

  const [selectMode, setSelectMode] = useAtom(selectModeAtom)

  const { data, error, isMutating, reset, trigger } = useSWRMutation('/bioproject', retrieveBioProject)
  console.log(data)

  useEffect(() => {
    reset()

    const queries = []
    if (pSearchQuery.sample_organism) {
      queries.push({ 'match': { '_annotation.sample_organism': pSearchQuery.sample_organism } })
    }
    if (pSearchQuery.sample_host_organism) {
      queries.push({ match: { '_annotation.sample_host_organism': pSearchQuery.sample_host_organism } })
    }
    if (pSearchQuery.sample_host_disease) {
      queries.push({ match: { '_annotation.sample_host_disease': pSearchQuery.sample_host_disease } })
    }
    if (pSearchQuery.sample_host_location) {
      queries.push({ match: { '_annotation.sample_host_location': pSearchQuery.sample_host_location } })
    }
    // if (pSearchQuery.sample_temperature_range) {
    //   queries.push({
    //     aggs: {
    //       maxTemperature: {
    //         max: {
    //           field: '_annotation.sample_temperature_range',
    //         },
    //       },
    //     },
    //   })
    // }

    trigger({
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        'query': { 'bool': { 'must': queries } },
      }),
    })
  }, [pSearchQuery])

  const resultsCount = useMemo(() => data?.hits[0].length, [data?.hits])

  return (
    <main className='app-main'>
      {error && <h1>Hi</h1>}
      {isMutating && <h1>Now Loading....</h1>}
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
          {`${resultsCount} / ${resultsCount}`}
        </p>
        <input type='search' className='search__input' placeholder='Search Keyword' />
        <label htmlFor='sort' className='search__sort-label'>order by</label>
        <select name='sortType' id='sort' className='search__sort-select'>
          <option value='Project ID'>Project ID</option>
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

      <section className='results'>
        {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          data?.hits && data.hits[0].map((item: any, index: number) => {
            return (
              <article className='results__item' key={index}>
                <div className='results__item__header'>
                  <h2 className='title'>
                    <Link to={`/projects/${item._id}`} title=''>
                      {item._source.title}
                    </Link>
                  </h2>
                  <p className='id'>{item._id}</p>
                </div>
                <dl className='results__item__data'>
                  <div className='results__item__data__item'>
                    <dt className='heading'>Environment</dt>
                    <dd className='content buttons'>
                      {item._source._annotation.sample_organism.map((envItem: string, envIndex: number) => {
                        return <button className='content__button' key={envIndex}>{envItem}</button>
                      })}
                    </dd>
                  </div>

                  <div className='results__item__data__item'>
                    <dt className='heading'>Host taxon</dt>
                    <dd className='content'>
                      {item._source._annotation.sample_host_organism.map(
                        (hostTaxonItem: string, hostTaxonIndex: number) => {
                          return <button className='content__button' key={hostTaxonIndex}>{hostTaxonItem}</button>
                        },
                      )}
                    </dd>
                  </div>

                  <div className='results__item__data__item'>
                    <dt className='heading'>BioSamples</dt>
                    <dd className='content'>{item._source._annotation.sample_count}</dd>
                  </div>

                  <div className='results__item__data__item'>
                    <dt className='heading'>Data size (GB)</dt>
                    <dd className='content'>{item._source._annotation.data_size}</dd>
                  </div>
                </dl>
              </article>
            )
          })
        }

        <nav className='pagination' aria-label='ページャー'>
          <span className='pagination__item current'>1</span>
          <a href='' className='pagination__item'>2</a>
          <a href='' className='pagination__item'>3</a>
          <div className='pagination__item dot'>
            <svg viewBox='0 0 31 4' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='2' cy='2' r='2' fill='#D9D9D9' />
              <circle cx='11' cy='2' r='2' fill='#D9D9D9' />
              <circle cx='20' cy='2' r='2' fill='#D9D9D9' />
              <circle cx='29' cy='2' r='2' fill='#D9D9D9' />
            </svg>
          </div>
          <a href='' className='pagination__item'>999</a>
        </nav>
      </section>
    </main>
  )
}

export default Index
