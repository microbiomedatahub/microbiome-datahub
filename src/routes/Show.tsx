import { useParams } from 'react-router-dom'
import '../css/show.css'
import useSWR from 'swr'

function Show() {
  const params = useParams()
  console.log(params.projectId)

  const fetcher = (args: string) =>
    fetch('https://mb.ddbj.nig.ac.jp' + args, { method: 'GET' }).then((res) => res.json())
  const { data, error, isLoading } = useSWR(`/bioproject/_doc/${params.projectId}`, fetcher)
  console.log(data && data.index)

  return (
    <main className='app-main'>
      {error && <h1>Hi</h1>}
      {isLoading && <h1>Now Loading....</h1>}
      <h2 className='page-title'>{data?.index?._source?.title}</h2>
      <p className='facility-name'>{data?.index?._source?.organization}</p>
      <div className='data-id'>
        <dl className='data-id__data'>
          <div className='data-id__data__item'>
            <dt className='heading'>organism</dt>

            {data?.index?._source?._annotation.sample_organism.map((envItem: string, envIndex: number) => {
              return (
                <dd className='content' key={envIndex}>
                  <button className='content__button'>{envItem}</button>
                </dd>
              )
            })}
          </div>

          <div className='data-id__data__item'>
            <dt className='heading'>data type</dt>
            <dd className='content'>{data?.index?._source && data?.index?._source['data type']}</dd>
          </div>
        </dl>

        <p className='data-id__id'>{data?.index?._id}</p>
      </div>

      <dl className='data-list'>
        <div className='data-list__item'>
          <dt className='heading'>Description</dt>
          <dd className='content'>
            {data?.index?._source?.description}
          </dd>
        </div>

        <div className='data-list__item'>
          <dt className='heading'>Publication</dt>
          {data?.index?._source?.publication.map((p, i) => {
            return (
              <dd className='content' key={i}>
                <p className='id'>{p.id}</p>
                <p>{p.Title}</p>
              </dd>
            )
          })}
        </div>

        <div className='data-list__item'>
          <dt className='heading'>Properties</dt>
          <dd className='content'>
            <p className='null'>{data?.index?._source?.properties ?? 'NULL'}</p>
          </dd>
        </div>
      </dl>

      <dl className='date'>
        <div className='date__item'>
          <dt className='heading'>dateModified:</dt>
          <dd className='content'>{data?.index?._source?.dateModified}</dd>
        </div>
        <div className='date__item'>
          <dt className='heading'>dateCreated:</dt>
          <dd className='content'>{data?.index?._source?.dateCreated}</dd>
        </div>
      </dl>
    </main>
  )
}

export default Show
