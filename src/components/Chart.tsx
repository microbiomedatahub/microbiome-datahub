import { PlotData } from 'plotly.js'
import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import dataForPlotly from '../test.json'

type ChartMode = 'Species' | 'Genus' | 'Family' | 'Phylum'
const layout = { width: 640, height: 480, title: 'A Fancy Plot' }

const Chart = () => {
  const [chartMode, setChartMode] = useState<ChartMode>('Species')
  const chartClassName = (inputChartMode: ChartMode) => {
    return chartMode === inputChartMode
      ? 'chart__navigation__link current'
      : 'chart__navigation__link'
  }

  const [graphData, setGraphData] = useState(dataForPlotly)
  const fetchPlotData = async (chartMode: string) => {
    const bpid = 'PRJEB2054'
    const idStrings = bpid.match(/^([A-Z]{5})([0-9]+)$/)
    const numPart = idStrings[2]
    const dirName = idStrings[1] + numPart.padStart(6, '0')

    const res = await fetch(`https://mdatahub.org/data/project/${dirName}/analysis_${chartMode.toLowerCase()}.json`)
    const content = await res.json()

    const plotData = content.data.map((record) => {
      return record as Partial<PlotData>
    }) as Partial<PlotData>[]

    setGraphData(plotData)
  }
  useEffect(() => {
    fetchPlotData(chartMode)
  }, [chartMode])

  return (
    <section className='cart'>
      <nav className='chart__navigation'>
        {['Species', 'Genus', 'Family', 'Phylum'].map((item, i) => {
          return (
            <button
              key={`chart__navigation__link-${i}`}
              className={chartClassName(item as ChartMode)}
              onClick={() => setChartMode(item as ChartMode)}
            >
              {item}
            </button>
          )
        })}
      </nav>

      <article className='cart__content'>
        <h3 className='chart__title'>{chartMode}</h3>
        <p className='chart__description'>なにか、チャートに関する説明などがあれば表示する</p>
        <div className='chart__item'>
          <Plot data={graphData} layout={layout} />
        </div>
      </article>
    </section>
  )
}

export default Chart
