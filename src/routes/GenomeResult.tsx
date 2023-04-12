import { useParams } from 'react-router-dom'
import '../css/show.css'
import useSWR from 'swr'
import dummyChart from '../images/dummy-chart.png'

const GenomeResult = () => {
  const params = useParams()

  const genomeFetcher = (args: string) =>
    fetch(`https://mdatahub.org/api/genome/_doc/${args}`).then((res) => res.json())
  const { data, error, isLoading } = useSWR(params.genomeId, genomeFetcher)

  return (
    <main className='app-main'>
      {error && <h1>Hi</h1>}
      {isLoading && <h1>Now Loading....</h1>}
      <p className='current-type'>{data?.type.toUpperCase()}</p>
      <h2 className='page-title'>{data?.identifier}</h2>
      <p className='facility-name'>{data?.organization}</p>
      <div className='data-id'>
        <dl className='data-id__data'>
          <div className='data-id__data__item'>
            <dt className='heading'>organism</dt>

            {data?._annotation.sample_organism.map((envItem: string, envIndex: number) => {
              return (
                <dd className='content' key={envIndex}>
                  <button className='content__button'>{envItem}</button>
                </dd>
              )
            })}
          </div>

          <div className='data-id__data__item'>
            <dt className='heading'>data type</dt>
            <dd className='content'>{data && data['data type']}</dd>
          </div>
          <div className='data-id__data__item'>
            <dt className='heading'>data source</dt>
            <dd className='content'>{data && data['data source']}</dd>
          </div>
        </dl>

        <p className='data-id__id'>{data?.identifier}</p>
      </div>

      <dl className='data-list'>
        <div className='data-list__item'>
          <dt className='heading'>Description</dt>
          <dd className='content'>
            {data?.description}
          </dd>
        </div>

        <div className='data-list__item'>
          <dt className='heading'>Publication</dt>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.publication.map((p: any, i: any) => {
              return (
                <dd className='content' key={i}>
                  <p className='id'>{p.id}</p>
                  <p>{p.Title}</p>
                </dd>
              )
            })
          }
        </div>

        <div className='data-list__item'>
          <dt className='heading'>Properties</dt>
          <dd className='content'>
            <p className='null'>{data?.properties ?? 'NULL'}</p>
          </dd>
        </div>
      </dl>

      <dl className='date'>
        <div className='date__item'>
          <dt className='heading'>dateModified:</dt>
          <dd className='content'>{data?.dateModified}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>dateCreated:</dt>
          <dd className='content'>{data?.dateCreated}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>datePublished:</dt>
          <dd className='content'>{data?.datePublished}</dd>
        </div>
      </dl>

      <section className='cart'>
        <nav className='chart__navigation'>
          <a href='' className='chart__navigation__link current'>CHART 01</a>
          <a href='' className='chart__navigation__link'>CHART 02</a>
          <a href='' className='chart__navigation__link'>CHART 03</a>
          <a href='' className='chart__navigation__link'>CHART 04</a>
        </nav>

        <article className='cart__content'>
          <h3 className='chart__title'>SUBJECT of This Chart</h3>
          <p className='chart__description'>なにか、チャートに関する説明などがあれば表示する</p>
          <div className='chart__item'>
            <img src={dummyChart} alt='Dummy Chart' />
          </div>
        </article>
      </section>
    </main>
  )
}

export default GenomeResult
