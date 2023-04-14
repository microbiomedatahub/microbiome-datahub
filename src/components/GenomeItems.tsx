import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { projectSearchQueryAtom, resultsCountTotalAtom } from '../store/store'
import Pagination from './Pagination'

interface GenomeListRequest {
  query: any
  from: number
  size?: number
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

  const pSearchQuery = useAtomValue(projectSearchQueryAtom)
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

    const qQueries = []
    if (searchParams.get('q')) {
      qQueries.push({
        wildcard: {
          identifier: {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          title: {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
    }

    trigger({
      query: { bool: { must: queries, should: qQueries } },
      from: (currentPage - 1) * 10,
      size: 10,
    })
  }, [pSearchQuery, currentPage, searchParams])

  return (
    <>
      {isMutating && <h1>Now Loading...</h1>}
      <section className='results'>
        {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          data?.hits?.hits && data.hits.hits.map((item: any, index: number) => {
            return (
              <article className='results__item' key={index}>
                <div className='results__item__header'>
                  <h2 className='title'>
                    <Link to={`/genomes/${item._id}`} title={item._source.identifier}>{item._source.identifier}</Link>
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

        <Pagination currentPage={currentPage} lastPage={lastPage} />
      </section>
    </>
  )
}

export default GenomeItems
