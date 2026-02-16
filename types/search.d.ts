type CheckItemString = {
  id: string
  name: string
  displayValue: string
  value: string
}

type SearchResultHit = {
  _id: string
  _source: {
    title: string
    dateCreated: string
    identifier: string
    _annotation: {
      sample_organism: string[]
      sample_host_organism: string[]
      sample_count: number
      data_size: string
    }
  }
}

type SearchResultsResponse = {
  hits?: {
    total?: {
      value: number
    }
    hits?: SearchResultHit[]
  }
}
