# UK Charity Data Scraper

This repository contains scripts for scraping, processing, and analysing data from UK charity websites.

## Repository Contents

- `bs.py` - Main script for scraping charity data from web pages.
- `charityToSort.py` - Processes pre-existing JSON data of charities, filtering entries based on specific criteria.
- `operations.py` - Contains utility functions used across the project for data manipulation and error reporting.
- `charityUrlList.json` - Sample JSON file containing URLs of charity websites to be scraped.
- `data.json` - Output file where processed charity data is stored in JSON format.

## Features

- **Data Scraping:** Extracts detailed information from specified charity web pages.
- **Data Filtering:** Filters charities based on the completeness of their data.
- **Error Reporting:** Reports on data completeness for each property across all scraped charities.
- **Output in JSON:** Structures all extracted data into a JSON file for easy use in data analysis or applications.

## Setup and Running the Scripts

### Prerequisites

- Python 3.x
- Libraries: `requests`, `json`, `beautifulsoup4`, `lxml`

You can install the required Python libraries using pip:

```bash
pip install requests beautifulsoup4 lxml
```
