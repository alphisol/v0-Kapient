# Server Health Data Sources

This document maps each component of the Server Health dashboard to its corresponding data source, specifying which API or tool from our stack provides that specific data point or identifies each issue.

## Overview

| Component | Data Source | Notes |
|-----------|-------------|-------|
| Overall Server Health Score | Aggregated | Calculated as a weighted average from all categories |
| Server Stack Information | Wappalyzer | Detected via technology fingerprinting |

## SSL/TLS Health

| Issue/Metric | Data Source | API/Method | Notes |
|--------------|-------------|-----------|-------|
| SSL Certificate Expiration | Puppeteer | SSL Check | Connects to the site and extracts certificate information |
| Mixed Content Issues | Lighthouse | Security Audit | Scans pages for HTTP resources loaded on HTTPS pages |
| Weak Cipher Suites | Puppeteer | SSL Check | Analyzes server SSL configuration |
| SSL Score Calculation | Custom Algorithm | N/A | Weighted score based on critical issues found |

## DNS Health

| Issue/Metric | Data Source | API/Method | Notes |
|--------------|-------------|-----------|-------|
| DNS Resolution Speed | Custom DNS Check | DNS Lookup API | Measures time to resolve domain name |
| Missing DNS Records | Custom DNS Check | DNS Record API | Checks for presence of SPF, DMARC, etc. |
| DNS Configuration Issues | Custom DNS Check | DNS Validation API | Validates proper DNS setup |
| DNS Score Calculation | Custom Algorithm | N/A | Weighted score based on issues found |

## Server Performance

| Issue/Metric | Data Source | API/Method | Notes |
|--------------|-------------|-----------|-------|
| Time to First Byte (TTFB) | Lighthouse | Performance Metrics | Measures server response time |
| Server Errors (5xx) | Puppeteer | HTTP Status Check | Crawls site and checks for error status codes |
| Server Response Time | Lighthouse | Performance Metrics | Measures time until server starts sending response |
| Load Balancing Issues | Custom Server Check | Load Test API | Tests server response under load |
| Server Score Calculation | Custom Algorithm | N/A | Weighted score based on performance metrics |

## Security

| Issue/Metric | Data Source | API/Method | Notes |
|--------------|-------------|-----------|-------|
| Missing Security Headers | Puppeteer | Header Analysis | Checks for presence of security headers |
| Outdated Server Software | Wappalyzer | Version Detection | Identifies software versions and compares to latest |
| Vulnerability Scanning | OWASP ZAP | Automated Scan | Scans for common security vulnerabilities |
| Security Score Calculation | Custom Algorithm | N/A | Weighted score based on security issues found |

## Data Collection Process

1. **Initial Crawl**: Puppeteer performs an initial crawl of the website to gather basic information
2. **Technology Detection**: Wappalyzer identifies the technology stack
3. **Performance Analysis**: Lighthouse measures performance metrics
4. **Security Scanning**: Combination of Puppeteer, Lighthouse, and OWASP ZAP for security checks
5. **DNS Analysis**: Custom DNS checks for DNS health
6. **Score Calculation**: All data is aggregated and weighted scores are calculated

## Update Frequency

| Data Type | Update Frequency | Notes |
|-----------|------------------|-------|
| SSL/TLS Information | Daily | Certificates are checked daily for expiration |
| DNS Information | Daily | DNS records and configuration checked daily |
| Server Performance | Hourly | Server response times monitored hourly |
| Security Scans | Weekly | Full security scans performed weekly |
| Technology Stack | Monthly | Full technology stack detection monthly |

## Integration Notes

- **Puppeteer**: Used for crawling, screenshot capture, and basic HTTP/SSL analysis
- **Lighthouse**: Used for performance metrics and some security checks
- **Wappalyzer**: Used for technology stack detection
- **OWASP ZAP**: Used for deeper security scanning
- **Custom APIs**: Used for specialized checks like DNS analysis and load testing

## Data Storage

All collected data is stored in a time-series database to allow for historical analysis and trend identification. The dashboard displays the most recent data by default but can show historical data when needed.
