import { PlotData } from 'plotly.js'
import Plot from 'react-plotly.js'
import '../css/show.css'
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import dataForPlotly from '../test.json'

interface MDataHubDocSource {
  Download: null
  _annotation: any
  'data type': null
  dateCreated: string
  dateModified: string
  datePublished?: string
  dbXrefs: []
  description: string
  distribution: null
  has_analysis: boolean
  identifier: string
  organism: string
  organization: string
  properties: {
    submitter: string
  } | null
  publication: []
  status: string
  title: string
  type: 'bioproject' | 'genome'
  visibility: null
  data_source?: string
}

interface MDataHubDoc {
  _id: string
  _index: 'bioproject' | 'genome'
  _primary_term: number
  _seq_no: number
  _source: MDataHubDocSource
  _type: string
  _version: number
  found: boolean
}

export const loadShow = async ({ params }: LoaderFunctionArgs): Promise<LoaderFunction> => {
  let path
  if ('projectId' in params) {
    path = `/project/_doc/${params.projectId}`
  } else if ('genomeId' in params) {
    path = `/genome/_doc/${params.genomeId}`
  } else {
    return Promise.reject()
  }
  const res = await fetch(`https://mdatahub.org/api/${path}`)
  const data = await res.json()

  return data?.index ?? data
}

const Show = () => {
  const data = useLoaderData() as MDataHubDoc

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
      <p className='current-type'>{data?._index === 'bioproject' ? 'PROJECT' : data?._index.toUpperCase()}</p>
      <h2 className='page-title'>{data?._source.title}</h2>
      <p className='facility-name'>{data?._source.organization}</p>
      <div className='data-id'>
        <dl className='data-id__data'>
          <div className='data-id__data__item'>
            <dt className='heading'>organism</dt>

            {data?._source._annotation.sample_organism.map((envItem: string, envIndex: number) => {
              return (
                <dd className='content' key={envIndex}>
                  <button className='content__button'>{envItem}</button>
                </dd>
              )
            })}
          </div>

          <div className='data-id__data__item'>
            <dt className='heading'>data type</dt>
            <dd className='content'>{data._source['data type']}</dd>
          </div>
          <div className='data-id__data__item'>
            <dt className='heading'>data source</dt>
            <dd className='content'>{data._source?.data_source}</dd>
          </div>
        </dl>

        <p className='data-id__id'>{data?._source.identifier}</p>
      </div>

      <dl className='data-list'>
        <div className='data-list__item'>
          <dt className='heading'>Description</dt>
          <dd className='content'>
            {data?._source.description}
          </dd>
        </div>

        <div className='data-list__item'>
          <dt className='heading'>Publication</dt>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data?._source.publication ?? []).map((p: any, i: any) => {
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
            <p className='null'>{data?._source.properties?.submitter ?? 'NULL'}</p>
          </dd>
        </div>
      </dl>

      <dl className='date'>
        <div className='date__item'>
          <dt className='heading'>dateModified:</dt>
          <dd className='content'>{data?._source.dateModified}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>dateCreated:</dt>
          <dd className='content'>{data?._source.dateCreated}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>datePublished:</dt>
          <dd className='content'>{data._source?.datePublished}</dd>
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
export default Show
