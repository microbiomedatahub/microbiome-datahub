# Microbiome Datahub
Version: 1.2

Datasets last updated: 2025-08-29.
Metagenome / Microbes Environmental Ontology (MEO)-based environmental annotations are available for MAGs.

Datasets update: 2025-06-24.
The Bac2Feature phenotype inference results for the isolate genomes and MAGs are now available.

**Microbiome Datahub** is a metagenome database focused on metagenome-assembled genome (MAG) data and project metadata. Microbiome Datahub collects and indexes publicly available MAG data from the INSDC sequence repository.

---
## MAG

**MAG** (Metagenome-Assembled Genome) is a microbial genome information reconstructed from metagenomic sequencing data. Most of MAG sequences are draft genomes of microbial strains found in the environment. MAG sequences are reconstructed by assembling sequence reads (short or long reads) and binning the contigs based on sequence patterns or abundance information. MAG sequences are important for understanding microbial genomic diversity, including uncultured taxa.

## MAG Data in Microbiome Datahub

- Microbiome Datahub collects publicly available MAG DNA sequence data from the INSDC sequence repository.  
- All MAG sequences are re-annotated using the DFAST and DFAST_QC tools.  
- **Version 1** contains **218,653 MAGs**.

---

## Interfaces

Microbiome Datahub provides four interfaces for searching and retrieving data:

**1. Facet-based metadata search**

   - [Explore Here](https://mdatahub.org/genomes)
     - Search MAG data by taxonomic name, environment, MAG quality, predicted phenotype, protein function, and more.

**2. Sequence search by PZLAST-MAG**

   - [Search Here](https://pzlast.nig.ac.jp/pzlast/mag) 
    - Search MAG data by protein sequences.

**3. Download API**
   - Examples
   - [Download Genome sequence](https://mdatahub.org/api/dl/sequence/genome/GCA_029762495.1). 
   - [Download gene sequence](https://mdatahub.org/api/dl/sequence/cds/GCA_029762495.1).
   - [Download protein sequence](https://mdatahub.org/api/dl/sequence/protein/GCA_029762495.1).
   - [Download KEGG Module list (JSON format) of the MAG](https://mdatahub.org/api/genome/mbgd/GCA_029762495.1).
   - [User Manual for Download API](https://mdatahub.org/apimanual).

**4. Bulk download**
   - MAG metadata, phenotype prediction results, and the KEGG Module composition inference results are available in Zenodo [Microbiome Datahub dataset](https://zenodo.org/records/18073262)
   - MAG DNA sequences and protein sequences are available in [our download web server](http://palaeo.nig.ac.jp/Resources/MDatahub/2025/)

---

## Microbiome Datahub Project Team

The construction and maintenance of Microbiome Datahub is a collaborative effort of the [team members](https://github.com/microbiomedatahub/microbiome-datahub/blob/main/docs/projectmember.md).

Please contact us if you have any questions:

- Email: `hmori [at] nig.ac.jp`
---

## Funding

Microbiome Datahub is supported by **JST NBDC Grant Number JPMJND2202** in the [Database Integration Coordination Program (DICP)](https://biosciencedbc.jp/en/funding/program/dicp/).

---

## References

Mori H, Fujisawa T, Higashi K, Tanizawa Y, Nakagawa Z, Nishide H, Fujiyoshi M, Nakamura Y, Uchiyama I, Matsui M, Yamada T. Microbiome Datahub: an open-access platform integrating environmental metadata, taxonomy, and functional annotation for comprehensive metagenome-assembled genome datasets. Microbiome. 2026 in press, doi: [10.1186/s40168-026-02385-x](https://link.springer.com/article/10.1186/s40168-026-02385-x)

All data on Microbiome Datahub is distributed under the **CC-BY 4.0 license**. When using the data and website, please cite Microbiome Datahub.
