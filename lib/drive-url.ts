/** Normalize a Google Drive URL to its embed-preview and download variants. */

export function isDriveUrl(url: string): boolean {
  return url.includes("drive.google.com")
}

/** Convert any Drive file URL to its /preview (iframe-embeddable) form. */
export function toDriveEmbedUrl(url: string): string {
  // https://drive.google.com/file/d/FILE_ID/view?... → /preview
  return url.replace(/\/(?:view|edit|open)(\?.*)?$/, "/preview")
}

/** Convert any Drive file URL to its direct-download form. */
export function toDriveDownloadUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/?]+)/)
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`
  return url
}

/**
 * Given any URL, return the best { embedUrl, downloadUrl } pair.
 * - Drive URLs are converted to /preview and /uc?export=download variants.
 * - Non-Drive URLs are returned as-is for both.
 */
export function normalizeDocUrl(url: string): { embedUrl: string; downloadUrl: string } {
  if (!url) return { embedUrl: url, downloadUrl: url }
  if (isDriveUrl(url)) {
    return { embedUrl: toDriveEmbedUrl(url), downloadUrl: toDriveDownloadUrl(url) }
  }
  return { embedUrl: url, downloadUrl: url }
}
