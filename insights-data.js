// ============================================================
//  OBSEDIAN — INSIGHTS HUB DATA
//  insights-data.js
//
//  THREE SECTIONS:
//  1. INSIGHTS_CONFIG  — API sources, subreddits, RSS feeds
//  2. CURATED_INSIGHTS — Hand-picked fallback/seed cards
//                        (shown when APIs are unavailable,
//                         or always if you prefer full control)
//  3. INSIGHTS_TAGS    — Category definitions & colours
//
//  SAFE TO EDIT: Add/remove curated cards here anytime.
//  ============================================================

// ── CATEGORY DEFINITIONS ─────────────────────────────────────
const INSIGHTS_TAGS = {
  community: {
    label: "Community Discussions",
    color: "#FFE000",   // Yellow — matches your CGI service
    icon:  "💬"
  },
  tactics: {
    label: "Expert Tactics",
    color: "#FF3B3B",   // Red — matches your XR service
    icon:  "⚡"
  },
  news: {
    label: "Industry News",
    color: "#00C8E0",   // Cyan — matches your Post-Production service
    icon:  "📡"
  }
};

// ── API CONFIGURATION ─────────────────────────────────────────
const INSIGHTS_CONFIG = {

  // Reddit: fetched client-side via public JSON endpoint
  // No API key needed. Rate limit: ~60 req/min unauthenticated.
  reddit: {
    enabled: true,
    subreddits: [
      { name: "Entrepreneur",   tag: "community", label: "r/Entrepreneur"   },
      { name: "marketing",      tag: "tactics",   label: "r/marketing"      },
      { name: "startups",       tag: "community", label: "r/startups"       },
      { name: "ecommerce",      tag: "tactics",   label: "r/ecommerce"      },
      { name: "BigSEO",         tag: "news",      label: "r/BigSEO"         }
    ],
    postsPerSubreddit: 2,         // How many top posts to pull per sub
    timeframe: "week"             // "day" | "week" | "month" | "year"
  },

  // RSS via rss2json.com — free tier: 500 requests/day
  // Replace the api_key below with your own from rss2json.com (free signup)
  rss: {
    enabled: true,
    apiKey:  "YOUR_RSS2JSON_API_KEY",   // ← Get free key at rss2json.com
    feeds: [
      {
        url:   "https://feeds.feedburner.com/entrepreneur/latest",
        label: "Entrepreneur Magazine",
        tag:   "news"
      },
      {
        url:   "https://hbr.org/feed",
        label: "Harvard Business Review",
        tag:   "tactics"
      },
      {
        url:   "https://blog.hubspot.com/marketing/rss.xml",
        label: "HubSpot Marketing",
        tag:   "tactics"
      },
      {
        url:   "https://econsultancy.com/blog/feed/",
        label: "Econsultancy",
        tag:   "news"
      },
      {
        url:   "https://contentmarketinginstitute.com/feed/",
        label: "Content Marketing Institute",
        tag:   "tactics"
      }
    ],
    articlesPerFeed: 2
  },

  // Display settings
  display: {
    maxCards:        9,        // Max cards before "Load More"
    cardsPerLoad:    3,        // Cards added each time "Load More" is clicked
    showFeatured:    true,     // Show hero featured card at top
    featuredIndex:   0         // Which curated card is featured (0 = first)
  }
};

// ── CURATED SEED CONTENT ──────────────────────────────────────
// These cards are ALWAYS shown as fallback if APIs fail,
// OR if you set INSIGHTS_CONFIG.reddit.enabled = false.
// Add your own hand-picked links here for editorial control.
// Fields: id, tag, source, title, excerpt, url, date, meta
const CURATED_INSIGHTS = [
  {
    id: "c1",
    tag: "tactics",
    featured: true,
    source: "HubSpot Blog",
    sourceIcon: "📰",
    title: "The Brand Positioning Framework That Actually Sticks in 2025",
    excerpt: "Most Indian D2C brands confuse aesthetics with positioning. Here's the 4-step framework that separates brands that scale from brands that stagnate — with real CAC benchmarks.",
    url: "https://blog.hubspot.com/marketing",
    date: "2025-07-10",
    meta: "8 min read"
  },
  {
    id: "c2",
    tag: "community",
    source: "r/Entrepreneur",
    sourceIcon: "👥",
    title: "\"We 10x'd our revenue without changing the product — just the brand story.\" Thread with 847 comments.",
    excerpt: "Founder shares the exact rebranding playbook that shifted their positioning from 'functional' to 'aspirational' in 90 days. Comments are gold.",
    url: "https://reddit.com/r/Entrepreneur",
    date: "2025-07-08",
    meta: "847 upvotes"
  },
  {
    id: "c3",
    tag: "news",
    source: "Econsultancy",
    sourceIcon: "📡",
    title: "India's D2C Brands Are Winning With Regional Identity — Report 2025",
    excerpt: "New research shows Indian D2C brands that lean into regional cultural identity see 34% higher brand recall versus those using generic global aesthetics.",
    url: "https://econsultancy.com",
    date: "2025-07-07",
    meta: "5 min read"
  },
  {
    id: "c4",
    tag: "tactics",
    source: "Content Marketing Institute",
    sourceIcon: "⚡",
    title: "Why Your Product Photography Is Killing Your Brand (And CGI Is The Fix)",
    excerpt: "A breakdown of why Indian SMEs are switching to CGI renders for e-commerce listings — with A/B test data showing the conversion impact.",
    url: "https://contentmarketinginstitute.com",
    date: "2025-07-05",
    meta: "6 min read"
  },
  {
    id: "c5",
    tag: "community",
    source: "r/marketing",
    sourceIcon: "👥",
    title: "Honest breakdown of what actually moved the needle for our brand in Year 1",
    excerpt: "Not another 'growth hacking' post. Founder of a 7-figure D2C skincare brand breaks down the 3 brand decisions that compounded over time.",
    url: "https://reddit.com/r/marketing",
    date: "2025-07-04",
    meta: "1.2k upvotes"
  },
  {
    id: "c6",
    tag: "news",
    source: "Harvard Business Review",
    sourceIcon: "📰",
    title: "The ROI of Brand Building: New Data From 500 Companies Over 10 Years",
    excerpt: "HBR's longitudinal study finally puts a number on brand investment returns. The finding: companies that invest in brand see 2.3x higher enterprise value at exit.",
    url: "https://hbr.org/marketing",
    date: "2025-07-02",
    meta: "10 min read"
  },
  {
    id: "c7",
    tag: "tactics",
    source: "r/ecommerce",
    sourceIcon: "⚡",
    title: "Step-by-step: How we built a ₹2Cr revenue brand with zero influencer spend",
    excerpt: "Full breakdown of a brand-first strategy using CGI visuals, storytelling content, and Meta ads — no influencers, no PR budget.",
    url: "https://reddit.com/r/ecommerce",
    date: "2025-06-30",
    meta: "634 upvotes"
  },
  {
    id: "c8",
    tag: "community",
    source: "r/startups",
    sourceIcon: "👥",
    title: "Ask HN-style thread: What's the one brand decision you'd undo?",
    excerpt: "250+ founders share their biggest brand mistakes — naming, visual identity, positioning, and messaging. Uncomfortable but essential reading.",
    url: "https://reddit.com/r/startups",
    date: "2025-06-28",
    meta: "412 upvotes"
  },
  {
    id: "c9",
    tag: "news",
    source: "Entrepreneur Magazine",
    sourceIcon: "📡",
    title: "Why 2025 Is The Year of Experiential Brand Marketing in India",
    excerpt: "AR try-ons, immersive product demos, and spatial commerce are no longer 'future tech' — they're live on Nykaa, Meesho, and Flipkart. Here's how brands are winning.",
    url: "https://entrepreneur.com",
    date: "2025-06-25",
    meta: "7 min read"
  }
];
