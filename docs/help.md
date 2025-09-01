# User Manual for Microbiome Datahub

**Manual last updated**: 2025-08-29

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
  - Data creation date in INSD (International Nucleotide Sequence Database: public sequence repositories)
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
- **Environment Annotation**: Environmental information is manually annotated using the [Metagenome / Microbes Environmental Ontology (MEO)](https://bioportal.bioontology.org/ontologies/MEO).
  - The MEO ontology is developed and maintained by our team.
  - Environmental information was extracted from the INSDC BioSample and BioProject databases associated with each MAG.
  - Up to two MEO classes were manually annotated to each MAG. 
- **MAG Completeness**: Calculated using [CheckM](https://github.com/Ecogenomics/CheckM). The completeness and contamination % were calculated.
- **Genome Taxon**:
  - Based on the taxonomic information from the original INSDC entry.
  - Inferred using [GTDB-Tk](https://github.com/Ecogenomics/GTDBTk) referred the [GTDB](https://gtdb.ecogenomic.org/) version 220. 
- **Quality Criteria**: Counts according to five criteria
  - The genome has a DFAST result.
  - Contamination rate < 10%.
  - Completeness > 60%.
  - Contig number < 30.
  - rRNA gene copies >2.
  - "Quality not reviewed" indicates the genome has not yet been analyzed by the Microbiome Datahub genome annotation pipeline.
- **Phenotype information inferred by Bac2Feature**: The phenotypes of all MAGs and isolate genomes in the Microbiome Datahub were inferred using [Bac2Feature](https://github.com/fuyo780/Bac2Feature), a tool that predicts 27 phenotypic traits from the taxonomic information of each genome. If the value is blank, it indicates that Bac2Feature was unable to predict the phenotype for the isolate genome or MAG. The 27 phenotypes are:
  - Continuous traits
    - Cell diameter (log 10 micrometer)
    - Cell length (log 10 micrometer)
    - Doubling time (log 10 hours)
    - Growth temperature (Degrees C)
    - Optimum growth temperature (Degrees C)
    - Optimum ph
    - Genome size (Base pairs)
    - GC content (Percentage)
    - Coding genes, 16S rRNA genes, tRNA genes (Number)
  - Categorical traits (All traits were predicted probability: 0–1; 1 means yes, 0 means no)
    - Gram stain
    - Sporulation
    - Motility
    - Salinity range
    - Respiration (facultative, anaerobic, aerobic)
    - Temperature range (mesophilic, thermophilic, psychrophilic)
    - Cell shape (bacillus, coccus, filament, coccobacillus, vibrio, spiral)
    For more information on each phenotype, see the [Bac2Feature paper](https://doi.org/10.1093/bioadv/vbaf136). Phenotype prediction was attempted sequentially at the species, genus, and family levels; once a phenotype could be assigned at a given taxonomic level, prediction at higher ranks was not performed.

- **Homolog information of the MAGs**: Assignment of MBGD ortholog cluster IDs to each protein sequence in the MAGs was performed using sequence similarity search via [PZLAST-MAG](https://pzlast.nig.ac.jp/pzlast/mag). For each MAG, the following information is provided:
  - the [MBGD](https://mbgd.nibb.ac.jp/) ortholog cluster ID 
  - the number of genes assigned to the cluster
  - the functional description of the MBGD ortholog cluster
  - the corresponding [KEGG Orthology (KO)](https://www.genome.jp/kegg/ko.html) ID linked via MBGD
  - the KEGG Module ID list assigned from the KO list of the MAG by using the [Genomaple](https://mbgd.nibb.ac.jp/docs/?MBGD/Genomaple) tool from MBGD.

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
  - [DFAST_QC](https://github.com/nigyta/dfast_qc) analysis results including CheckM
  - [GTDB-Tk](https://github.com/Ecogenomics/GTDBTk) taxonomic inference results
  - [MBGD Ortholog](https://mbgd.nibb.ac.jp/) cluster ID list
  - [KEGG Orthology (KO)](https://www.genome.jp/kegg/ko.html) list infered from MBGD ortholog cluster ID
  - [KEGG Module](https://www.genome.jp/kegg/module.html) list calculated from the Genomaple tool of MBGD using the KO list of the MAG
  - [Bac2Feature](https://github.com/fuyo780/Bac2Feature) phenotype inference results
  - [MEO](https://bioportal.bioontology.org/ontologies/MEO) manual annotation for each MAG environment

---

## Data bulk download

- MAG metadata are available in Zenodo [Microbiome Datahub MAG dataset](https://doi.org/10.5281/zenodo.16990662)
  - The basic MAG metadata including
    - sequence length, contig number, CDS number
    - assigned MBGD ortholog cluster and KEGG Orthology numbers
    - CheckM completeness and contamination %
    - GTDB-Tk taxonomic assignment result
    - BioProject and BioSample ID of the MAG
    - MEO annotation result
    - Host NCBI Taxonomy annotation result
  - The Bac2Feature phenotype inference result is in the separate Excel file.
  - The KEGG Module composition matrix for these MAGs, inferred using MBGD ortholog composition is also in a TSV file.
    - These module label list is also in a TSV file.

- MAG DNA sequences and protein sequences are available in [our download web server](http://palaeo.nig.ac.jp/Resources/MDatahub/2025/)
  - 20250810AllMAG.fasta.gz (146 GB)
    - All MAG DNA sequence FASTA file: This file contains all contig sequences from all MAGs (218,653) in the Microbiome Datahub.
  - 20250810AllMAG.rm.tsv.gz (287 MB)
    - Contig information TSV file: This file provides the corresponding MAG GCA ID information for each contig.
  - AllMergedMDatahubProtein.faa.gz (79 GB)
    - All MAG protein sequence FASTA file: This file contains all predicted protein sequences (454,799,231) from all MAGs in the Microbiome Datahub.
  - AllMergedMDatahubProtein.rm.tsv.gz (7 GB)
    - Protein information TSV file: This file provides the corresponding MAG GCA ID information for each protein
  - clusterRes_rep_seq.fasta.gz (33 GB)
    - 90% protein sequence cluster representative FASTA file: This file, generated using LinClust, contains representative sequences for 192,557,564 protein clusters.

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
