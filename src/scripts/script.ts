import '../styles.scss';


import { BuildTool, BuildToolsData, RenderOptions, LoadOptions } from './types'
import { DarkModeManager } from './utilFunctions';




async function loadBuildToolsData(jsonPath: string = '../assets/data.json'): Promise<BuildToolsData> {
    try {
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
      }
      const data: BuildToolsData = await response.json();
      
      // Validate the data structure
      if (!data.buildTools || !Array.isArray(data.buildTools)) {
        throw new Error('Invalid data structure: buildTools array not found');
      }
      
      return data;
    } catch (error) {
      console.error('Error loading build tools data:', error);
      throw error;
    }
  }
  
  /**
   * Alternative: Load data using dynamic import (for modern bundlers)
   */

  
  /**
   * Renders a single build tool card
   */
  function renderBuildToolCard(tool: BuildTool, options: RenderOptions = {}): string {
    const { showCategory = true, showPopularity = true, cardClassName = 'build-tool-card' } = options;
    
    const popularityBadge = showPopularity ? `
      <span class="popularity-badge popularity-${tool.popularity}" title="Popularity: ${tool.popularity}">
        ${tool.popularity}
      </span>
    ` : '';
    
    const categoryBadge = showCategory ? `
      <span class="category-badge category-${tool.category}" title="Category: ${tool.category}">
        ${tool.category}
      </span>
    ` : '';
    
    return `
      <div class="${cardClassName} card" 
           data-id="${tool.id}" 
           data-category="${tool.category}" 
           data-popularity="${tool.popularity}"
           data-name="${tool.name.toLowerCase()}"
           data-description="${tool.description.toLowerCase()}">
        <div class="tool-header"">
          <div class="tool-logo" style="background: url('${tool.logo}') no-repeat center center; background-size: contain; ">
            <div class="logo-fallback" style="display: none; width: 40px; height: 40px; background: ${tool.color}; border-radius: 4px; align-items: center; justify-content: center; color: white; font-weight: bold;">
              ${tool.name.charAt(0)}
            </div>
          </div>
          
        </div>
        <div class="tool-body"  >
        <div class="tool-info">
            <h3 class="tool-name" style="color: ${tool.color}">${tool.name}</h3>
            <div class="tool-badges" style="background-color: ${tool.color}">
              ${categoryBadge}
            </div>
          </div>
          <p class="tool-description">${tool.description}</p>
         
            <a href="${tool.website}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="tool-link"
             aria-label="Visit ${tool.name} website">
              <button class="visit-page-button">
            Visit Website →
              </button>
          </a>
        

        </div>
      </div>
    `;
  }
  
 
  function sortBuildTools(tools: BuildTool[], sortBy: RenderOptions['sortBy'] = 'name'): BuildTool[] {
    const popularityOrder = { high: 4, growing: 3, medium: 2, low: 1 };
    
    return [...tools].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return popularityOrder[b.popularity] - popularityOrder[a.popularity];
        case 'category':
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }
  
  /**
   * Groups build tools by category
   */
  function groupByCategory(tools: BuildTool[]): Record<string, BuildTool[]> {
    return tools.reduce((groups, tool) => {
      const category = tool.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(tool);
      return groups;
    }, {} as Record<string, BuildTool[]>);
  }
  
  /**
   * Creates search and filter controls
   */
  function createSearchAndFilters(data: BuildToolsData, containerId: string): string {
    const categories = [...new Set(data.buildTools.map(tool => tool.category))];
    const popularities = [...new Set(data.buildTools.map(tool => tool.popularity))];
    
    return `
      <div class="build-tools-controls" id="${containerId}-controls">
        <div class="search-container">
          <input type="text" 
                 id="${containerId}-search" 
                 class="search-input" 
                 placeholder="Search build tools ..."
                 aria-label="Search build tools">
        </div>
        <div class="filters-container">
          <select id="${containerId}-category-filter" class="filter-select" aria-label="Filter by category">
            <option value="">All Categories</option>
            ${categories.map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('')}
          </select>
          <select id="${containerId}-popularity-filter" class="filter-select" aria-label="Filter by popularity">
            <option value="">All Popularity</option>
            ${popularities.map(pop => `<option value="${pop}">${pop.charAt(0).toUpperCase() + pop.slice(1)}</option>`).join('')}
          </select>
          <select id="${containerId}-sort" class="filter-select" aria-label="Sort by">
            <option value="name">Sort by Name</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
        <button id="${containerId}-clear" class="clear-button" aria-label="Clear all filters">Clear</button>

      </div>
    `;
  }
  
  /**
   * Sets up interactive search and filtering
   */
  function setupSearchAndFilters(data: BuildToolsData, containerId: string, options: RenderOptions): void {
    const searchInput = document.getElementById(`${containerId}-search`) as HTMLInputElement;
    const categoryFilter = document.getElementById(`${containerId}-category-filter`) as HTMLSelectElement;
    const popularityFilter = document.getElementById(`${containerId}-popularity-filter`) as HTMLSelectElement;
    const sortSelect = document.getElementById(`${containerId}-sort`) as HTMLSelectElement;
    const clearButton = document.getElementById(`${containerId}-clear`) as HTMLButtonElement;
    const resultsContainer = document.getElementById(`${containerId}-results`);
    
    if (!searchInput || !categoryFilter || !popularityFilter || !sortSelect || !clearButton || !resultsContainer) {
      console.warn('Search and filter elements not found');
      return;
    }
    
    function updateResults(): void {
      const searchTerm = searchInput.value.toLowerCase();
      const categoryValue = categoryFilter.value;
      const popularityValue = popularityFilter.value;
      const sortValue = sortSelect.value as RenderOptions['sortBy'];
      
      // Filter data
      const filtered = filterBuildTools(data, {
        search: searchTerm || undefined,
        category: categoryValue || undefined,
        popularity: popularityValue || undefined,
      });
      
      // Render filtered results
      const html = renderBuildTools(filtered, { ...options, sortBy: sortValue });
      if (resultsContainer) {
        resultsContainer.innerHTML = html;
      } else {
        console.warn('Results container not found');
      }
      
      // Update results count
      const count = filtered.buildTools.length;
      const countElement = document.getElementById(`${containerId}-count`);
      if (countElement) {
        countElement.textContent = `${count} tool${count !== 1 ? 's' : ''} found`;
      }
    }
    
    function clearFilters(): void {
      searchInput.value = '';
      categoryFilter.value = '';
      popularityFilter.value = '';
      sortSelect.value = 'name';
      updateResults();
    }
    
    // Add event listeners
    searchInput.addEventListener('input', updateResults);
    categoryFilter.addEventListener('change', updateResults);
    popularityFilter.addEventListener('change', updateResults);
    sortSelect.addEventListener('change', updateResults);
    clearButton.addEventListener('click', clearFilters);
    
    // Set initial sort value
    if (options.sortBy) {
      sortSelect.value = options.sortBy;
    }
  }
  
  /**
   * Main function to render build tools
   */
  function renderBuildTools(data: BuildToolsData, options: RenderOptions = {}): string {
    const {
      showCategory = true,
      showPopularity = true,
      groupByCategory: shouldGroup = false,
      sortBy = 'name',
      cardClassName = 'build-tool-card'
    } = options;
  
    const sortedTools = sortBuildTools(data.buildTools, sortBy);
  
    if (shouldGroup) {
      const grouped = groupByCategory(sortedTools);
      let html = '<div class="build-tools-grid grouped">';
      
      Object.entries(grouped).forEach(([category, tools]) => {
        html += `
          <div class="category-section">
            <h2 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}s</h2>
            <div class="tools-grid">
              ${tools.map(tool => renderBuildToolCard(tool, { showCategory, showPopularity, cardClassName })).join('')}
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      return html;
    }
  
    return `
      <div class="build-tools-grid">
        <div class="tools-grid">
          ${sortedTools.map(tool => renderBuildToolCard(tool, { showCategory, showPopularity, cardClassName })).join('')}
        </div>
      </div>
    `;
  }
  
  /**
   * Renders build tools to a DOM element
   */
  function renderBuildToolsToDOM(data: BuildToolsData, options: RenderOptions = {}): void {
    const { containerSelector = '#build-tools-container', enableSearch = false, enableFilters = false } = options;
    const container = document.querySelector(containerSelector);
    
    if (!container) {
      console.error(`Container element not found: ${containerSelector}`);
      return;
    }
    
    const containerId = container.id || 'build-tools';
    let html = '';
    
    // Add search and filters if enabled
    if (enableSearch || enableFilters) {
      html += createSearchAndFilters(data, containerId);
    }
    
    // Add results container
    html += `<div id="${containerId}-results">`;
    html += renderBuildTools(data, options);
    html += '</div>';
    
    container.innerHTML = html;
    
    // Setup interactive features
    if (enableSearch || enableFilters) {
      setupSearchAndFilters(data, containerId, options);
    }
  }
  
  /**
   * Filters build tools based on criteria
   */
  function filterBuildTools(
    data: BuildToolsData,
    filters: {
      category?: string;
      popularity?: string;
      search?: string;
    }
  ): BuildToolsData {
    let filtered = data.buildTools;
    
    if (filters.category) {
      filtered = filtered.filter(tool => tool.category === filters.category);
    }
    
    if (filters.popularity) {
      filtered = filtered.filter(tool => tool.popularity === filters.popularity);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return { buildTools: filtered };
  }

  /**
   * Initializes and renders build tools from JSON file
   */
  async function initializeBuildTools(options: LoadOptions = {}): Promise<void> {
    const { 
      jsonPath = '../assets/data.json', 
      containerSelector = '#build-tools-container', 
      enableSearch = false,
      enableFilters = false,
      ...renderOptions 
    } = options;
    
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Container element not found: ${containerSelector}`);
      return;
    }
    
    try {
      // Show loading state
      container.innerHTML = `
        <div class="loading">
          <div class="loading-spinner"></div>
          <p>Loading build tools...</p>
        </div>
      `;
      
      // Load data
      const data = await loadBuildToolsData(jsonPath);
      
      // Render to DOM
      renderBuildToolsToDOM(data, { 
        containerSelector, 
        enableSearch, 
        enableFilters, 
        ...renderOptions 
      });
      
    } catch (error) {
      console.error('Failed to initialize build tools:', error);
      
      // Show error state
      container.innerHTML = `
        <div class="error">
          <div class="error-icon">⚠️</div>
          <h3>Failed to load build tools</h3>
          <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
          <button onclick="location.reload()" class="retry-button">Retry</button>
        </div>
      `;
    }
  }
  
  /**
   * Get statistics about the build tools data
   */
  function getBuildToolsStats(data: BuildToolsData): {
    total: number;
    byCategory: Record<string, number>;
    byPopularity: Record<string, number>;
    mostPopular: BuildTool[];
    categories: string[];
  } {
    const byCategory = data.buildTools.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byPopularity = data.buildTools.reduce((acc, tool) => {
      acc[tool.popularity] = (acc[tool.popularity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostPopular = data.buildTools.filter(tool => tool.popularity === 'high');
    const categories = [...new Set(data.buildTools.map(tool => tool.category))];
    
    return {
      total: data.buildTools.length,
      byCategory,
      byPopularity,
      mostPopular,
      categories
    };
  }


  document.addEventListener('DOMContentLoaded', () => {
    initializeBuildTools({
      jsonPath: '../assets/data.json',
      containerSelector: '#build-tools-container',
      enableSearch: true,
      enableFilters: true,
      groupByCategory: false,
      sortBy: 'name',
    });
  });
  
  
export {  
  loadBuildToolsData,
  renderBuildToolCard,
  sortBuildTools,
  groupByCategory,
  createSearchAndFilters,
  setupSearchAndFilters,
  renderBuildTools,
  renderBuildToolsToDOM,
  filterBuildTools,
  initializeBuildTools,
  getBuildToolsStats
}


const darkMode = new DarkModeManager();
const themeButton = document.querySelector('.theme-toggler button');
themeButton?.addEventListener('click', () => darkMode.toggle());