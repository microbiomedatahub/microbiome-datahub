import '../css/document.css'
const Document = () => {
  return (
    <main className='app-main'>
      <h1 className="title--h1">Document</h1>

      <section className="section">
        <h2 className="title--h2">Microbiome Datahub Documentation</h2>
        <p className='text'>
          Microbiome Datahub is a metagenome database focused on metagenome projects and metagenome assembled genomes (MAGs) data. MAGs data are rapidly accumulating due to their importance in describing microbial genome diversity. Microbiome Datahub collects and indexes publicly available MAG data in collaboration with the DNA Databank of Japan (DDBJ). This document describes the Microbiome Datahub web content and some use cases.
        </p>

        <section className="section">
          <h3 className="title--h3">About Microbiome Datahub</h3>
          <p className="text-bold">License</p>
          <p className="text">
            The Microbiome Datahub is a freely available database for searching and comparing metagenome projects and MAG data. The data in Microbiome Datahub are licensed under the Creative Commons Attribution 4.0 International Public License.<br/>
            Microbiome Datahub data contents overview<br/>
            Microbiome project data<br/>
            Microbiome Datahub indexes INSDC BioProject data of shotgun metagenome. The metagenome BioProject data are acquired and the environmental metadata are automatically annotated with ontologies. The annotated metagenome BioProject data are converted to JSON format. Exploration of microbiome projects by searching the environmental metadata of the BioProject entries is provided in the PROJECT search facet.
          </p>
        </section>

        <section className="section">
          <h3 className="title--h3">FAQs</h3>
          <dl className="list-faq">
            <dt className="list-faq__q">
              What types of microbiome data are available in Microbiome Datahub?
            </dt>
            <dd className="list-faq__a">
              We collect publicly available shotgun metagenome project data and MAG data. Currently, 16S rRNA gene amplicon sequencing data, ITS region amplicon sequencing data, viral and fungal MAG data are not indexed.
            </dd>
            <dt className="list-faq__q">
              What types of microbiome data are available in Microbiome Datahub?
            </dt>
            <dd className="list-faq__a">
              We collect publicly available shotgun metagenome project data and MAG data. Currently, 16S rRNA gene amplicon sequencing data, ITS region amplicon sequencing data, viral and fungal MAG data are not indexed.
            </dd>
          </dl>
        </section>
      </section>
    </main>
  )
}
export default Document
