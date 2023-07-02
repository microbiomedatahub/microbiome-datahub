import { useParams } from 'react-router-dom'
import '../css/show.css'
import { PlotData } from 'plotly.js'
import Plot from 'react-plotly.js'
import useSWR from 'swr'
import dataForPlotly from '../test.json'

const GenomeResult = () => {
  const params = useParams()

  const genomeFetcher = (args: string) =>
    fetch(`https://mdatahub.org/api/genome/_doc/${args}`).then((res) => res.json())
  const { data, error, isLoading } = useSWR(params.genomeId, genomeFetcher)
  const source = data?._source
  // const data1: Partial<PlotData> = {
  //   x: [1, 2, 3],
  //   y: [2, 6, 3],
  //   type: 'scatter',
  //   mode: 'lines+markers',
  //   marker: {color: 'red'},
  // }
  // const data2: Partial<PlotData> = {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}
  // const allData: Partial<PlotData>[] = [
  //   data1,
  //   data2,
  // ]
  // const layout1 = {width: 320, height: 240, title: 'A Fancy Plot'}
  const layout1 = { width: 640, height: 480, title: 'A Fancy Plot' }
  const allData: Partial<PlotData>[] = dataForPlotly.map((record) => {
    return record as Partial<PlotData>
  })

  return (
    <main className='app-main'>
      {error && <h1>Hi</h1>}
      {isLoading && <h1>Now Loading....</h1>}
      <p className='current-type'>{source?.type?.toUpperCase()}</p>
      <h2 className='page-title'>{source?.identifier}</h2>
      <p className='facility-name'>{source?.organization}</p>
      <div className='data-id'>
        <dl className='data-id__data'>
          <div className='data-id__data__item'>
            <dt className='heading'>organism</dt>

            {source?._annotation.sample_organism.map((envItem: string, envIndex: number) => {
              return (
                <dd className='content' key={envIndex}>
                  <button className='content__button'>{envItem}</button>
                </dd>
              )
            })}
          </div>

          <div className='data-id__data__item'>
            <dt className='heading'>data type</dt>
            <dd className='content'>{source?.data_type}</dd>
          </div>
          <div className='data-id__data__item'>
            <dt className='heading'>data source</dt>
            <dd className='content'>{source?.data_source}</dd>
          </div>
        </dl>

        <p className='data-id__id'>{source?.identifier}</p>
      </div>

      <dl className='data-list'>
        <div className='data-list__item'>
          <dt className='heading'>Description</dt>
          <dd className='content'>
            {source?.description}
          </dd>
        </div>

        <div className='data-list__item'>
          <dt className='heading'>Publication</dt>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (source?.publication ?? []).map((p: any, i: number) => {
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
            <p className='null'>{source?.properties?.submitter ?? 'NULL'}</p>
          </dd>
        </div>
      </dl>

      <dl className='date'>
        <div className='date__item'>
          <dt className='heading'>dateModified:</dt>
          <dd className='content'>{source?.dateModified}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>dateCreated:</dt>
          <dd className='content'>{source?.dateCreated}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>datePublished:</dt>
          <dd className='content'>{source?.datePublished}</dd>
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
            <Plot data={allData} layout={layout1} />
          </div>
        </article>
      </section>
    </main>
  )
}

export default GenomeResult
