import { useEffect } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

interface BioProjectListRequest {
  q: string
}

const BioProjectList = () => {
  const retrieveBioProject = async ([url, query]: [string, BioProjectListRequest]) => {
    console.log(url, query)
    const res = await fetch(`https://mdatahub.org/api/bioproject${url}`, {
      // method: 'POST',
      // headers: {
      // 'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(query),
    })
    // console.log(await res.json())
    return await res.json()
  }

  const { data, error, isLoading } = useSWR(
    ['/_search?_annotation.sample_organism=missi', { q: 'bioproject' }],
    retrieveBioProject,
  )
  // const { data, error, isMutating, reset, trigger } = useSWRMutation('/_search', retrieveBioProject)
  // trigger({})

  // useEffect(() => {
  // trigger({ q: 'bioproject' })
  // }, [])

  // console.log(data, data?.hits)
  console.log(error)

  return (
    <>
      {isLoading && <h1>Now Loading.....</h1>}
      {error && <p>{Object.keys(error)}</p>}
      {data?.hits && data.hits && data.hits.hits && data.hits.hits[0] && <p>{data.hits.hits[0]._source.type}</p>}
    </>
  )
}

export default BioProjectList
