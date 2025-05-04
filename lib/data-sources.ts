/**
 * This file defines the data sources used for the Server Health dashboard
 * and maps specific metrics to their corresponding APIs
 */

export interface DataSource {
  name: string
  description: string
  category: "ssl" | "dns" | "server" | "security" | "seo"
  apiEndpoint?: string
  updateFrequency: string
  metrics: string[]
}

export const serverHealthDataSources: DataSource[] = [
  {
    name: "Puppeteer",
    description: "Headless Chrome browser for crawling and analyzing websites",
    category: "ssl",
    apiEndpoint: "/api/puppeteer",
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
    category: "seo",
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
    category: "server",
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
    category: "dns",
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
    category: "security",
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

/**
 * Returns all data sources for a specific category
 */
export function getDataSourcesForCategory(category: "ssl" | "dns" | "server" | "security" | "seo"): DataSource[] {
  return serverHealthDataSources.filter((ds) => ds.category === category)
}

/**
 * Returns all available categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(serverHealthDataSources.map((ds) => ds.category))
  return Array.from(categories)
}
