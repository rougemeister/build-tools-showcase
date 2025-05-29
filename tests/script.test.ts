/**
 * @jest-environment jsdom
 */
import {
    renderBuildToolCard,
    sortBuildTools,
    groupByCategory,
    filterBuildTools,
    getBuildToolsStats,
  } from '../src/scripts/script'; // Replace with actual path
  import type { BuildTool, BuildToolsData } from '../src/scripts/types'; // Adjust path as necessary
  
  const sampleTools: BuildTool[] = [
    {
      id: '1',
      name: 'Webpack',
      description: 'A static module bundler for JavaScript.',
      category: 'bundler',
      popularity: 'high',
      logo: 'logo1.png',
      color: '#8ed6fb',
      website: 'https://webpack.js.org'
    },
    {
      id: '2',
      name: 'Vite',
      description: 'Next Generation Frontend Tooling.',
      category: 'bundler',
      popularity: 'growing',
      logo: 'logo2.png',
      color: '#646cff',
      website: 'https://vitejs.dev'
    },
    {
      id: '3',
      name: 'ESLint',
      description: 'Find and fix problems in your JavaScript code.',
      category: 'linter',
      popularity: 'high',
      logo: 'logo3.png',
      color: '#4b32c3',
      website: 'https://eslint.org'
    }
  ];
  
  const data: BuildToolsData = { buildTools: sampleTools };
  
  describe('renderBuildToolCard', () => {
    it('renders tool card with correct structure', () => {
      const html = renderBuildToolCard(sampleTools[0]);
      expect(html).toContain(sampleTools[0].name);
      expect(html).toContain(sampleTools[0].description);
      expect(html).toContain(sampleTools[0].category);
      expect(html).toContain(sampleTools[0].popularity);
    });
  });
  
  describe('sortBuildTools', () => {
    it('sorts by name by default', () => {
      const sorted = sortBuildTools(sampleTools);
      expect(sorted[0].name).toBe('ESLint');
      expect(sorted[1].name).toBe('Vite');
      expect(sorted[2].name).toBe('Webpack');
    });
  
    it('sorts by popularity', () => {
      const sorted = sortBuildTools(sampleTools, 'popularity');
      expect(sorted[0].popularity).toBe('high');
    });
  
    it('sorts by category', () => {
      const sorted = sortBuildTools(sampleTools, 'category');
      expect(sorted[0].category).toBe('bundler');
      expect(sorted[2].category).toBe('linter');
    });
  });
  
  describe('groupByCategory', () => {
    it('groups tools by category', () => {
      const grouped = groupByCategory(sampleTools);
      expect(Object.keys(grouped)).toEqual(expect.arrayContaining(['bundler', 'linter']));
      expect(grouped['bundler'].length).toBe(2);
      expect(grouped['linter'].length).toBe(1);
    });
  });
  
  describe('filterBuildTools', () => {
    it('filters by category', () => {
      const result = filterBuildTools(data, { category: 'bundler' });
      expect(result.buildTools.length).toBe(2);
    });
  
    it('filters by popularity', () => {
      const result = filterBuildTools(data, { popularity: 'high' });
      expect(result.buildTools.length).toBe(2);
    });
  
    it('filters by search term', () => {
      const result = filterBuildTools(data, { search: 'vite' });
      expect(result.buildTools[0].name).toBe('Vite');
    });
  
    it('applies multiple filters together', () => {
      const result = filterBuildTools(data, {
        category: 'bundler',
        popularity: 'growing',
        search: 'vite'
      });
      expect(result.buildTools.length).toBe(1);
      expect(result.buildTools[0].name).toBe('Vite');
    });
  });
  
  describe('getBuildToolsStats', () => {
    it('returns correct stats object', () => {
      const stats = getBuildToolsStats(data);
      expect(stats.total).toBe(3);
      expect(stats.byCategory.bundler).toBe(2);
      expect(stats.byPopularity.high).toBe(2);
      expect(stats.mostPopular.length).toBe(2);
      expect(stats.categories).toContain('linter');
    });
  });
  