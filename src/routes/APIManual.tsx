import React, { useState, useEffect } from 'react'
import '../css/document.css'
import ReactMarkdown from 'react-markdown'

const Documents = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/microbiomedatahub/microbiome-datahub/main/docs/apimanual.md'
        )
        if (!res.ok) {
          throw new Error('Failed to fetch the document')
        }
        const text = await res.text()
        setContent(text)
      } catch (err:unknown) {
        if (err instanceof Error){
          setError(err.message)
        }
        console.error('Fetching error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // 空の依存配列を指定して、コンポーネントのマウント時にのみフェッチする

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className="app-main documents">
      <ReactMarkdown className="markdown-body">{content}</ReactMarkdown>
    </main>
  )
}

export default Documents
