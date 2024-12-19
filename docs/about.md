# Microbiome Datahub

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

---

## Cite Us

All data on Microbiome Datahub is distributed under the **CC-BY 4.0 license**. When using the data and website, please cite Microbiome Datahub as follows:

> Microbiome Datahub: a metagenome database focused on the metagenome-assembled genomes, [https://mdatahub.org/](https://mdatahub.org/)

---

## Contact Us

Please contact us if you have any questions:

- Email: `hmori [at] nig.ac.jp`

---

## Microbiome Datahub Project Team

The construction and maintenance of Microbiome Datahub is a collaborative effort of the following members:

- **Dr. Hiroshi Mori** (Project Head): Department of Informatics, National Institute of Genetics, Japan.
- **Dr. Takatomo Fujisawa**: DDBJ, National Institute of Genetics, Japan.
- **Dr. Koichi Higashi**: Department of Informatics, National Institute of Genetics, Japan.
- **Dr. Takuji Yamada**: Department of Life Science and Technology, Institute of Science Tokyo, Japan.
- **Dr. Ikuo Uchiyama**: Laboratory of Genome Informatics, National Institute for Basic Biology, Japan.
- **Dr. Motomu Matsui**: Institute for Chemical Research, Kyoto University, Japan.
- **Dr. Yasuhiro Tanizawa**: DDBJ, National Institute of Genetics, Japan.
- **Dr. Yasukazu Nakamura**: DDBJ, National Institute of Genetics, Japan.
- **Ms. Hiroyo Nishide**: Laboratory of Genome Informatics, National Institute for Basic Biology, Japan.
- **Dr. Mikihiko Kawai**: Laboratory of Genome Informatics, National Institute for Basic Biology, Japan.
- **Mr. Zenichi Nakagawa**: Department of Life Science and Technology, Institute of Science Tokyo, Japan.
- **Dr. Takao Suzuki**: Department of Integrated Biosciences, Graduate School of Frontier Sciences, the University of Tokyo, Japan.
- **Dr. Yuki Nishimura**: Department of Integrated Biosciences, Graduate School of Frontier Sciences, the University of Tokyo, Japan.

---

## Funding

Microbiome Datahub is supported by **JST NBDC Grant Number JPMJND2202** in the Database Integration Coordination Program (DICP).

---

## References

Coming soon.
