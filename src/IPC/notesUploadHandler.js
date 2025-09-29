import getOctokit from "./getOctoKit";
const notesUploadHandler = async (
  event,
  { owner, repo, title, note, branch }
) => {
  try {
    //need to set up github client
    const octokit = getOctokit();
    //github requires file contents in base64 so we need to encode
    const contentBase64 = Buffer.from(note).toString("base64");
    //transform file names to make them more readable
    const rawTitle = (title || "untitled").toString();
    const slug =
      rawTitle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "untitled";

    //picking a branch, honestly dont need to because default is main but wtever
    let targetBranch = branch;
    if (!targetBranch) {
      try {
        const { data: repoInfo } = await octokit.repos.get({ owner, repo });
        targetBranch = repoInfo?.default_branch || "main";
        console.log(repoInfo);
      } catch (getErr) {
        const status = getErr?.status || getErr?.response?.status;
        const apiMessage = getErr?.response?.data?.message;
        const detailed = apiMessage
          ? `${status || ""} ${apiMessage}`.trim()
          : getErr.message;
        throw new Error(
          `Cannot access repo fix this shit: '${owner}/${repo}'. ${detailed}. ` +
            "The token might not have access or the repo doesnt exist."
        );
      }
    }

    // so I actually need a unique path and to get that I can Find a unique path under notes/ by incrementing -1, -2, ... if needed
    let candidatePath = `notes/${slug}.md`;
    let sha = null;
    let fileExists = false;

    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: candidatePath,
        ref: targetBranch,
      });
      //need sha if we're updating instead of creating
      sha = data.sha;
      fileExists = true;
    } catch (checkErr) {
      if (checkErr.status === 404) {
        // does not exist, we can create it
        fileExists = false;
      } else {
        throw checkErr;
      }
    }

    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: candidatePath,
      message: fileExists ? `Update note: ${slug}` : `Create note: ${slug}`,
      content: contentBase64,
      branch: targetBranch,
      ...(fileExists ? { sha } : {}), //alright so we're updating, then include the sha
    });
    return { success: true, data: response.data };
  } catch (e) {
    const status = e?.status || e?.response?.status;
    const apiMessage = e?.response?.data?.message;
    const detailed = apiMessage
      ? `${status || ""} ${apiMessage}`.trim()
      : e.message;
    console.error("GitHub API error:", {
      status,
      message: e.message,
      apiMessage,
      owner,
      repo,
      path,
    });
    return { success: false, error: detailed };
  }
};

export default notesUploadHandler;
