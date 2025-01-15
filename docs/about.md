# Microbiome Datahub

<span style="font-size: 1.2em; font-weight: bold;">Version:</span> 1.0  
<span style="font-size: 1.2em; font-weight: bold;">Datasets last updated:</span> 2024-12-24  

<p style="line-height: 1.6;">
<strong>Microbiome Datahub</strong> is a metagenome database focused on metagenome-assembled genome (MAG) data and project metadata. Microbiome Datahub collects and indexes publicly available MAG data from the INSDC sequence repository.
</p>

---

## MAG

<p style="line-height: 1.6;">
<strong>MAG</strong> (Metagenome-Assembled Genome) is microbial genome information reconstructed from metagenomic sequencing data. Most MAG sequences are draft genomes of microbial strains found in the environment. MAG sequences are reconstructed by assembling sequence reads (short or long reads) and binning the contigs based on sequence patterns or abundance information. MAG sequences are important for understanding microbial genomic diversity, including uncultured taxa.
</p>

---

## MAG Data in Microbiome Datahub

<ul>
  <li>Microbiome Datahub collects publicly available MAG DNA sequence data from the INSDC sequence repository.</li>
  <li>All MAG sequences are re-annotated using the DFAST and DFAST_QC tools.</li>
  <li><strong>Version 1</strong> contains <strong>218,653 MAGs</strong>.</li>
</ul>

---

## Interfaces

<p style="line-height: 1.6;">
Microbiome Datahub provides four interfaces for searching and retrieving data:
</p>

<ol>
  <li>
    <strong>Facet-based metadata search of MAGs</strong>  
    <a href="https://mdatahub.org/genomes" style="color: blue; text-decoration: underline;"><strong>Explore Here</strong></a>  
    Search MAG data by taxonomic name, environment, MAG quality, predicted phenotype, protein function, and more.
  </li>
  <li>
    <strong>Facet-based metadata search of Metagenome BioProject</strong>  
    <a href="https://mdatahub.org/projects" style="color: blue; text-decoration: underline;"><strong>Explore Here</strong></a>  
    Search Metagenome BioProject data by environment and host taxon.
  </li>
  <li>
    <strong>Sequence search by PZLAST-MAG</strong>  
    <a href="https://pzlast.nig.ac.jp/pzlast/mag" style="color: blue; text-decoration: underline;"><strong>Search Here</strong></a>  
    Search MAG data by protein sequences.
  </li>
  <li>
    <strong>Download API</strong>  
    <p style="margin-left: 20px;">
    <strong>Examples:</strong>
    </p>
    <ul>
      <li><a href="https://mdatahub.org/api/dl/sequence/genome/GCA_029762495.1" style="color: blue; text-decoration: underline;">Download Genome sequence</a></li>
      <li><a href="https://mdatahub.org/api/dl/sequence/cds/GCA_029762495.1" style="color: blue; text-decoration: underline;">Download gene sequence</a></li>
      <li><a href="https://mdatahub.org/api/dl/sequence/protein/GCA_029762495.1" style="color: blue; text-decoration: underline;">Download protein sequence</a></li>
      <li><a href="https://mdatahub.org/api/genome/mbgd/GCA_029762495.1" style="color: blue; text-decoration: underline;">Download ortholog list JSON</a></li>
      <li><a href="https://mdatahub.org/apimanual" style="color: blue; text-decoration: underline;">User Manual for Download API</a></li>
    </ul>
  </li>
</ol>

---

## Microbiome Datahub Project Team

<p style="line-height: 1.6;">
The construction and maintenance of Microbiome Datahub is a collaborative effort of the <a href="https://github.com/microbiomedatahub/microbiome-datahub/blob/main/docs/projectmember.md" style="color: blue; text-decoration: underline;">team members</a>.
</p>

<p style="line-height: 1.6;">
<strong>Contact us:</strong>  
Email: <code>hmori [at] nig.ac.jp</code>
</p>

---

## Funding

<p style="line-height: 1.6;">
Microbiome Datahub is supported by <strong>JST NBDC Grant Number JPMJND2202</strong> in the <a href="https://biosciencedbc.jp/en/funding/program/dicp/" style="color: blue; text-decoration: underline;">Database Integration Coordination Program (DICP)</a>.
</p>

---

## References

<p style="line-height: 1.6;">Coming soon.</p>

<p style="line-height: 1.6;">
All data on Microbiome Datahub is distributed under the <strong>CC-BY 4.0 license</strong>.
</p>

<blockquote>
Microbiome Datahub: a metagenome database focused on the metagenome-assembled genomes, <a href="https://mdatahub.org/" style="color: blue; text-decoration: underline;">https://mdatahub.org/</a>
</blockquote>
