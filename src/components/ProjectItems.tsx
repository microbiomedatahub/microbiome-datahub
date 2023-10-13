import { atom, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { resultsCountTotalAtom } from '../store/store'
import Pagination from './Pagination'

interface BioProjectListRequest {
  query: any
  from: number
  size?: number
  sort: SortQueriesInterface
  track_total_hits: boolean
}

interface SortQueriesInterface {
  [key: string]: {
    order: 'asc' | 'desc'
  }
}

const ProjectItems = () => {
  const retrieveBioProject = async (url: string, { arg }: { arg: BioProjectListRequest }) => {
    const res = await fetch(`https://mdatahub.org/api${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })

    return await res.json()
  }

  const { data, error, isMutating, reset, trigger } = useSWRMutation('/project', retrieveBioProject)

  const totalWritableAtom = atom(null, (get, set, newTotal: number) => {
    const resultsCountTotal = get(resultsCountTotalAtom)
    const newResultsCountTotal = {
      itemCount: resultsCountTotal.itemCount,
      total: newTotal,
    }
    set(resultsCountTotalAtom, newResultsCountTotal)
  })
  const setTotal = useSetAtom(totalWritableAtom)
  useEffect(() => {
    setTotal(data?.hits?.total?.value ?? 0)
  }, [data?.hits?.total])

  const itemCountWritableAtom = atom(null, (get, set, newItemCount: number) => {
    const resultsCountTotal = get(resultsCountTotalAtom)
    const newResultsCountTotal = {
      itemCount: newItemCount,
      total: resultsCountTotal.total,
    }
    set(resultsCountTotalAtom, newResultsCountTotal)
  })
  const setResultCount = useSetAtom(itemCountWritableAtom)
  useEffect(() => {
    setResultCount(data?.hits?.hits?.length ?? 0)
  }, [data?.hits?.hits])

  const lastPage = useMemo(() => {
    if (!data?.hits?.total?.value || !data?.hits?.hits) {
      return 1
    }
    if (data?.hits?.hits.length < 10) {
      return Math.ceil(data?.hits?.total?.value / 10)
    }

    return Math.ceil(data?.hits?.total?.value / data?.hits?.hits?.length)
  }, [data?.hits?.total, data?.hits?.hits])

  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, _setSearchParams] = useSearchParams()

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page') ?? '1'))
  }, [searchParams])

  useEffect(() => {
    reset()

    const queries = []
    if (searchParams.get('env')) {
      queries.push({ match: { '_annotation.sample_organism': searchParams.get('env') } })
    }
    if (searchParams.get('hostTaxon')) {
      queries.push({ match: { '_annotation.sample_host_organism': searchParams.get('hostTaxon') } })
    }
    if (searchParams.get('hostDisease')) {
      queries.push({ match: { '_annotation.sample_host_disease': searchParams.get('hostDisease') } })
    }
    if (searchParams.get('hostLoc')) {
      queries.push({ match: { '_annotation.sample_host_location': searchParams.get('hostLoc') } })
    }

    if (searchParams.get('temp')) {
      queries.push({
        range: {
          '_annnotation.sample_temperature_range.min': {
            lt: parseInt(searchParams.get('temp') ?? ''),
          },
        },
      })
      queries.push({
        range: {
          '_annotation.sample_temperature_range.max': {
            gt: parseInt(searchParams.get('temp') ?? ''),
          },
        },
      })
    }

    if (searchParams.get('ph')) {
      queries.push({
        range: {
          '_annnotation.sample_ph_range.min': {
            lt: parseInt(searchParams.get('ph') ?? ''),
          },
        },
      })
      queries.push({
        range: {
          '_annotation.sample_ph_range.max': {
            gt: parseInt(searchParams.get('ph') ?? ''),
          },
        },
      })
    }

    const qQueries = []
    if (searchParams.get('q')) {
      qQueries.push({
        wildcard: {
          'title.keyword': {
            value: `*${searchParams.get('q')}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'properties.assembly_accession.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'properties.bioproject.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'properties.biosample.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
    }

    const sortQueries: SortQueriesInterface = {}
    if (searchParams.get('sort')) {
      const sortBy = searchParams.get('sort')?.slice(0, -1) ?? ''
      const sortOrder = searchParams.get('sort')?.slice(-1)

      sortQueries[sortBy] = {
        order: (sortOrder === '+' ? 'asc' : 'desc'),
      }
    } else {
      sortQueries['dateCreated'] = { order: 'desc' }
    }

    trigger({
      query: { bool: { must: queries, should: qQueries } },
      from: (currentPage - 1) * 10,
      size: 10,
      sort: sortQueries,
      track_total_hits: true,
    })
  }, [currentPage, searchParams])

  return (
    <>
      {isMutating && <h1>Now Loading.....</h1>}
      {error && <p>{Object.keys(error)}</p>}
      <section className='results'>
        {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          data?.hits?.hits && data.hits.hits.map((item: any, index: number) => {
            return (
              <article className='results__item' key={index}>
                <div className='results__item__header'>
                  <h2 className='title'>
                    <Link to={`/projects/${item._id}`} title={item._source.title}>{item._source.title}</Link>
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

                  <div className='results__item__data__item'>
                    <dt className='heading'>Date Created</dt>
                    <dd className='content'>{item._source.dateCreated}</dd>
                  </div>
                </dl>
              </article>
            )
          })
        }

        <Pagination currentPage={currentPage} lastPage={lastPage} />
      </section>
    </>
  )
}

export default ProjectItems
