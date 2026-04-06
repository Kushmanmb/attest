const AVATAR_SIZE = 80
const BACKDROP_HEIGHT = 120
const BACKDROP_WIDTH = 440

export type ProfileBackdropOptions = {
  actor: string
  serverUrl: string
  owner: string
  repo: string
}

// Generates an SVG backdrop card displaying the GitHub user profile and
// repository information for inclusion in a workflow summary.
export const generateProfileBackdrop = (
  options: ProfileBackdropOptions
): string => {
  const { actor, serverUrl, owner, repo } = options
  const avatarUrl = `${serverUrl}/${actor}.png?size=${AVATAR_SIZE}`
  const profileUrl = `${serverUrl}/${actor}`
  const repoUrl = `${serverUrl}/${owner}/${repo}`

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${BACKDROP_WIDTH}" height="${BACKDROP_HEIGHT}" viewBox="0 0 ${BACKDROP_WIDTH} ${BACKDROP_HEIGHT}" role="img" aria-label="User profile backdrop for ${escapeXml(actor)}">
  <defs>
    <clipPath id="avatarClip">
      <circle cx="${AVATAR_SIZE / 2 + 20}" cy="${BACKDROP_HEIGHT / 2}" r="${AVATAR_SIZE / 2}"/>
    </clipPath>
    <linearGradient id="backdropGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1117"/>
      <stop offset="100%" stop-color="#161b22"/>
    </linearGradient>
  </defs>
  <rect width="${BACKDROP_WIDTH}" height="${BACKDROP_HEIGHT}" rx="12" ry="12" fill="url(#backdropGrad)"/>
  <rect width="${BACKDROP_WIDTH}" height="${BACKDROP_HEIGHT}" rx="12" ry="12" fill="none" stroke="#30363d" stroke-width="1"/>
  <image href="${escapeXml(avatarUrl)}" x="20" y="${(BACKDROP_HEIGHT - AVATAR_SIZE) / 2}" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}" clip-path="url(#avatarClip)"/>
  <circle cx="${AVATAR_SIZE / 2 + 20}" cy="${BACKDROP_HEIGHT / 2}" r="${AVATAR_SIZE / 2}" fill="none" stroke="#30363d" stroke-width="1"/>
  <a href="${escapeXml(profileUrl)}">
    <text x="${AVATAR_SIZE + 32}" y="${BACKDROP_HEIGHT / 2 - 8}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#e6edf3">${escapeXml(actor)}</text>
  </a>
  <a href="${escapeXml(repoUrl)}">
    <text x="${AVATAR_SIZE + 32}" y="${BACKDROP_HEIGHT / 2 + 16}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif" font-size="13" fill="#8b949e">${escapeXml(owner)}/${escapeXml(repo)}</text>
  </a>
</svg>`
}

// Escapes special XML characters to prevent injection in SVG content.
export const escapeXml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
