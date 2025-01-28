import { useSetAtom } from 'jotai'
import React, { useState, useEffect } from 'react'
import {Link, useLoaderData, useSearchParams} from 'react-router-dom'
import GenomeItems from '../components/GenomeItems'
import ProjectItems from '../components/ProjectItems'
import SearchForm from '../components/SearchForm'
import { MicrobiomeMode } from '../main'
import { selectModeAtom } from '../store/store'
import DownloadSelect from '../components/DownloadSelect'
import useSWRMutation from 'swr/mutation'

interface BioProjectListRequest {
  query: any
  from: number
  size?: number
  sort: SortQueriesInterface
  track_total_hits: boolean
}

interface SortQueriesInterface {
  [key: string]: {
    order: 'asc' | 'desc'
  }
}

const SearchResults = () => {
  const retrieveBioProject = async (url: string, {arg}: { arg: BioProjectListRequest }) => {
    console.log(import.meta.env.VITE_API_URL)
    const res = await fetch(import.meta.env.VITE_API_URL + `/api${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })

    return await res.json()
  }
  const { type } = useLoaderData() as MicrobiomeMode
  const {data, reset, trigger, error, isMutating} = useSWRMutation(`/${type}`, retrieveBioProject)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page') ?? '1'))
  }, [searchParams])

  useEffect(() => {
    reset()

    const queries = []
    if (searchParams.get('env')) {
      queries.push({match: {'_annotation.sample_organism': searchParams.get('env')}})
    }

    if (searchParams.get('genomeTaxon')) {
      queries.push({
        'bool': {
          'should': [
            { 'match': { 'organism': searchParams.get('genomeTaxon') } },
            { 'match': { 'properties.organism_name': searchParams.get('genomeTaxon') } }
          ]
        }
      })
    }

    if (searchParams.get('magCompleteness')) {
      queries.push({
        range: {
          '_annotation.completeness': {
            gte: parseInt(searchParams.get('magCompleteness') ?? ''),
          },
        },
      })
    }
    if (searchParams.get('hostTaxon')) {
      queries.push({match: {'_annotation.sample_host_organism': searchParams.get('hostTaxon')}})
    }
    if (searchParams.get('hostDisease')) {
      queries.push({match: {'_annotation.sample_host_disease': searchParams.get('hostDisease')}})
    }
    if (searchParams.get('hostLoc')) {
      queries.push({match: {'_annotation.sample_host_location': searchParams.get('hostLoc')}})
    }

    if (searchParams.get('temp')) {
      queries.push({
        range: {
          '_annotation.sample_temperature_range.min': {
            lt: parseInt(searchParams.get('temp') ?? ''),
          },
        },
      })
      queries.push({
        range: {
          '_annotation.sample_temperature_range.max': {
            gt: parseInt(searchParams.get('temp') ?? ''),
          },
        },
      })
    }

    if (searchParams.get('ph')) {
      queries.push({
        range: {
          '_annnotation.sample_ph_range.min': {
            lt: parseInt(searchParams.get('ph') ?? ''),
          },
        },
      })
      queries.push({
        range: {
          '_annotation.sample_ph_range.max': {
            gt: parseInt(searchParams.get('ph') ?? ''),
          },
        },
      })
    }

    if (searchParams.get('quality')) {
      queries.push({terms: {'quality': (searchParams.get('quality') ?? '0').split(',').map((item) => parseInt(item))}})
    }

    const qQueries = []
    if (searchParams.get('q')) {
      qQueries.push({
        wildcard: {
          'identifier.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'title.keyword': {
            value: `*${searchParams.get('q')}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'properties.assembly_accession.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'properties.bioproject.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
      qQueries.push({
        wildcard: {
          'properties.biosample.keyword': {
            value: `*${searchParams.get('q') ?? ''}*`,
          },
        },
      })
    }

    const sortQueries: SortQueriesInterface = {}
    if (searchParams.get('sort')) {
      const sortBy = searchParams.get('sort')?.slice(0, -1) ?? ''
      const sortOrder = searchParams.get('sort')?.slice(-1)

      sortQueries[sortBy] = {
        order: (sortOrder === '+' ? 'asc' : 'desc'),
      }
    } else {
      sortQueries['dateCreated'] = {order: 'desc'}
    }

    trigger({
      query: {bool: {must: queries, should: qQueries}},
      from: (currentPage - 1) * 10,
      size: 10,
      sort: sortQueries,
      track_total_hits: true,
    })
  }, [currentPage, searchParams])

  const setSelectMode = useSetAtom(selectModeAtom)
  const [checkedValues, setCheckedValues] = useState<string[]>([])
  const selectedData = checkedValues.join()

  const [checkedAll, setCheckedAll] = useState(false)
  const handleCheckedAll = () => {
    if (checkedValues.length > data?.hits?.hits?.length - 1) {
      setCheckedValues([])
    } else {
      data?.hits?.hits && setCheckedValues((prevCheckedValues) => {
        const newCheckedValues = data.hits.hits
          .map((item: { _id: string }) => item._id)
          .filter((id: string, index: number, self: string[]) => {
            return !prevCheckedValues.includes(id) && self.indexOf(id) === index
          })
        return [...prevCheckedValues, ...newCheckedValues]
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (checkedValues.includes(inputValue)) {
      setCheckedValues(checkedValues.filter((value) => value !== inputValue))
    } else {
      setCheckedValues([...checkedValues, inputValue])
    }
  }

  useEffect(() => {
    setCheckedAll(checkedValues.length >= data?.hits?.hits?.length)
  }, [checkedValues])

  useEffect(() => {
    setCheckedValues([])
  }, [currentPage])

  useEffect(() => setSelectMode(type), [type])

  return (
    <main className='app-main'>
      <nav>
        <ul className='tab-navigation'>
          <li className={`tab-navigation__link${type === 'project' ? ' current' : ''}`}>
            {type !== 'project' ? <Link to='/projects'>PROJECT</Link> : 'PROJECT'}
          </li>
          <li className={`tab-navigation__link${type === 'genome' ? ' current' : ''}`}>
            {type !== 'genome' ? <Link to='/genomes'>GENOME</Link> : 'GENOME'}
          </li>
        </ul>
      </nav>

      <SearchForm />

      <DownloadSelect
        type={type}
        selectedData={selectedData}
        handleCheckedAll={handleCheckedAll}
        checkedAll={checkedAll} />
      {
        type === 'project' &&
        <ProjectItems
          checkedValues={checkedValues}
          handleChange={handleChange}
          data={data}
          currentPage={currentPage}
          error={error}
          isMutating={isMutating} />
      }
      {
        type === 'genome' &&
        <GenomeItems
          checkedValues={checkedValues}
          handleChange={handleChange}
          data={data}
          currentPage={currentPage}
          isMutating={isMutating} />
      }
    </main>
  )
}

export default SearchResults
