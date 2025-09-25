import { Octokit } from '@octokit/rest';

const getOctokit = () => {
  const GITHUB_TOKEN_NOTES = process.env.GITHUB_TOKEN_NOTES;
  if (!GITHUB_TOKEN_NOTES) {
    throw new Error('Github token is fucking broken');
  }
  return new Octokit({ auth: GITHUB_TOKEN_NOTES });
};

export default getOctokit;
