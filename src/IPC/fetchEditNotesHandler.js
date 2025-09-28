import getOctokit from "./getOctoKit";
//the bug was here, the parameters
/** this occurs because the entire IPC event frame object is passed as the note instead of actual note
 * this is because the first parameter is always the event object, then my argument
 * so I needed to deal with that event by adding an event to the arguments
2useEditNote.js:14 Error fetching repo: the note path is suppose to be a 
string, instead we have: {"type":"frame","sender":{"_windowOpenHandler":null,
"ipc":{"_events":{},"_eventsCount":1,"_invokeHandlers":{}},"navigationHistory":{},
"_events":{},"_eventsCount":16},"_replyChannel":{},"senderFrame":{},"frameId":1,
"processId":4,"frameTreeNodeId":1}
 */
const fetchEditNotesHandler = async (event, note) => {
  try {
    const octokit = getOctokit();

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "Zahmadgit",
        repo: "notes",
        path: `/${note}`,
        headers: {
          "X-Github-Api-Version": "2022-11-28",
        },
      }
    );
    const content = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    return { success: true, data: { ...response.data, decoded: content } };
  } catch (e) {
    return {
      success: false,
      error: e?.message || "VERY UNKNOWN BEHAVIOR ONISAN",
    };
  }
};

export default fetchEditNotesHandler;
