# Microbiome Datahub version 1
Datasets last updated: 2024-12-20

**Microbiome Datahub** is a metagenome database focused on metagenome-assembled genome (MAG) data and project metadata. Microbiome Datahub collects and indexes publicly available MAG data from the INSDC sequence repository.

---

## MAG

**MAG** (Metagenome-Assembled Genome) is a microbial genome information reconstructed from metagenomic sequencing data. Most of MAG sequences are draft genomes of microbial strains found in the environment. MAG sequences are reconstructed by assembling sequence reads (short or long reads) and binning the contigs based on sequence patterns or abundance information. MAG sequences are important for understanding microbial genomic diversity, including uncultured taxa.

---

## MAG Data in Microbiome Datahub

- Microbiome Datahub collects publicly available MAG DNA sequence data from the INSDC sequence repository.
- All MAG sequences are re-annotated using the [DFAST](https://dfast.ddbj.nig.ac.jp/) and [DFAST_QC](https://github.com/nigyta/dfast_qc) tools.
- **Version 1** contains **218,653 MAGs**.

---

## Interfaces

Microbiome Datahub provides three interfaces for searching and retrieving data:

1. **Facet-based metadata search** ([Explore Here](https://mdatahub.org/genomes))
   - Search MAG data by taxonomic name, environment, MAG quality, predicted phenotype, protein function, and more.

2. **Sequence search by PZLAST-MAG** ([Search Here](https://pzlast.nig.ac.jp/pzlast/mag))
   - Search MAG data by protein sequences.

3. **Download API**
   - Examples
   - [Download Genome sequence](https://mdatahub.org/api/dl/sequence/genome/GCA_029762495.1).
   - [Download gene sequence](https://mdatahub.org/api/dl/sequence/cds/GCA_029762495.1).
   - [Download protein sequence](https://mdatahub.org/api/dl/sequence/protein/GCA_029762495.1).
   - [Download API manual](apimanual.md).

---

## Microbiome Datahub Project Team

The construction and maintenance of Microbiome Datahub is a collaborative effort of the [team members](projectmember.md).

Please contact us if you have any questions:

- Email: `hmori [at] nig.ac.jp`
---

## Funding

Microbiome Datahub is supported by **JST NBDC Grant Number JPMJND2202** in the [Database Integration Coordination Program (DICP)](https://biosciencedbc.jp/en/funding/program/dicp/).

---

## References

Coming soon.

All data on Microbiome Datahub is distributed under the **CC-BY 4.0 license**. When using the data and website, please cite Microbiome Datahub as follows:

> Microbiome Datahub: a metagenome database focused on the metagenome-assembled genomes, [https://mdatahub.org/](https://mdatahub.org/)

