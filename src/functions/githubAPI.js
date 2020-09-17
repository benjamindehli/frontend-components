
export const fetchCommits = (owner, repo) => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
  return fetch(apiUrl).then(res => res.json()).then(commits => {
    return commits;
  });
}
