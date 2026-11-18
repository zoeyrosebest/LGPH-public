import { existsSync } from 'node:fs';

/**
 * True when a file actually sits in public/ at build time.
 * Decorative images like the hand drawn heart can be removed from the
 * Media Manager, so the pages check rather than assume.
 */
export function hasAsset(publicPath: string): boolean {
  return existsSync(new URL(`../../public${publicPath}`, import.meta.url));
}
