import { Layout, PlotData } from 'plotly.js'
import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

type ChartMode = 'Species' | 'Genus' | 'Family' | 'Phylum'
const layout: Partial<Layout> = {
  width: 900,
  height: 480,
  title: 'A Fancy Plot',
  barmode: 'stack',
  legend: { traceorder: 'normal' },
}

const Chart = ({ id }: { id: string }) => {
  const [chartMode, setChartMode] = useState<ChartMode>('Species')
  const chartClassName = (inputChartMode: ChartMode) => {
    return chartMode === inputChartMode
      ? 'chart__navigation__link current'
      : 'chart__navigation__link'
  }

  const [graphData, setGraphData] = useState<Partial<PlotData>[] | null>(null)
  const fetchPlotData = async (chartMode: string) => {
    const bpid = id
    const idStrings = bpid.match(/^([A-Z]{5})([0-9]+)$/)
    const numPart = (idStrings as RegExpMatchArray)[2]
    const dirName = (idStrings as RegExpMatchArray)[1] + numPart.padStart(6, '0')

    try {
      const res = await fetch(`/data/project/${dirName}/analysis_${chartMode.toLowerCase()}.json`)
      if (!res.ok) {
        setGraphData(null)
        return
      }

      const content = await res.json()

      const plotData = content.data.map((record: any) => {
        return record as Partial<PlotData>
      }) as Partial<PlotData>[]

      setGraphData(plotData)
    } catch {
      setGraphData(null)
    }
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
        {graphData
          ? (
            <div className='chart__item'>
              <Plot data={graphData} layout={layout} />
            </div>
          )
          : <p className='chart__description'>表示するグラフのデータがありません</p>}
      </article>
    </section>
  )
}

export default Chart
