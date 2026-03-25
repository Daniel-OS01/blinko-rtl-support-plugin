import { TemplateProps } from './ImageTemplate';
import { generateImageFromHtml, generateRandomFilename as generateRandomHtmlFilename } from './HtmlToImageGenerator';

/**
 * Generate a random filename for the image
 * @returns A random filename with timestamp and random number
 */
export function generateRandomFilename(): string {
  return generateRandomHtmlFilename();
}

/**
 * Generate an image from an HTML element
 * This is a wrapper around the HtmlToImageGenerator to maintain backward compatibility
 * 
 * @param element - The HTML element to convert to an image
 * @param options - Optional configuration options
 * @returns Promise with the data URL of the generated image
 */
export async function generateImage(
  element: HTMLElement | null,
  options: {
    setErrorMessage?: (message: string | null) => void;
    quality?: number;
    pixelRatio?: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
  } = {}
): Promise<string | null> {
  if (!element) {
    if (options.setErrorMessage) {
      options.setErrorMessage('Element not found');
    }
    return null;
  }

  try {
    // Wait for a small delay to ensure the element is fully rendered
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Use the HtmlToImageGenerator to generate the image
    return await generateImageFromHtml(element, options);
  } catch (error) {
    console.error('Error in generateImage:', error);
    if (options.setErrorMessage) {
      options.setErrorMessage(`Error generating image: ${error instanceof Error ? error.message : String(error)}`);
    }
    return null;
  }
}
