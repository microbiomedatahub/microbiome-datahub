const DownloadSelect = () => {
  return (
    <div className="downloads">
      <input type="checkbox" id="allCheck" className="g-checkbox border"/>
      <label htmlFor="allCheck">Select</label>

      <details className="downlods__select">
        <summary className="downloads__button">Download</summary>
        <div className="downloads__type">
          <button className="downloads__item">metadata</button>
          <button className="downloads__item">genome sequence</button>
          <button className="downloads__item">gene sequence</button>
          <button className="downloads__item">protein sequence</button>
        </div>
      </details>
    </div>
  )
}
export default DownloadSelect
