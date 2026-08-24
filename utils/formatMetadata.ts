// Utility function to format and capitalize listing names
export const capitalizeWords = (str: string) => {
    return str
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};
