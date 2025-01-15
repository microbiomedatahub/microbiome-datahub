# Microbiome Datahub

**Version:** 1.0  
**Datasets last updated:** 2024-12-24  

**Microbiome Datahub** is a metagenome database focused on metagenome-assembled genome (MAG) data and project metadata. Microbiome Datahub collects and indexes publicly available MAG data from the INSDC sequence repository.

---

## MAG Data in Microbiome Datahub

- Microbiome Datahub collects publicly available MAG DNA sequence data from the INSDC sequence repository.  
- All MAG sequences are re-annotated using the DFAST and DFAST_QC tools.  
- **Version 1** contains **218,653 MAGs**.

---

## Interfaces

Microbiome Datahub provides four interfaces for searching and retrieving data:

1. **Facet-based metadata search of MAGs**  
   [**Explore Here**](https://mdatahub.org/genomes)  
   Search MAG data by taxonomic name, environment, MAG quality, predicted phenotype, protein function, and more.



2. **Facet-based metadata search of Metagenome BioProject**  
   [**Explore Here**](https://mdatahub.org/projects)  
   Search Metagenome BioProject data by environment and host taxon.



3. **Sequence search by PZLAST-MAG**  
   [**Search Here**](https://pzlast.nig.ac.jp/pzlast/mag)  
   Search MAG data by protein sequences.



4. **Download API**

   **Examples:**  
   - [Download Genome sequence](https://mdatahub.org/api/dl/sequence/genome/GCA_029762495.1)  
   - [Download gene sequence](https://mdatahub.org/api/dl/sequence/cds/GCA_029762495.1)  
   - [Download protein sequence](https://mdatahub.org/api/dl/sequence/protein/GCA_029762495.1)  
   - [Download ortholog list JSON](https://mdatahub.org/api/genome/mbgd/GCA_029762495.1)  
   - [User Manual for Download API](https://mdatahub.org/apimanual)

---
