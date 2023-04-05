import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { totalAtom } from '../store/store'

const GenomeList = () => {
  const setTotal = useSetAtom(totalAtom)

  const retriveGenome = async ([url, query]: [string, string]) => {
    const res = await fetch(`https://mdatahub.org/api/genome${url}`)
    return await res.json()
  }

  const { data, error, isLoading } = useSWR(['/_search?q=genome', 'sss'], retriveGenome)

  useEffect(() => {
    setTotal(data?.hits?.total?.value ?? 0)
  }, [data?.hits?.total])

  return (
    <>
      {isLoading && <h1>Now Loading...</h1>}
      <section className='results'>
        {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          data?.hits?.hits && data.hits.hits.map((item: any, index: number) => {
            return (
              <article className='results__item' key={index}>
                <div className='results__item__header'>
                  <h2 className='title'>
                    <Link to={`/genomes/${item._id}`} title={item._source.title}>{item._source.title}a</Link>
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
    </>
  )
}

export default GenomeList
