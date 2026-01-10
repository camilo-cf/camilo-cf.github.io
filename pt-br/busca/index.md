---
layout: single
title: "Busca"
permalink: /pt-br/busca/
author_profile: false
lang: "pt-br"
i18n_key: "search"
ref: "search"
description: "Busque posts, estudos de caso e conteúdo técnico sobre ML em produção, GenAI, MLOps e medição causal."
---

<div class="search-container">
  <label for="search-input-pt" class="search-label">
    <strong>Buscar posts, estudos de caso e páginas:</strong>
  </label>
  <input 
    type="search" 
    id="search-input-pt" 
    placeholder="ex: avaliação GenAI, rollback, ads causais..." 
    class="search-input"
    autocomplete="off"
  >
  
  <div id="search-results-pt" class="search-results"></div>
  
  <p id="search-empty-pt" class="search-empty" style="display:none;">
    Nenhum resultado encontrado. Tente outras palavras-chave ou <a href="{{ "/pt-br/blog/" | relative_url }}">navegue todos os posts</a>.
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

<script src="{{ "/assets/js/vendor/simple-jekyll-search.min.js" | relative_url }}"></script>
<script>
window.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search-input-pt');
  var searchResults = document.getElementById('search-results-pt');
  var searchEmpty = document.getElementById('search-empty-pt');
  
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
