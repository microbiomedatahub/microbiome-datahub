# User Manual for Microbiome Datahub

**Manual last updated**: 2025-06-24

This page describes how to explore Microbiome Datahub's [Facet-based metadata search](https://mdatahub.org/genomes). Microbiome Datahub offers two different metadata searches:

1. **Project Search**: Search BioProject by project metadata.
2. **Genome Search**: Search Genome (MAG) by genome metadata.

---

## MAG

**MAG** (Metagenome-Assembled Genome) is microbial genome information reconstructed from metagenomic sequencing data.  
Most MAG sequences are draft genomes of microbial strains found in the environment.  
MAG sequences are reconstructed by assembling sequence reads (short or long reads) and binning the contigs based on sequence patterns or abundance information.  
MAG sequences are important for understanding microbial genomic diversity, including uncultured taxa.

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
- **Data Source**:
  - MAG data from INSD.
  - RefSeq representative/reference prokaryotic genomes.
- **Searchable Criteria**:
  - Environment
  - Genome taxon
    - NCBI taxonomy -based search (e.g., Escherichia coli)
    - GTDB-based search (You need to specify prefix e.g., p__Bacteroidota, c__Gammaproteobacteria, o__Bacteroidales, f__Bacteroidaceae, g__Escherichia)
  - MAG completeness
  - Host taxon
  - Genome quality
  - Free keyword

### Key Features:
- **Indexed Data**:
  - 218,653 genome data entries are indexed and searchable.
  - 26,076 prokaryotic isolate genome data from RefSeq representative/reference genomes are indexed and searchable.
- **Environment Annotation**: Environmental information is annotated using the [NCBI Taxonomy metagenome classification](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=408169).
- **MAG Completeness**: Calculated using [CheckM](https://github.com/Ecogenomics/CheckM).
- **Genome Taxon**:
  - Based on the taxonomic information from the original INSDC entry.
  - ・Inferred using [GTDB-Tk](https://github.com/Ecogenomics/GTDBTk) referred the [GTDB](https://gtdb.ecogenomic.org/) version 220. 
- **Quality Criteria**: Counts according to five criteria
  - The genome has a DFAST result.
  - Contamination rate < 10%.
  - Completeness > 60%.
  - Contig number < 30.
  - rRNA gene copies >2.
  - "Quality not reviewed" indicates the genome has not yet been analyzed by the Microbiome Datahub genome annotation pipeline.
- **Phenotype information inferred by Bac2Feature**: The phenotypes of all MAGs and isolate genomes in the Microbiome Datahub were inferred using [Bac2Feature](https://github.com/fuyo780/Bac2Feature), a tool that predicts 27 phenotypic traits from the taxonomic information of each genome. If the value is blank, it indicates that Bac2Feature was unable to predict the phenotype for the isolate genome or MAG. The 27 phenotypes are:
  - Continuous traits
    - Cell diameter (log scaling)
    - Cell length (log scaling)
    - Doubling time (log_10 hours)
    - Growth temperature (Degrees C)
    - Optimum growth temperature (Degrees C)
    - Optimum_ph
    - Genome size (Base Pair)
    - GC content (Percentage)
    - Coding genes, 16S rRNA genes, tRNA genes (Number)
  - Categorical traits (All traits are predicted yes (=1) or no (=0).)
    - Gram stain
    - Sporulation
    - Motility
    - Salinity range
    - Respiration (facultative, anaerobic, aerobic)
    - Temperature range (mesophilic, thermophilic, psychrophilic)
    - Cell shape (bacillus, coccus, filament, coccobacillus, vibrio, spiral)
    For more information on each phenotype, see the [Bac2Feature paper](https://doi.org/10.1093/bioadv/vbaf136).
- **Homolog information of the MAGs**: Assignment of MBGD ortholog cluster IDs to each protein sequence in the MAGs was performed using sequence similarity search via [PZLAST-MAG](https://pzlast.nig.ac.jp/pzlast/mag). For each MAG, the following information is provided:
  - the [MBGD](https://mbgd.nibb.ac.jp/) ortholog cluster ID 
  - the number of genes assigned to the cluster
  - the functional description of the MBGD ortholog cluster
  - the corresponding [KEGG Orthology](https://www.genome.jp/kegg/ko.html) ID linked via MBGD

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
- In addition, Microbiome Datahub performs these analyses and makes the analysis results available to users:
  - [DFAST](https://dfast.ddbj.nig.ac.jp/) annotation summary
  - [DFAST_QC](https://github.com/nigyta/dfast_qc) analysis results
  - [MBGD Ortholog](https://mbgd.nibb.ac.jp/) cluster ID list
  - [KEGG Orthology](https://www.genome.jp/kegg/ko.html) list infered from MBGD ortholog cluster ID
  - [Bac2Feature](https://github.com/fuyo780/Bac2Feature) phenotype inference results

---

## Microbiome Datahub Project Team

The construction and maintenance of Microbiome Datahub is a collaborative effort of the [team members](https://github.com/microbiomedatahub/microbiome-datahub/blob/main/docs/projectmember.md).

---

**Contact us:**  

Email: `hmori [at] nig.ac.jp`

---

## Funding

Microbiome Datahub is supported by **JST NBDC Grant Number JPMJND2202** in the [Database Integration Coordination Program (DICP)](https://biosciencedbc.jp/en/funding/program/dicp/).

---

## References

Coming soon.

All data on Microbiome Datahub is distributed under the **CC-BY 4.0 license**.

   
> Microbiome Datahub: a metagenome database focused on the metagenome-assembled genomes, [https://mdatahub.org/](https://mdatahub.org/)

---
