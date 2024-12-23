# User Manual for Microbiome Datahub

**Manual last updated**: 2024-12-24

This page describes how to explore Microbiome Datahub's [Facet-based metadata search](https://mdatahub.org/genomes). Microbiome Datahub offers two different metadata searches:

1. **Project Search**: Search BioProject by project metadata.
2. **Genome Search**: Search Genome (MAG) by genome metadata.

---

## General Usage

- On the left side of the Search page, you will find the facet-based metadata search.
- The toggle button allows you to turn each metadata search ON or OFF.
- After selecting and entering the search keyword, click the **SUBMIT** button to perform the search.
- The search results will appear on the right side.
- Without clicking the SUBMIT button, all entries will be displayed by default.
- Entries can be sorted by:
  - Data creation date in INSD
  - Modified date in INSD
  - Published date in INSD
  - Project or genome ID

---

## Project Search

- **Purpose**: Provides metadata search for metagenome BioProjects.
- **Data Source**: Shotgun metagenome BioProjects from INSD.
- **Searchable Criteria**:
  - Environment
  - Host taxon
  - Free keyword

### Key Features:
- **Indexed Data**: 102,174 project data entries are indexed and searchable.
- **Environment Annotation**: Environment information is annotated using the [NCBI Taxonomy metagenome classification](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=408169).
- **Metadata Download**: Project metadata can be downloaded in TSV format using the **Download** button.

---

## Genome Search

- **Purpose**: Provides metadata search for genome data (mainly MAGs).
- **Data Source**: Collects MAG data from INSD.
- **Searchable Criteria**:
  - Environment
  - Genome taxon
  - MAG completeness
  - Host taxon
  - Genome quality
  - Free keyword

### Key Features:
- **Indexed Data**: 218,248 genome data entries are indexed and searchable.
- **Environment Annotation**: Environmental information is annotated using the [NCBI Taxonomy metagenome classification](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=408169).
- **MAG Completeness**: Calculated using [CheckM](https://github.com/Ecogenomics/CheckM).
- **Genome Taxon**: Based on the taxonomic information from the original INSDC entry.
- **Quality Criteria**: Counts according to five criteria
  - The genome has a DFAST result.
  - Contamination rate < 10%.
  - Completeness > 60%.
  - Contig number < 30.
  - rRNA gene copies >2.
  - **"Quality not reviewed"** indicates the genome has not yet been analyzed by the Microbiome Datahub genome annotation pipeline.

### Data Downloads:
- Genome metadata
- Genome sequence
- Protein-coding gene sequences
- Protein sequences

---

## Project Page

- Describes the BioProject metadata obtained from INSD.
- Some projects include taxonomic composition data analyzed using [sourmash](https://github.com/sourmash-bio/sourmash) based on read data of each BioSample in the project.

---

## Genome Page

- Describes the genome metadata obtained from INSD.
- Includes:
  - [DFAST](https://dfast.ddbj.nig.ac.jp/) annotation summary
  - [DFAST_QC](https://github.com/nigyta/dfast_qc) analysis results
  - [MBGD Ortholog](https://mbgd.nibb.ac.jp/) list
  - [KEGG Orthology](https://www.genome.jp/kegg/ko.html) list
  - Bac2Feature phenotype inference results

---
