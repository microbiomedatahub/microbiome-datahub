# User Manual for Microbiome Datahub Download API

**Manual last updated**: 2026-03-30

This page describes How to use Microbiome Datahub Download API. Microbiome Datahub provides six different download APIs:

1. **Download Project metadata**
2. **Download Genome metadata**
3. **Download Genome sequence**
4. **Download Genome protein-coding gene sequences**
5. **Download Genome protein sequences**
6. **Download KEGG Module list (JSON format) of the MAG**

---

## Download Project metadata API

**Usage example**
- Download single BioProject metadata
https://mdatahub.org/api/dl/project/metadata/PRJNA982417
- Download multiple BioProjects metadata
https://mdatahub.org/api/dl/project/metadata/PRJNA982417,PRJNA981657,PRJNA981705

---

## Download Genome metadata API

**Usage example**
- Download single genome metadata
https://mdatahub.org/api/dl/genome/metadata/GCA_000208265.2
- Download multiple genome metadata
https://mdatahub.org/api/dl/genome/metadata/GCA_000208265.2,GCA_001735855.1,GCA_001735875.1

---

## Download Genome sequence API

**Usage example**
- Download single genome sequence
https://mdatahub.org/api/dl/sequence/genome/GCA_000208265.2
- Download multiple genome sequences
https://mdatahub.org/api/dl/sequence/genome/GCA_000208265.2,GCA_001735855.1,GCA_001735875.1

---

## Download Genome protein-coding gene sequences API

**Usage example**
- Download protein-coding gene sequences from single genome
https://mdatahub.org/api/dl/sequence/cds/GCA_000208265.2
- Download protein-coding gene sequences from multiple genomes
https://mdatahub.org/api/dl/sequence/cds/GCA_000208265.2,GCA_001735855.1,GCA_001735875.1

---

## Download Genome protein sequences API

**Usage example**
- Download protein sequences from single genome
https://mdatahub.org/api/dl/sequence/protein/GCA_000208265.2
- Download protein sequences from multiple genomes
https://mdatahub.org/api/dl/sequence/protein/GCA_000208265.2,GCA_001735855.1,GCA_001735875.1

---

## Download the KEGG module list for genomes by inferring module presence from MBGD ortholog assignments via the API

**Usage example**
- Download KEGG Module list from single genome
https://mdatahub.org/api/genome/mbgd/GCA_029762515.1
The data is provided in JSON format.

---
