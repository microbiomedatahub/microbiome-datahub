import { atom, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { resultsCountTotalAtom } from '../store/store'
import Pagination from './Pagination'

interface GenomeListRequest {
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

const GenomeItems = () => {
  const retrieveGenome = async (url: string, { arg }: { arg: GenomeListRequest }) => {
    const res = await fetch(`https://mdatahub.org/api${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    return await res.json()
  }

  const { data, error, isMutating, reset, trigger } = useSWRMutation('/genome', retrieveGenome)

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
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page') ?? '1'))
  }, [searchParams])

  useEffect(() => {
    reset()

    const queries = []
    if (searchParams.get('env')) {
      queries.push({ match: { '_annotation.sample_organism': searchParams.get('env') } })
    }
    if (searchParams.get('genomeTaxon')) {
      queries.push({ wildcard: { 'properties.organism_name.keyword': `*${searchParams.get('genomeTaxon')}*` } })
    }
    if (searchParams.get('magCompleteness')) {
      queries.push({
        range: {
          '_annotation.completeness': {
            gte: parseInt(searchParams.get('magCompleteness') ?? ''),
          },
        },
      })
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

    if (searchParams.get('quality')) {
      const qualities = (searchParams.get('quality') ?? '0').split(',').map((item) => parseInt(item))
      const qualityQueries = qualities.map((q) => {
        return {
          match: { 'quality': q },
        }
      })
      queries.push({
        bool: {
          should: qualityQueries,
        },
      })
    }

    const qQueries = []
    if (searchParams.get('q')) {
      qQueries.push({
        wildcard: {
          'identifier.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'title.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
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
      {isMutating && <h1>Now Loading...</h1>}
      <section className='results'>
        {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          data?.hits?.hits && data.hits.hits.map((item: any, index: number) => {
            return (
              <article className='results__item' key={index}>
                <input type="checkbox" id={item._id} className="g-checkbox"/>
                <label htmlFor={item._id}/>
                <div className='results__item__header'>
                  <h2 className='title'>
                    <Link to={`/genomes/${item._id}`} title={item._source.title}>{item._source.title}</Link>
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
                <details className="results__item__menu">
                  <summary className="summary">
                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <title>download menu</title>
                      <path
                        d="M12 2C12 1.46957 12.2107 0.96086 12.5858 0.585787C12.9609 0.210714 13.4696 0 14 0C14.5304 0 15.0391 0.210714 15.4142 0.585787C15.7893 0.96086 16 1.46957 16 2C16 2.53043 15.7893 3.03914 15.4142 3.41421C15.0391 3.78929 14.5304 4 14 4C13.4696 4 12.9609 3.78929 12.5858 3.41421C12.2107 3.03914 12 2.53043 12 2ZM6 2C6 1.46957 6.21071 0.96086 6.58579 0.585787C6.96086 0.210714 7.46957 0 8 0C8.53043 0 9.03914 0.210714 9.41421 0.585787C9.78929 0.96086 10 1.46957 10 2C10 2.53043 9.78929 3.03914 9.41421 3.41421C9.03914 3.78929 8.53043 4 8 4C7.46957 4 6.96086 3.78929 6.58579 3.41421C6.21071 3.03914 6 2.53043 6 2ZM0 2C0 1.46957 0.210714 0.96086 0.585786 0.585787C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.96086 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210714 3.03914 0 2.53043 0 2Z"
                        fill="#575757"/>
                    </svg>
                  </summary>
                  <div className="downloads-type">
                    <button className="downloads-type__item">metadata</button>
                    <button className="downloads-type__item">genome sequence</button>
                    <button className="downloads-type__item">gene sequence</button>
                    <button className="downloads-type__item">protein sequence</button>
                  </div>
                </details>
              </article>
            )
          })
        }

        <Pagination currentPage={currentPage} lastPage={lastPage}/>
      </section>
    </>
  )
}

export default GenomeItems
