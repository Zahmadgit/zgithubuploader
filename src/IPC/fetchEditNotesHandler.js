import getOctokit from './getOctoKit';

const fetchEditNotesHandler = async (note) => {
  try {
    const octokit = getOctokit();

    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: 'Zahmadgit',
        repo: 'notes',
        path: '/notes',
        headers: {
          'X-Github-Api-Version': '2022-11-28',
        },
      }
    );

    return { success: true, data: response.data };
  } catch (e) {
    return {
      success: false,
      error: e?.message || 'VERY UNKNOWN BEHAVIOR ONISAN',
    };
  }
};

export default fetchEditNotesHandler;
