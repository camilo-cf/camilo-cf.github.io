---
layout: single
title: "Blog"
permalink: /pt-br/blog/
author_profile: false
paginate: 10
locale_paginate: true
lang: "pt-br"
i18n_key: "blog-index"
ref: "blog-index"
---

<section class="start-here">
  <h2>Comece aqui</h2>
  <p>Os quatro pilares organizam o conteúdo. Cada link leva a um hub com ordem recomendada.</p>
  <div class="start-here__grid">
    <a class="btn btn--primary" href="{{ "/pt-br/pilares/production-ml-systems-at-scale/" | relative_url }}">ML em produção em escala</a>
    <a class="btn btn--primary" href="{{ "/pt-br/pilares/causal-measurement-for-ads/" | relative_url }}">Medição causal para anúncios</a>
    <a class="btn btn--primary" href="{{ "/pt-br/pilares/practical-mlops/" | relative_url }}">MLOps prático</a>
    <a class="btn btn--primary" href="{{ "/pt-br/pilares/genai-in-production/" | relative_url }}">GenAI em produção</a>
  </div>
</section>

{% assign posts_in_locale = site.posts | where: "lang", page.lang %}
{% assign category_terms = "" | split: "" %}
{% assign tag_terms = "" | split: "" %}
{% for post in posts_in_locale %}
  {% for category in post.categories %}
    {% unless category_terms contains category %}
      {% assign category_terms = category_terms | push: category %}
    {% endunless %}
  {% endfor %}
  {% for tag in post.tags %}
    {% unless tag_terms contains tag %}
      {% assign tag_terms = tag_terms | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign category_terms = category_terms | sort %}
{% assign tag_terms = tag_terms | sort %}

{% assign paginated_posts = posts_in_locale %}
{% assign paginator_matches_locale = false %}
{% if paginator and paginator.posts %}
  {% assign localized_count = paginator.posts | where: "lang", page.lang | size %}
  {% if localized_count == paginator.posts | size %}
    {% assign paginator_matches_locale = true %}
    {% assign paginated_posts = paginator.posts %}
  {% endif %}
{% endif %}
{% assign has_posts = paginated_posts | size %}

<section class="blog-filters">
  <h3>Filtrar posts</h3>
  <div class="blog-filters__controls">
    <label for="category-filter-pt">Categoria</label>
    <select id="category-filter-pt">
      <option value="">Todas</option>
      {% for category in category_terms %}
        <option value="{{ category }}">{{ category }}</option>
      {% endfor %}
    </select>

    <label for="tag-filter-pt">Tag</label>
    <select id="tag-filter-pt">
      <option value="">Todos</option>
      {% for tag in tag_terms %}
        <option value="{{ tag }}">{{ tag }}</option>
      {% endfor %}
    </select>
  </div>
</section>

<div class="blog-rss">
  <a class="btn btn--primary" href="{{ "/feed.xml" | relative_url }}">RSS / Atom</a>
</div>
{% if has_posts > 0 %}
  <div id="blog-list-pt">
    {% for post in paginated_posts %}
      <article class="blog-card" data-categories="{{ post.categories | join: ',' }}" data-tags="{{ post.tags | join: ',' }}">
        <h2 class="blog-card__title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="blog-card__meta">{{ post.date | date: "%B %d, %Y" }} • {% include reading_time.html item=post %}</p>
        {% if post.description %}
          <p class="blog-card__excerpt">{{ post.description }}</p>
        {% endif %}
        <p class="blog-card__tags"><strong>Categorias:</strong> {{ post.categories | join: ", " }} | <strong>Tags:</strong> {{ post.tags | join: ", " }}</p>
      </article>
    {% endfor %}
  </div>
  <p id="blog-empty-pt" class="blog-empty" style="display:none;">Nenhum post combina com os filtros.</p>
{% else %}
  <div class="blog-empty blog-empty--locale">
    <p>Os posts em português chegarão em breve. Enquanto isso, visite o <a href="{{ "/en/blog/" | relative_url }}">blog em inglês</a> para ver as novidades.</p>
  </div>
{% endif %}

{% if paginator_matches_locale and paginator and paginator.total_pages > 1 and has_posts > 0 %}
  <nav class="pagination" role="navigation">
    {% if paginator.previous_page %}
      <a class="pagination__item pagination__item--prev" href="{{ paginator.previous_page_path | relative_url }}">&laquo; Anterior</a>
    {% endif %}
    <span class="pagination__item">Página {{ paginator.page }} de {{ paginator.total_pages }}</span>
    {% if paginator.next_page %}
      <a class="pagination__item pagination__item--next" href="{{ paginator.next_page_path | relative_url }}">Próxima &raquo;</a>
    {% endif %}
  </nav>
{% endif %}

<script>
  (function() {
    function initFilters() {
      var categoryFilter = document.getElementById("category-filter-pt");
      var tagFilter = document.getElementById("tag-filter-pt");
      var cards = Array.prototype.slice.call(document.querySelectorAll("#blog-list-pt .blog-card"));
      var emptyState = document.getElementById("blog-empty-pt");

      // Defensive: ensure empty state is hidden on initial load if we have posts
      if (emptyState && cards.length > 0) {
        emptyState.style.display = "none";
      }

      if (!categoryFilter || !tagFilter || cards.length === 0) {
        return; // No filtering needed
      }

      function matchesFilter(card, filterEl, key) {
        var value = filterEl.value;
        if (!value) return true;
        var data = card.getAttribute("data-" + key);
        if (!data) return false;
        return data.split(",").map(function(entry) { return entry.trim(); }).indexOf(value) !== -1;
      }

      function applyFilters() {
        var visibleCount = 0;
        cards.forEach(function(card) {
          var categoryMatch = matchesFilter(card, categoryFilter, "categories");
          var tagMatch = matchesFilter(card, tagFilter, "tags");
          var shouldShow = categoryMatch && tagMatch;
          card.style.display = shouldShow ? "" : "none";
          if (shouldShow) {
            visibleCount += 1;
          }
        });
        if (emptyState) {
          emptyState.style.display = visibleCount === 0 ? "" : "none";
        }
      }

      categoryFilter.addEventListener("change", applyFilters);
      tagFilter.addEventListener("change", applyFilters);
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFilters);
    } else {
      initFilters();
    }
  })();
</script>
