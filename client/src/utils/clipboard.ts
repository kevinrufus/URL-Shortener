export async function copyToClipboard(content: string) {
  try {
    await navigator.clipboard.writeText(content);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
