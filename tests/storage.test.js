import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node.js test environment
const mockStorage = {};
globalThis.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, value) => { mockStorage[key] = String(value); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

const {
  getHeardVotes,
  canUserUpvote,
  incrementHeardVote,
  getUpvoteTimestamps,
  recordUpvoteTimestamp
} = await import('../src/utils/storage.js');

test('Rate Limiting Storage Logic', async (t) => {
  t.beforeEach(() => {
    localStorage.clear();
  });

  await t.test('canUserUpvote returns true when no prior vote exists', () => {
    assert.equal(canUserUpvote('myth_1'), true);
  });

  await t.test('incrementHeardVote succeeds on first vote and sets timestamp', () => {
    const result = incrementHeardVote('myth_1');
    assert.equal(result.success, true);
    assert.equal(result.newCount, 1);
    assert.equal(canUserUpvote('myth_1'), false);
  });

  await t.test('incrementHeardVote rejects second vote within 24 hours', () => {
    incrementHeardVote('myth_1');
    const secondTry = incrementHeardVote('myth_1');
    assert.equal(secondTry.success, false);
    assert.equal(secondTry.newCount, 1);
  });

  await t.test('allows upvoting again after 24 hours elapse', () => {
    incrementHeardVote('myth_1');
    assert.equal(canUserUpvote('myth_1'), false);

    // Simulate 24 hours + 1 ms passing by altering stored timestamp
    const timestamps = getUpvoteTimestamps();
    timestamps['myth_1'] = Date.now() - (24 * 60 * 60 * 1000 + 100);
    localStorage.setItem('eczemawiki_myth_upvote_timestamps', JSON.stringify(timestamps));

    assert.equal(canUserUpvote('myth_1'), true);
    const secondDayVote = incrementHeardVote('myth_1');
    assert.equal(secondDayVote.success, true);
    assert.equal(secondDayVote.newCount, 2);
  });

  await t.test('tracks multiple myth cards independently', () => {
    incrementHeardVote('myth_1');
    assert.equal(canUserUpvote('myth_1'), false);
    assert.equal(canUserUpvote('myth_2'), true);

    const myth2Result = incrementHeardVote('myth_2');
    assert.equal(myth2Result.success, true);
    assert.equal(canUserUpvote('myth_2'), false);
  });
});
