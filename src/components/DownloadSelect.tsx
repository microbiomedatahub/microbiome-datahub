import React from 'react'

const DownloadSelect = (
  { type, selectedData, handleCheckedAll, checkedAll }:
    { type: string;
      selectedData: string;
      handleCheckedAll: () => void;
      checkedAll: boolean }
) => {
  let downloadItems: JSX.Element | null = null

  switch (type) {
  case 'project':
    downloadItems = (
      <>
        <a href={`https://mdatahub.org/api/dl/project/metadata/${selectedData}`} download className="downloads__item">
          metadata
        </a>
        {/* <a download className="downloads__item">taxonomic composition</a> */}
      </>
    )
    break
  case 'genome':
    downloadItems = (
      <>
        <a href={`https://mdatahub.org/api/dl/genome/metadata/${selectedData}`} download className="downloads__item">
          metadata
        </a>
        <a href={`https://mdatahub.org/api/dl/sequence/genome/${selectedData}`} download className="downloads__item">genome sequence</a>
        <a href={`https://mdatahub.org/api/dl/sequence/cds/${selectedData}`} download className="downloads__item">gene sequence</a>
        <a href={`https://mdatahub.org/api/dl/sequence/protein/${selectedData}`} download className="downloads__item">protein sequence</a>
      </>
    )
    break
  default:
    break
  }

  return (
    <div className="downloads">
      <input type="checkbox" onChange={ handleCheckedAll } checked={checkedAll} id="allCheck" className="g-checkbox border"/>
      <label htmlFor="allCheck">Select</label>

      <details className="downlods__select">
        <summary className="downloads__button">Download</summary>
        <div className="downloads__type">
          {downloadItems}
        </div>
      </details>
    </div>
  )
}
export default DownloadSelect
