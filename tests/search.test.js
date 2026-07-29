import test from 'node:test';
import assert from 'node:assert/strict';

const { performGlobalSearch } = await import('../src/utils/search.js');
const { renderNavbar } = await import('../src/components/Navbar.js');
const { renderSearchResults } = await import('../src/components/SearchResults.js');

test('Search Functionality & Component Render Integrity', async (t) => {

  await t.test('performGlobalSearch returns empty results for empty or whitespace query', () => {
    assert.deepEqual(performGlobalSearch(''), { types: [], treatments: [], myths: [] });
    assert.deepEqual(performGlobalSearch('   '), { types: [], treatments: [], myths: [] });
  });

  await t.test('performGlobalSearch matches multi-word and partial word queries correctly', () => {
    const AtopicResult = performGlobalSearch('atopic');
    assert.ok(AtopicResult.types.length > 0, 'Should find atopic eczema in types');
    assert.equal(AtopicResult.types[0].title, 'Atopic Dermatitis');

    const SteroidResult = performGlobalSearch('steroids');
    assert.ok(SteroidResult.treatments.length > 0 || SteroidResult.myths.length > 0, 'Should match steroids in treatments or myths');
  });

  await t.test('renderNavbar includes search value when searchQuery argument is passed', () => {
    const navbarHtml = renderNavbar('types', () => {}, () => {}, 'atopic dermatitis');
    assert.ok(navbarHtml.includes('value="atopic dermatitis"'), 'Navbar HTML must include input value attribute when search query is active');
  });

  await t.test('renderSearchResults renders appropriate total matches and section titles', () => {
    const resultsHtml = renderSearchResults('contagious');
    assert.ok(resultsHtml.includes('Search Results for "contagious"'));
    assert.ok(resultsHtml.includes('Myth vs. Fact Cards'));
  });
});
