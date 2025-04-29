/**
 * This file defines the data sources used for the Server Health dashboard
 * and maps specific metrics to their corresponding APIs
 */

export interface DataSource {
  name: string
  description: string
  apiEndpoint?: string
  updateFrequency: string
  metrics: string[]
}

export interface MetricMapping {
  metricName: string
  category: "ssl" | "dns" | "server" | "security"
  dataSource: string
  apiMethod: string
  responseFormat: string
  sampleResponse?: string
}

export const serverHealthDataSources: DataSource[] = [
  {
    name: "Puppeteer",
    description: "Headless Chrome browser for crawling and analyzing websites",
    updateFrequency: "Daily",
    metrics: [
      "SSL Certificate Expiration",
      "SSL Cipher Suites",
      "HTTP Status Codes",
      "Security Headers",
      "Page Screenshots",
    ],
  },
  {
    name: "Lighthouse",
    description: "Google's automated tool for improving web page quality",
    apiEndpoint: "/api/lighthouse",
    updateFrequency: "Daily",
    metrics: [
      "Time to First Byte (TTFB)",
      "First Contentful Paint (FCP)",
      "Largest Contentful Paint (LCP)",
      "Cumulative Layout Shift (CLS)",
      "Mixed Content Issues",
    ],
  },
  {
    name: "Wappalyzer",
    description: "Technology profiler that detects CMS, frameworks, server software, etc.",
    apiEndpoint: "/api/wappalyzer",
    updateFrequency: "Monthly",
    metrics: [
      "Web Server Type/Version",
      "CMS Type/Version",
      "JavaScript Frameworks",
      "Programming Languages",
      "Operating System",
      "CDN Provider",
    ],
  },
  {
    name: "Custom DNS Check",
    description: "Custom API for checking DNS configuration and performance",
    apiEndpoint: "/api/dns-check",
    updateFrequency: "Daily",
    metrics: [
      "DNS Resolution Speed",
      "DNS Record Validation",
      "SPF Record Check",
      "DMARC Record Check",
      "DKIM Record Check",
    ],
  },
  {
    name: "OWASP ZAP",
    description: "Security tool for finding vulnerabilities in web applications",
    apiEndpoint: "/api/security-scan",
    updateFrequency: "Weekly",
    metrics: [
      "SQL Injection Vulnerabilities",
      "Cross-Site Scripting (XSS)",
      "Security Misconfigurations",
      "Outdated Components",
      "Authentication Weaknesses",
    ],
  },
]

export const metricMappings: MetricMapping[] = [
  {
    metricName: "SSL Certificate Expiration",
    category: "ssl",
    dataSource: "Puppeteer",
    apiMethod: "SSL Check",
    responseFormat: "JSON with expiration date and issuer information",
    sampleResponse: `{
      "valid": true,
      "expires": "2023-12-31T23:59:59Z",
      "issuer": "Let's Encrypt",
      "daysRemaining": 15
    }`,
  },
  {
    metricName: "Mixed Content Issues",
    category: "ssl",
    dataSource: "Lighthouse",
    apiMethod: "Security Audit",
    responseFormat: "Array of URLs with mixed content",
    sampleResponse: `{
      "mixedContentCount": 7,
      "affectedPages": [
        {
          "url": "/blog",
          "resources": ["http://example.com/image.jpg", "http://cdn.example.com/script.js"]
        }
      ]
    }`,
  },
  {
    metricName: "DNS Resolution Speed",
    category: "dns",
    dataSource: "Custom DNS Check",
    apiMethod: "DNS Lookup API",
    responseFormat: "JSON with resolution time in ms",
    sampleResponse: `{
      "domain": "example.com",
      "resolutionTimeMs": 350,
      "status": "slow",
      "benchmark": 200
    }`,
  },
  {
    metricName: "Server Response Time",
    category: "server",
    dataSource: "Lighthouse",
    apiMethod: "Performance Metrics",
    responseFormat: "JSON with TTFB in ms",
    sampleResponse: `{
      "ttfb": 1200,
      "status": "poor",
      "benchmark": 600
    }`,
  },
  {
    metricName: "Missing Security Headers",
    category: "security",
    dataSource: "Puppeteer",
    apiMethod: "Header Analysis",
    responseFormat: "JSON with missing headers",
    sampleResponse: `{
      "missingHeaders": ["Content-Security-Policy", "X-Content-Type-Options"],
      "presentHeaders": ["X-Frame-Options"],
      "recommendation": "Implement missing security headers"
    }`,
  },
  {
    metricName: "Outdated Server Software",
    category: "security",
    dataSource: "Wappalyzer",
    apiMethod: "Version Detection",
    responseFormat: "JSON with software versions",
    sampleResponse: `{
      "outdatedComponents": [
        {
          "name": "Apache",
          "currentVersion": "2.4.41",
          "latestVersion": "2.4.57",
          "severity": "high"
        }
      ]
    }`,
  },
]

/**
 * Returns the data source for a specific metric
 */
export function getDataSourceForMetric(metricName: string): DataSource | undefined {
  const mapping = metricMappings.find((m) => m.metricName === metricName)
  if (!mapping) return undefined

  return serverHealthDataSources.find((ds) => ds.name === mapping.dataSource)
}

/**
 * Returns all metrics for a specific category
 */
export function getMetricsForCategory(category: "ssl" | "dns" | "server" | "security"): MetricMapping[] {
  return metricMappings.filter((m) => m.category === category)
}
