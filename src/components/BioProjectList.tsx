import { useAtomValue, useSetAtom } from 'jotai'
import { useDebugValue, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { projectSearchQueryAtom, resultCountAtom, totalAtom } from '../store/store'

interface BioProjectListRequest {
  query: any
  size?: number
}

const BioProjectList = () => {
  const retrieveBioProject = async (url: string, { arg }: { arg: BioProjectListRequest }) => {
    const res = await fetch(`https://mdatahub.org/api${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    // console.log(await res.json())
    return await res.json()
  }

  const { data, error, isMutating, reset, trigger } = useSWRMutation('/bioproject', retrieveBioProject)

  const setTotal = useSetAtom(totalAtom)

  useEffect(() => {
    setTotal(data?.hits?.total?.value ?? 0)
  }, [data?.hits?.total])

  const setResultCount = useSetAtom(resultCountAtom)
  useEffect(() => {
    setResultCount(data?.hits?.hits?.length ?? 0)
  }, [data?.hits?.hits])

  const paginationItems = useMemo(() => {
    if (!data?.hits?.total?.value || !data?.hits?.hits) {
      return [1]
    }
    const paginationCount = Math.ceil(data?.hits?.total?.value / data?.hits?.hits?.length)
    const paginationNumberList = []
    for (let i = 1; i <= paginationCount; i++) {
      paginationNumberList.push(i)
    }
    return paginationNumberList
  }, [data?.hits?.total, data?.hits?.hits])

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

    trigger({
      query: { bool: { must: queries } },
      size: 10,
    })
  }, [pSearchQuery])

  console.log(error)

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
                </dl>
              </article>
            )
          })
        }

        <nav className='pagination' aria-label='ページャー'>
          {paginationItems.length <= 3
            && (
              <>
                {paginationItems.map((item: number, index: number) => {
                  return (index + 1) === 1
                    ? <span className='pagination__item current'>{item}</span>
                    : <a href='' className='pagination__item'>{item}</a>
                })}
              </>
            )}
          {paginationItems.length > 3
            && (
              <>
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
                <a href='' className='pagination__item'>{paginationItems[paginationItems.length - 1]}</a>
              </>
            )}
        </nav>
      </section>
    </>
  )
}

export default BioProjectList
