// Small text helpers so the words in content/*.json can stay plain and readable.
// Zoey types normal text; **double asterisks** make something bold, a blank line
// starts a new paragraph, and a single line break stays a line break.

export function esc(s = ''): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** One run of text: escapes it, turns **bold** bold, keeps single line breaks. */
export function inline(s = ''): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

/** A block of text: blank lines become separate paragraphs. */
export function paragraphs(s = ''): string[] {
  return s
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(inline);
}
