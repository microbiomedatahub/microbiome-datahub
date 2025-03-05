import {useAtomValue, useAtom} from 'jotai'
import React, { useState, useEffect } from 'react'
import {Link, useLoaderData, useSearchParams} from 'react-router-dom'
import GenomeItems from '../components/GenomeItems'
import ProjectItems from '../components/ProjectItems'
import SearchForm from '../components/SearchForm'
import { MicrobiomeMode } from '../main'
import {linkStringBaseGenomeAtom, linkStringBaseProjectAtom, selectedGenomeIdsAtom, selectedProjectIdsAtom, selectModeAtom} from '../store/store'
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
    const res = await fetch(`/api${url}`, {
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
  const linkStringGenome: string = useAtomValue(linkStringBaseGenomeAtom)
  const linkStringProject: string = useAtomValue(linkStringBaseProjectAtom)

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

    if (searchParams.get('dataSource')) {
      const matchQuery: { match: {'data_source': string}}[] = []
      const dataSources = searchParams.get('dataSource') ?? ''
      dataSources.split(',').forEach((item) => {
        matchQuery.push({ match: {'data_source': item}})
      })
      queries.push({'bool': {should: matchQuery}})
    }

    const qQueries = []
    if (searchParams.get('q')) {
      const searchWord = searchParams.get('q')
      qQueries.push({
        wildcard: {
          'identifier.keyword': `*${searchWord}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'title.keyword': `*${searchWord}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'organism.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'organization.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'properties.assembly_accession.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'properties.bioproject.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'properties.biosample.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'properties.species_taxid.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'properties.organism_name.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          'properties.seq_rel_date.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          '_annotation.sample_organism.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          '_annotation.sample_taxid.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          '_annotation.sample_host_organism.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          '_annotation.sample_host_disease.keyword': `*${searchWord ?? ''}*`,
        },
      })
      qQueries.push({
        wildcard: {
          '_annotation.sample_host_location.keyword': `*${searchWord ?? ''}*`,
        },
      })
      queries.push({'bool': {should: qQueries}})
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
      query: {bool: { must: queries}},
      from: (currentPage - 1) * 10,
      size: 10,
      sort: sortQueries,
      track_total_hits: true,
    })
  }, [currentPage, searchParams])

  const [selectMode, setSelectMode] = useAtom(selectModeAtom)
  const [selectedGenomeIds, setSelectedGenomeIds] = useAtom(selectedGenomeIdsAtom)
  const [selectedProjectIds, setSelectedProjectIds] = useAtom(selectedProjectIdsAtom)
  const [selectedData, setSelectedData] = useState('') //type === 'genome' ? selectedGenomeIds.join() : selectedProjectIds.join()
  const [checkedAll, setCheckedAll] = useState(false)

  const handleCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (data?.hits?.hits) {
      const items = data.hits.hits
        .map((item: { _id: string }) => item._id)
      if (checked) {
        type === 'genome' ?
          setSelectedGenomeIds((prevCheckedValues) => {
            return [...prevCheckedValues, ...items]
          }) :
          setSelectedProjectIds((prevCheckedValues) => {
            return [...prevCheckedValues, ...items]
          })
      } else {
        type === 'genome' ? setSelectedGenomeIds((prevIds: string[]) => {
          return prevIds.filter((id: string) => !items.some((item: string) => item === id))
        }) : setSelectedProjectIds((prevIds: string[]) => {
          return prevIds.filter((id: string) => !items.some((item: string) => item === id))
        })
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (type === 'genome' ? selectedGenomeIds.includes(inputValue) : selectedProjectIds.includes(inputValue)) {
      type === 'genome' ? setSelectedGenomeIds((prevIds: string[]) => {
        return prevIds.filter((id: string) => inputValue !== id)
      }) : setSelectedProjectIds((prevIds: string[]) => {
        return prevIds.filter((id: string) => inputValue !== id)
      })
    } else {
      type === 'genome' ? setSelectedGenomeIds((prevIds: string[]) => ([...prevIds, inputValue])) :
        setSelectedProjectIds((prevIds: string[]) => ([...prevIds, inputValue]))
    }
  }

  useEffect(() => {
    if (selectMode !== type) {
      setCheckedAll(false)
    }
    setSelectMode(type)
  }, [type])

  useEffect(() => {
    if (!data) return
    if (data?.hits?.hits) {
      const targetIds = type === 'genome' ? selectedGenomeIds : selectedProjectIds
      let count: number = 0
      data.hits.hits
        .map((item: { _id: string }) => item._id)
        .forEach((id: string) => {
          if (targetIds.includes(id)) {
            count++
          }
        })
      setCheckedAll(count === 10)
    }
    type === 'genome' ? setSelectedData(selectedGenomeIds.join()) : setSelectedData(selectedProjectIds.join())
  }, [data,selectedGenomeIds, selectedProjectIds])

  return (
    <main className='app-main'>
      <nav>
        <ul className='tab-navigation'>
          <li className={`tab-navigation__link${type === 'genome' ? ' current' : ''}`}>
            {type !== 'genome' ? <Link to={linkStringGenome}>GENOME</Link> : 'GENOME'}
          </li>
          <li className={`tab-navigation__link${type === 'project' ? ' current' : ''}`}>
            {type !== 'project' ? <Link to={linkStringProject}>PROJECT</Link> : 'PROJECT'}
          </li>
        </ul>
      </nav>

      <SearchForm />

      <DownloadSelect
        type={type}
        selectedData={selectedData}
        handleCheckedAll={handleCheckedAll}
        checkedAll={checkedAll}
      />
      {
        type === 'project' &&
        <ProjectItems
          handleChange={handleChange}
          data={data}
          currentPage={currentPage}
          error={error}
          isMutating={isMutating}
        />
      }
      {
        type === 'genome' &&
        <GenomeItems
          handleChange={handleChange}
          data={data}
          currentPage={currentPage}
          isMutating={isMutating}
        />
      }
    </main>
  )
}

export default SearchResults
