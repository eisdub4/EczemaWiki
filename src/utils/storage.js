const HEARD_VOTES_KEY = 'eczemawiki_heard_votes';
const SUBMISSIONS_KEY = 'eczemawiki_user_submissions';
const TIMESTAMPS_KEY = 'eczemawiki_myth_upvote_timestamps';

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function getHeardVotes() {
  try {
    const data = localStorage.getItem(HEARD_VOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('LocalStorage error:', e);
    return {};
  }
}

export function getUpvoteTimestamps() {
  try {
    const data = localStorage.getItem(TIMESTAMPS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('LocalStorage error:', e);
    return {};
  }
}

export function canUserUpvote(mythId) {
  if (!mythId) return false;
  const timestamps = getUpvoteTimestamps();
  const lastVotedAt = timestamps[mythId];
  if (!lastVotedAt || typeof lastVotedAt !== 'number') return true;
  return (Date.now() - lastVotedAt) >= COOLDOWN_MS;
}

export function recordUpvoteTimestamp(mythId) {
  try {
    const timestamps = getUpvoteTimestamps();
    timestamps[mythId] = Date.now();
    localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(timestamps));
    return true;
  } catch (e) {
    console.error('LocalStorage save error:', e);
    return false;
  }
}

export function incrementHeardVote(mythId) {
  if (!canUserUpvote(mythId)) {
    const votes = getHeardVotes();
    return { newCount: votes[mythId] || 0, success: false };
  }
  try {
    const votes = getHeardVotes();
    votes[mythId] = (votes[mythId] || 0) + 1;
    localStorage.setItem(HEARD_VOTES_KEY, JSON.stringify(votes));
    recordUpvoteTimestamp(mythId);
    return { newCount: votes[mythId], success: true };
  } catch (e) {
    console.error('LocalStorage save error:', e);
    return { newCount: 1, success: false };
  }
}

export function hasUserVoted(mythId) {
  return !canUserUpvote(mythId);
}

export function saveCommunitySubmission(submission) {
  try {
    const data = localStorage.getItem(SUBMISSIONS_KEY);
    const submissions = data ? JSON.parse(data) : [];
    const newSubmission = {
      id: `sub_${Date.now()}`,
      submittedMyth: submission.submittedMyth,
      contextNote: submission.contextNote || '',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    submissions.push(newSubmission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    return newSubmission;
  } catch (e) {
    console.error('LocalStorage save error:', e);
    return null;
  }
}
