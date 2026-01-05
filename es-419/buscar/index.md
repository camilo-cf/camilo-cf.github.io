---
layout: single
title: "Buscar"
permalink: /es-419/buscar/
author_profile: false
lang: "es-419"
i18n_key: "search"
ref: "search"
description: "Busca posts, casos de estudio y contenido técnico sobre ML en producción, GenAI, MLOps y medición causal."
---

<div class="search-container">
  <label for="search-input-es" class="search-label">
    <strong>Buscar posts, casos de estudio y páginas:</strong>
  </label>
  <input 
    type="search" 
    id="search-input-es" 
    placeholder="ej: evaluación GenAI, rollback, ads causales..." 
    class="search-input"
    autocomplete="off"
  >
  
  <div id="search-results-es" class="search-results"></div>
  
  <p id="search-empty-es" class="search-empty" style="display:none;">
    No se encontraron resultados. Intenta con otras palabras clave o <a href="{{ "/es-419/blog/" | relative_url }}">navega todos los posts</a>.
  </p>
</div>

<style>
.search-container {
  max-width: 800px;
  margin: 2rem auto;
}

.search-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.search-input:focus {
  outline: none;
  border-color: #0073e6;
}

.search-results {
  margin-top: 2rem;
}

.search-result-item {
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fafafa;
}

.search-result-item h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.search-result-item h3 a {
  color: #0073e6;
  text-decoration: none;
}

.search-result-item h3 a:hover {
  text-decoration: underline;
}

.search-result-meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.search-result-description {
  margin-top: 0.5rem;
  color: #333;
}

.search-empty {
  padding: 2rem;
  text-align: center;
  background: #f7f7f7;
  border-radius: 4px;
  color: #666;
}
</style>

<script src="https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js"></script>
<script>
window.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search-input-es');
  var searchResults = document.getElementById('search-results-es');
  var searchEmpty = document.getElementById('search-empty-es');
  
  var sjs = SimpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: searchResults,
    json: '{{ "/search.json" | relative_url }}',
    searchResultTemplate: '<div class="search-result-item"><h3><a href="{url}">{title}</a></h3><p class="search-result-meta">{date} • {categories}</p><p class="search-result-description">{description}</p></div>',
    noResultsText: '',
    limit: 20,
    fuzzy: false,
    exclude: []
  });
  
  // Show/hide empty state based on results
  searchInput.addEventListener('input', function() {
    setTimeout(function() {
      var hasResults = searchResults.children.length > 0;
      var hasQuery = searchInput.value.trim().length > 0;
      
      if (hasQuery && !hasResults) {
        searchEmpty.style.display = 'block';
      } else {
        searchEmpty.style.display = 'none';
      }
    }, 100);
  });
});
</script>
