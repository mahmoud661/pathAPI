export function titleToSlug(title: string): string {
  const timeStamp = new Date().getTime();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `gen-${slug}-${timeStamp}`;
}
