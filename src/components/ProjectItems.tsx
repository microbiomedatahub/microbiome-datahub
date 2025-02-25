import {atom, useSetAtom} from 'jotai'
import React, {useEffect, useMemo} from 'react'
import {Link} from 'react-router-dom'
import {resultsCountTotalAtom} from '../store/store'
import Pagination from './Pagination'

const ProjectItems = (
  { checkedValues, handleChange, data, currentPage, error, isMutating }:
    { checkedValues: string[],
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
      data: object,
      currentPage: number,
      error: string,
      isMutating: boolean
    }) => {

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
    setTotal((data as { hits?: { total?: { value: number }}}) ?.hits?.total?.value ?? 0)
  }, [(data as {hits?: {total?: never}}) ?.hits?.total])

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
    setResultCount((data as {hits?: any })?.hits?.hits?.length ?? 0)
  }, [(data as {hits: any})?.hits?.hits])

  const lastPage = useMemo(() => {
    if (!(data as {hits: {total?: {value?: number}}}) ?.hits?.total?.value || !(data as {hits?: any})?.hits?.hits) {
      return 1
    }
    if ((data as {hits?: any })?.hits?.hits.length < 10) {
      return Math.ceil((data as {hits?: {total?: any}})?.hits?.total?.value / 10)
    }

    return Math.ceil((data as {hits?: any})?.hits?.total?.value / (data as {hits?: any})?.hits?.hits?.length)
  }, [(data as {hits?: any})?.hits?.total, (data as {hits?: any})?.hits?.hits])

  return (
    <>
      {isMutating && <h1>Now Loading.....</h1>}
      {error && <p>{Object.keys(error)}</p>}
      <section className='results'>
        {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          (data as {hits?: any})?.hits?.hits && (data as {hits?: any}).hits.hits.map((item: any, index: number) => {
            return (
              <article className='results__item' key={index}>
                <input
                  type="checkbox"
                  value={item._id}
                  checked={ checkedValues.includes(item._id) }
                  onChange={ handleChange }
                  id={item._id}
                  className="g-checkbox"
                />
                <label htmlFor={item._id}/>
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

                  {/*<div className='results__item__data__item'>*/}
                  {/*  <dt className='heading'>BioSamples</dt>*/}
                  {/*  <dd className='content'>{item._source._annotation.sample_count}</dd>*/}
                  {/*</div>*/}

                  {/*<div className='results__item__data__item'>*/}
                  {/*  <dt className='heading'>Data size (GB)</dt>*/}
                  {/*  <dd className='content'>{item._source._annotation.data_size}</dd>*/}
                  {/*</div>*/}

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
                    <a href={`/api/dl/project/metadata/${item._id}`} download
                      className="downloads-type__item">
                      metadata
                    </a>
                    <a className="downloads-type__item">
                      taxonomic composition
                    </a>
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

export default ProjectItems
