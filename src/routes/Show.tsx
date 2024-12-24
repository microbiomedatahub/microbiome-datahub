// import { PlotData } from 'plotly.js'
import '../css/show.css'
import {LoaderFunction, LoaderFunctionArgs, useLoaderData, useParams} from 'react-router-dom'
import Chart from '../components/Chart'
import React, {useEffect, useState} from 'react'
import PaginationNoQuery from '../components/PaginationNoQuery'
// import dataForPlotly from '../test.json'

interface MDataHubDocSource {
  Download: null
  _annotation: {
    sample_count: number
    sample_organism: string[]
    sample_taxid: string[]
    sample_host_organism: string[]
    sample_host_organism_id: number[]
    sample_host_disease: string[]
    sample_host_disease_id: number[]
    sample_host_location: string[]
    sample_host_location_id: number[]
    data_size: string
    sample_ph_range: {
      min: number | null
      max: number | null
    }
    sample_temperature_range: {
      min: number | null
      max: number | null
    }
    completeness: number
    contamination: number
    strain_heterogeneity: number
    genome_count: number
  } | null
  'data type': null
  dateCreated: string
  dateModified: string
  datePublished?: string
  dbXrefs: []
  description: string
  distribution: null
  identifier: string
  organism: string
  organization: string
  properties: {
    assembly_accession: string
    bioproject: string
    biosample: string
    wgs_master: string
    refseq_category: string
    taxid: string
    species_taxid: string
    organism_name: string
    infraspecific_name: string
    isolate: string
    version_status: string
    assembly_level: string
    release_type: string
    genome_rep: string
    seq_rel_date: string
    asm_name: string
    submitter: string
    gbrs_paired_asm: string
    paired_asm_comp: string
    ftp_path: string
    excluded_from_reqseq: string
    relation_to_type_material: string
    asm_not_live_date: string
  } | null
  publication: []
  status: string
  title: string
  type: 'bioproject' | 'genome'
  visibility: null
  data_source?: string
  _dfast: {
    'Total Sequence Length (bp)': string
    'Number of Sequences': string
    'Longest Sequences (bp)': string
    'N50 (bp)': string
    'Gap Ratio (%)': string
    'GCcontent (%)': string
    'Number of CDSs': string
    'Average Protein Length': string
    'Coding Ratio (%)': string
    'Number of rRNAs': string
    'Number of tRNAs': string
    'Number of CRISPRs': string
  } | null
  has_analysis: boolean
  _dfastqc: {
    tc_result: string[]
    cc_result: {
      completeness: number
      contamination: number
      strain_heterogeneity: number
    }
    gtdb_result: string[]
  } | null
  quality: number
  quality_label: string
  _bac2feature: {[key: string]: number}
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
type MBGD = {
  id: string
  count: number
  ko: string
  description: string
}

const mbgdHeaders = [
  'id',
  'count',
  'ko',
  'description',
]

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
  const params = useParams()
  const [allMbgd, setAllMbgd] = useState<MBGD[]>([])
  const [mbgd, setMbgd] = useState<MBGD[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    (async () => {
      if (params.genomeId) {
        const res = await fetch(`https://mdatahub.org/api/genome/mbgd/${params.genomeId}`)
        const data = await res.json()
        setAllMbgd(data)
        const currentMbgd = data.filter((v: MBGD, i:number) => {
          if (i < 10) {
            return v
          }
        })
        setMbgd((currentMbgd))
        const quotient = Math.floor(data.length / 10)
        const remainder = data.length % 10
        const lastPage = remainder === 0 ? quotient : quotient + 1
        setLastPage((lastPage))
      }
    })()
  }, [])

  const handleChangeCurrentPage = (newPage: number) => {
    setCurrentPage(newPage)
    const currentMbgd = allMbgd.filter((v: MBGD, i:number) => {
      if (newPage === 1) {
        return i < 10
      } else {
        return (newPage - 1) * 10 <= i && i < newPage * 10
      }
    })
    setMbgd((currentMbgd))
  }

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
      <p className='quality'>
        <span className='quality__star'>
          {[...Array(data?._source.quality ?? 0)].map(() => '★').join('')
            + [...Array(5 - (data?._source.quality ?? 0))].map(() => '✩').join('')}
        </span>
        <span className='quality__num'>{data?._source.quality}</span>
      </p>
      <p className='facility-name'>{data?._source.organization}</p>
      <div className='data-id'>
        <dl className='data-id__data'>
          <div className='data-id__data__item'>
            <dt className='heading'>organism</dt>

            {data?._source?._annotation?.sample_organism.map((envItem: string, envIndex: number) => {
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

      <div className='data-section'>
        <div className='data-section__box'>
          <h3 className='data-section__box__heading'>Metadata</h3>
          <div className='data-section__box__inner'>
            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>identifier</p>
              <p className='data-section__box__item__content'>{data._source?.identifier}</p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>organism</p>
              <p className='data-section__box__item__content'>{data._source?.organism}</p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>organization</p>
              <p className='data-section__box__item__content'>{data._source?.organization}</p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>assembly_accession</p>
              <p className='data-section__box__item__content'>{data._source?.properties?.assembly_accession}</p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>bioproject</p>
              <p className='data-section__box__item__content'>
                {data._source?.properties?.bioproject}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>biosample</p>
              <p className='data-section__box__item__content'>
                {data._source?.properties?.biosample}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>specires_taxid</p>
              <p className='data-section__box__item__content'>
                {data._source?.properties?.species_taxid}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>organism_name</p>
              <p className='data-section__box__item__content'>
                {data._source?.properties?.organism_name}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>seq_rel_date</p>
              <p className='data-section__box__item__content'>
                {data._source?.properties?.seq_rel_date}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_organism</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_organism}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_taxid</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_taxid}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_host_organism</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_host_organism}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_host_organism_id</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_host_organism_id}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_host_disease</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_host_disease}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_host_disease_id</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_host_disease_id}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_host_location</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_host_location}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_ph_range</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_ph_range.min + ' < '
                  + data._source?._annotation?.sample_ph_range.max}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>sample_temperature_range</p>
              <p className='data-section__box__item__content'>
                {data._source?._annotation?.sample_temperature_range.min + ' < '
                  + data._source?._annotation?.sample_temperature_range.max}
              </p>
            </div>
          </div>
        </div>

        <div className='data-section__box'>
          <h3 className='data-section__box__heading'>DFAST</h3>
          <div className='data-section__box__inner'>
            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Total Sequence Length (bp)</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Total Sequence Length (bp)']}
              </p>
            </div>
            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Number of Sequences</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Number of Sequences']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Longest Sequences (bp)</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Longest Sequences (bp)']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>N50 (bp)</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['N50 (bp)']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>GCcontent (%)</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['GCcontent (%)']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Number of CDSs</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Number of CDSs']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Coding Ratio (%)</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Coding Ratio (%)']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Number of rRNAs</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Number of rRNAs']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>Number of tRNAs</p>
              <p className='data-section__box__item__content'>
                {data._source._dfast?.['Number of tRNAs']}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>quality_label</p>
              <p className='data-section__box__item__content'>
                {data._source.quality_label}
              </p>
            </div>
          </div>
        </div>

        <div className='data-section__box'>
          <h3 className='data-section__box__heading'>DFASTQC</h3>
          <div className='data-section__box__inner'>
            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>completeness</p>
              <p className='data-section__box__item__content'>
                {data._source._dfastqc?.cc_result.completeness}
              </p>
            </div>
            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>contamination</p>
              <p className='data-section__box__item__content'>
                {data._source._dfastqc?.cc_result.contamination}
              </p>
            </div>

            <div className='data-section__box__item'>
              <p className='data-section__box__item__label'>strain_heterogeneity</p>
              <p className='data-section__box__item__content'>
                {data._source._dfastqc?.cc_result.strain_heterogeneity}
              </p>
            </div>
          </div>
        </div>

        <div className='data-section__box'>
          <h3 className='data-section__box__heading'>Bac2Feature</h3>
          <div className='data-section__box__inner'>
            {data._source._bac2feature && Object.keys(data._source._bac2feature).map((key: string, i: number) => {
              return (
                <div className='data-section__box__item' key={i}>
                  <p className='data-section__box__item__label'>{key}</p>
                  <p className='data-section__box__item__content'>
                    {data._source._bac2feature[key]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {data._source?.type === 'bioproject' && <Chart id={data._id} />}

      <div>
        {data._source?.type === 'genome' ?
          <section>
            <PaginationNoQuery currentPage={currentPage} lastPage={lastPage} handleChangeCurrentPage={handleChangeCurrentPage}/>
            <table>
              <thead>
                <tr>
                  {mbgdHeaders.map((v, i) => <th key={i}>{v}</th>)}
                </tr>
              </thead>
              <tbody>
                {mbgd && mbgd.length > 0 && mbgd.map((row: MBGD, i: number) => (
                  <tr key={i}>
                    <td>{row.id}</td>
                    <td>{row.count}</td>
                    <td>{row.ko}</td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          :null
        }
      </div>
    </main>
  )
}
export default Show
