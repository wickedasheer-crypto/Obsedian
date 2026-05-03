/* ============================================================
   OBSEDIAN — INSIGHTS HUB ENGINE
   insights.js

   Load order in index.html:
     <script src="data.js"></script>
     <script src="insights-data.js"></script>   ← new
     <script src="app.js"></script>
     <script src="insights.js"></script>         ← new (last)

   This file is self-contained. It reads INSIGHTS_CONFIG and
   CURATED_INSIGHTS from insights-data.js, fetches live data
   where available, merges + deduplicates, and renders the hub.
   ============================================================ */

(function () {
  "use strict";

  // ── Guard ─────────────────────────────────────────────────
  if (typeof INSIGHTS_CONFIG === "undefined" || typeof CURATED_INSIGHTS === "undefined") {
    console.error("OBSEDIAN Insights: insights-data.js must be loaded before insights.js");
    return;
  }

  const CFG  = INSIGHTS_CONFIG;
  const TAGS = INSIGHTS_TAGS;

  // ── State ─────────────────────────────────────────────────
  let allCards      = [];   // merged, sorted master list
  let visibleCount  = 0;
  let activeFilter  = "all";

  // ── Helpers ───────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const relativeDate = (dateStr) => {
    const d    = new Date(dateStr);
    const now  = new Date();
    const diff = Math.floor((now - d) / 86400000); // days
    if (isNaN(diff)) return dateStr;
    if (diff === 0)  return "Today";
    if (diff === 1)  return "Yesterday";
    if (diff < 7)   return `${diff} days ago`;
    if (diff < 30)  return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  const escapeHtml = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // ── Skeleton loader ───────────────────────────────────────
  function showSkeletons(count = 6) {
    const grid = $("insightsGrid");
    if (!grid) return;
    grid.innerHTML = Array(count).fill(0).map(() => `
      <div class="insight-skeleton">
        <div class="skel-tag"></div>
        <div class="skel-title"></div>
        <div class="skel-title skel-short"></div>
        <div class="skel-excerpt"></div>
        <div class="skel-excerpt skel-short"></div>
        <div class="skel-meta"></div>
      </div>`).join("");
  }

  // ── Fetch: Reddit public JSON ──────────────────────────────
  async function fetchReddit(subreddit, tag, label, timeframe, count) {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${count}&t=${timeframe}`;
    try {
      const res  = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Reddit HTTP ${res.status}`);
      const json = await res.json();
      return (json?.data?.children || []).map((post) => {
        const d = post.data;
        return {
          id:          `reddit-${d.id}`,
          tag,
          source:      label,
          sourceIcon:  "👥",
          title:       escapeHtml(d.title),
          excerpt:     escapeHtml(d.selftext?.slice(0, 160) || "Click through to read the full discussion thread on Reddit."),
          url:         `https://reddit.com${d.permalink}`,
          date:        new Date(d.created_utc * 1000).toISOString().slice(0, 10),
          meta:        `${d.score.toLocaleString()} upvotes · ${d.num_comments} comments`,
          live:        true
        };
      });
    } catch (err) {
      console.warn(`Insights: Reddit r/${subreddit} fetch failed —`, err.message);
      return [];
    }
  }

  // ── Fetch: RSS via rss2json.com ───────────────────────────
  async function fetchRSS(feedUrl, label, tag, apiKey, count) {
    if (!apiKey || apiKey === "YOUR_RSS2JSON_API_KEY") {
      // Skip silently — will fall back to curated
      return [];
    }
    const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=${apiKey}&count=${count}`;
    try {
      const res  = await fetch(endpoint);
      if (!res.ok) throw new Error(`RSS2JSON HTTP ${res.status}`);
      const json = await res.json();
      if (json.status !== "ok") throw new Error(json.message || "RSS error");
      return (json.items || []).map((item) => ({
        id:         `rss-${btoa(item.link || item.title).slice(0, 16)}`,
        tag,
        source:     label,
        sourceIcon: "📰",
        title:      escapeHtml(item.title),
        excerpt:    escapeHtml(
          (item.description || "")
            .replace(/<[^>]+>/g, "")   // strip HTML tags
            .slice(0, 160)
        ),
        url:        item.link,
        date:       (item.pubDate || "").slice(0, 10),
        meta:       "Read Article →",
        thumbnail:  item.thumbnail || item.enclosure?.link || null,
        live:       true
      }));
    } catch (err) {
      console.warn(`Insights: RSS fetch failed for ${label} —`, err.message);
      return [];
    }
  }

  // ── Merge & deduplicate ───────────────────────────────────
  function mergeCards(liveCards) {
    const seen  = new Set(liveCards.map((c) => c.id));
    const curated = CURATED_INSIGHTS.filter((c) => !seen.has(c.id));

    const merged = [...liveCards, ...curated];

    // Sort: live cards first (they have most recent data), then by date desc
    merged.sort((a, b) => {
      if (a.live && !b.live) return -1;
      if (!a.live && b.live) return  1;
      return new Date(b.date) - new Date(a.date);
    });

    return merged;
  }

  // ── Render: featured hero card ────────────────────────────
  function renderFeatured(card) {
    const featuredEl = $("insightsFeatured");
    if (!featuredEl || !card) { featuredEl && (featuredEl.style.display = "none"); return; }

    const tagDef = TAGS[card.tag] || TAGS.news;
    featuredEl.innerHTML = `
      <a href="${card.url}" target="_blank" rel="noopener" class="insight-featured-link">
        <div class="insight-featured-inner">
          <div class="insight-featured-left">
            <div class="insight-cat-badge" style="background:${tagDef.color}; color: var(--black);">
              ${tagDef.icon} ${tagDef.label}
            </div>
            <h3 class="insight-featured-title">${card.title}</h3>
            <p class="insight-featured-excerpt">${card.excerpt}</p>
            <div class="insight-featured-meta">
              <span class="insight-source-chip">${card.sourceIcon || "📌"} ${card.source}</span>
              <span class="insight-date">${relativeDate(card.date)}</span>
              <span class="insight-readtime">${card.meta}</span>
            </div>
          </div>
          <div class="insight-featured-right">
            <div class="insight-featured-burst">
              <span>HOT<br>TAKE</span>
            </div>
          </div>
        </div>
      </a>`;
    featuredEl.classList.add("reveal", "visible");
  }

  // ── Render: individual grid card ──────────────────────────
  function renderCard(card) {
    const tagDef = TAGS[card.tag] || TAGS.news;
    const isComm = card.tag === "community";

    return `
    <article class="insight-card reveal" data-tag="${escapeHtml(card.tag)}">
      <a href="${card.url}" target="_blank" rel="noopener" class="insight-card-link">
        ${card.thumbnail ? `<div class="insight-thumb" style="background-image:url('${card.thumbnail}')"></div>` : ""}
        <div class="insight-card-body">
          <div class="insight-card-top">
            <span class="insight-cat-badge" style="background:${tagDef.color};">
              ${tagDef.icon} ${tagDef.label}
            </span>
            ${card.live ? '<span class="insight-live-dot" title="Live feed">●</span>' : ""}
          </div>
          <h4 class="insight-card-title">${card.title}</h4>
          <p class="insight-card-excerpt">${card.excerpt}${card.excerpt.length >= 160 ? "…" : ""}</p>
          <div class="insight-card-footer">
            <span class="insight-source-chip">${card.sourceIcon || "📌"} ${card.source}</span>
            <span class="insight-card-meta">
              <span class="insight-date">${relativeDate(card.date)}</span>
              ${isComm
                ? `<span class="insight-votes">${card.meta}</span>`
                : `<span class="insight-readtime">${card.meta}</span>`}
            </span>
          </div>
        </div>
      </a>
    </article>`;
  }

  // ── Render: grid cards (filtered subset) ─────────────────
  function renderGrid(reset = false) {
    const grid   = $("insightsGrid");
    if (!grid) return;

    const filtered = activeFilter === "all"
      ? allCards
      : allCards.filter((c) => c.tag === activeFilter);

    // Skip featured card from grid if shown separately
    const skipId = (CFG.display.showFeatured && allCards[CFG.display.featuredIndex])
      ? allCards[CFG.display.featuredIndex].id
      : null;

    const pool = filtered.filter((c) => c.id !== skipId);

    if (reset) {
      visibleCount = Math.min(CFG.display.maxCards, pool.length);
      grid.innerHTML = pool.slice(0, visibleCount).map(renderCard).join("");
    } else {
      const start = visibleCount;
      const end   = Math.min(visibleCount + CFG.display.cardsPerLoad, pool.length);
      pool.slice(start, end).forEach((card) => {
        grid.insertAdjacentHTML("beforeend", renderCard(card));
      });
      visibleCount = end;
    }

    // Trigger scroll reveal on new cards
    if (typeof observeReveal === "function") observeReveal();
    else {
      grid.querySelectorAll(".insight-card.reveal:not(.visible)").forEach((el) => {
        el.classList.add("visible");
      });
    }

    // Update Load More button
    updateLoadMore(pool.length);
  }

  function updateLoadMore(totalVisible) {
    const btn = $("insightsLoadMore");
    if (!btn) return;
    btn.style.display = visibleCount < totalVisible ? "block" : "none";
  }

  // ── Render: empty state ───────────────────────────────────
  function renderEmpty() {
    const grid = $("insightsGrid");
    if (grid) grid.innerHTML = `
      <div class="insight-empty">
        <div class="insight-empty-icon">🔍</div>
        <p>No content in this category yet. Check back soon!</p>
      </div>`;
    const btn = $("insightsLoadMore");
    if (btn) btn.style.display = "none";
  }

  // ── Filters ───────────────────────────────────────────────
  function initFilters() {
    const bar = $("insightsFilterBar");
    if (!bar) return;

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".insights-filter-btn");
      if (!btn) return;

      bar.querySelectorAll(".insights-filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.tag;

      visibleCount = 0;
      renderGrid(true);
    });
  }

  // ── Live count badge ──────────────────────────────────────
  function updateLiveBadge(liveCount) {
    const badge = $("insightsLiveBadge");
    if (!badge) return;
    if (liveCount > 0) {
      badge.textContent = `${liveCount} LIVE`;
      badge.style.display = "inline-block";
    }
  }

  // ── Load More ─────────────────────────────────────────────
  function initLoadMore() {
    const btn = $("insightsLoadMore");
    if (!btn) return;
    btn.addEventListener("click", () => renderGrid(false));
  }

  // ── Last-updated timestamp ────────────────────────────────
  function setTimestamp() {
    const el = $("insightsTimestamp");
    if (!el) return;
    el.textContent = `Last updated: ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
  }

  // ── Main orchestrator ─────────────────────────────────────
  async function initInsights() {
    showSkeletons(6);

    const liveCards = [];

    // Parallel fetches — Reddit
    if (CFG.reddit.enabled) {
      const redditPromises = CFG.reddit.subreddits.map((sub) =>
        fetchReddit(sub.name, sub.tag, sub.label, CFG.reddit.timeframe, CFG.reddit.postsPerSubreddit)
      );
      const redditResults = await Promise.allSettled(redditPromises);
      redditResults.forEach((r) => {
        if (r.status === "fulfilled") liveCards.push(...r.value);
      });
    }

    // Parallel fetches — RSS
    if (CFG.rss.enabled) {
      const rssPromises = CFG.rss.feeds.map((feed) =>
        fetchRSS(feed.url, feed.label, feed.tag, CFG.rss.apiKey, CFG.rss.articlesPerFeed)
      );
      const rssResults = await Promise.allSettled(rssPromises);
      rssResults.forEach((r) => {
        if (r.status === "fulfilled") liveCards.push(...r.value);
      });
    }

    updateLiveBadge(liveCards.length);
    allCards = mergeCards(liveCards);

    // Render featured
    if (CFG.display.showFeatured && allCards.length > 0) {
      renderFeatured(allCards[CFG.display.featuredIndex] || allCards[0]);
    }

    // Render grid
    if (allCards.length > 0) {
      renderGrid(true);
    } else {
      renderEmpty();
    }

    setTimestamp();
    initFilters();
    initLoadMore();
  }

  // ── Boot ──────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInsights);
  } else {
    initInsights();
  }

  // Expose observeReveal hook — insights.js calls the same
  // IntersectionObserver pattern already in app.js
  function observeReveal() {
    const targets = document.querySelectorAll(".insight-card.reveal:not(.visible)");
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => io.observe(t));
  }

})();
