// import { PlotData } from 'plotly.js'
import Plot from 'react-plotly.js'
import '../css/show.css'
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import Chart from '../components/Chart'
// import dataForPlotly from '../test.json'

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
  //
  // const layout1 = { width: 640, height: 480, title: 'A Fancy Plot' }
  // const allData: Partial<PlotData>[] = dataForPlotly.map((record) => {
  //   return record as Partial<PlotData>
  // })

  return (
    <main className='app-main'>
      <p className='current-type'>{data?._index === 'bioproject' ? 'PROJECT' : data?._index.toUpperCase()}</p>
      <h2 className='page-title'>{data?._source.title}</h2>
      <p className="quality">
        <span className="quality__star">★★✩✩✩</span>
        <span className="quality__num">(2)</span>
      </p>
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

      <div className="data-section">
        <div className="data-section__box">
          <h3 className="data-section__box__heading">Metadata</h3>
          <div className="data-section__box__inner">
            <div className="data-section__box__item">
              <p className="data-section__box__item__label">Description</p>
              <p className="data-section__box__item__content">Raw sequence reads of the V6 hypervariable region of 16S rDNA from microbial communities within the Mississippi River.</p>
            </div>
            <div className="data-section__box__item">
              <p className="data-section__box__item__label">Publication</p>
              <p className="data-section__box__item__content">Bacterial community structure is indicative of chemical inputs in the Upper Mississippi River.</p>
            </div>
          </div>
        </div>

        <div className="data-section__box">
          <h3 className="data-section__box__heading">DFAST</h3>
          <div className="data-section__box__inner">
            <div className="data-section__box__item">
              <p className="data-section__box__item__label">Description</p>
              <p className="data-section__box__item__content">Raw sequence reads of the V6 hypervariable region of 16S rDNA from microbial communities within the Mississippi River.</p>
            </div>
            <div className="data-section__box__item">
              <p className="data-section__box__item__label">Publication</p>
              <p className="data-section__box__item__content">Bacterial community structure is indicative of chemical inputs in the Upper Mississippi River.</p>
            </div>
          </div>
        </div>

        <div className="data-section__box">
          <h3 className="data-section__box__heading">DFASTQC</h3>
          <div className="data-section__box__inner">
            <div className="data-section__box__item">
              <p className="data-section__box__item__label">Description</p>
              <p className="data-section__box__item__content">Raw sequence reads of the V6 hypervariable region of 16S rDNA from microbial communities within the Mississippi River.</p>
            </div>
            <div className="data-section__box__item">
              <p className="data-section__box__item__label">Publication</p>
              <p className="data-section__box__item__content">Bacterial community structure is indicative of chemical inputs in the Upper Mississippi River.</p>
            </div>
          </div>
        </div>

      </div>

      {data._source?.type === 'bioproject' && <Chart id={data._id} />}
    </main>
  )
}
export default Show
