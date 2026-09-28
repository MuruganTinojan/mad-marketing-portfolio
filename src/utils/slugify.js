/**
 * Deterministic SEO-friendly slug utility
 * Generates consistent, URL-safe slugs from article titles or existing slugs
 */

export function createSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace accented chars
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove unwanted characters (keep alphanumeric and hyphens)
    .replace(/[^\w-]+/g, '')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/--+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Get or compute an SEO slug for a blog object
 */
export function getBlogSlug(blog) {
  if (!blog) return '';
  if (blog.slug && typeof blog.slug === 'string' && blog.slug.trim()) {
    return createSlug(blog.slug);
  }
  if (blog.title && typeof blog.title === 'string' && blog.title.trim()) {
    return createSlug(blog.title);
  }
  if (blog.id !== undefined && blog.id !== null) {
    return createSlug(String(blog.id));
  }
  return '';
}

/**
 * Match blog by slug, ID, or title
 */
export function findBlogBySlug(blogs, slug) {
  if (!blogs || !Array.isArray(blogs) || !slug) return null;
  const target = createSlug(slug);
  
  // 1. Exact slug match
  const match = blogs.find((b) => getBlogSlug(b) === target);
  if (match) return match;
  
  // 2. ID match fallback for backward compatibility
  const idMatch = blogs.find((b) => String(b.id) === String(slug) || createSlug(String(b.id)) === target);
  if (idMatch) return idMatch;
  
  return null;
}
