export function formatUppercaseFirstLetter(text: string): string {
  if (!text) 
    return text;

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDateToReadable(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
