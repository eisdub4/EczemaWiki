const HEARD_VOTES_KEY = 'eczemawiki_heard_votes';
const SUBMISSIONS_KEY = 'eczemawiki_user_submissions';

export function getHeardVotes() {
  try {
    const data = localStorage.getItem(HEARD_VOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('LocalStorage error:', e);
    return {};
  }
}

export function incrementHeardVote(mythId) {
  try {
    const votes = getHeardVotes();
    votes[mythId] = (votes[mythId] || 0) + 1;
    localStorage.setItem(HEARD_VOTES_KEY, JSON.stringify(votes));
    return votes[mythId];
  } catch (e) {
    console.error('LocalStorage save error:', e);
    return 1;
  }
}

export function hasUserVoted(mythId) {
  const votes = getHeardVotes();
  return Boolean(votes[mythId]);
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
