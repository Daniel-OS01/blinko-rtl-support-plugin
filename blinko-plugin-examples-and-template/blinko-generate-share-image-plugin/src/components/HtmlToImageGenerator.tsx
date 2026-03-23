import { toPng } from "html-to-image";

/**
 * Generate a random filename for the image
 */
export function generateRandomFilename(): string {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `share-image-${timestamp}-${random}.png`;
}

/**
 * Generate an image from an HTML element using html-to-image
 */
export async function generateImageFromHtml(
  element: HTMLElement | null,
  options: {
    setErrorMessage?: (message: string | null) => void;
    backgroundColor?: string;
  } = {}
): Promise<string | null> {
  if (!element) {
    if (options.setErrorMessage) options.setErrorMessage("Element not found");
    return null;
  }

  try {
    // 获取元素的实际尺寸
    const rect = element.getBoundingClientRect();
    console.log("Element dimensions:", rect.width, rect.height);

    // 基本配置
    const config = {
      backgroundColor: options.backgroundColor || "#ffffff",
      width: rect.width,
      height: rect.height,
      style: {
        // 确保元素样式正确
        transform: 'none',
        width: `${rect.width}px`,
        height: `${rect.height}px`
      },
      pixelRatio: 2, // 高清图
      skipAutoScale: true,
      cacheBust: true
    };

    console.log("Generating image with config:", config);
    
    // 生成图片
    const dataUrl = await toPng(element, config);
    console.log("Image generated successfully");
    return dataUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    if (options.setErrorMessage) {
      options.setErrorMessage(
        `Error generating image: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
    return null;
  }
}

/**
 * Download an image from a data URL
 */
export function downloadImage(
  dataUrl: string,
  filename: string = generateRandomFilename()
): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Copy an image to clipboard
 */
export async function copyImageToClipboard(dataUrl: string): Promise<boolean> {
  try {
    // Create a temporary image element
    const img = new Image();
    img.src = dataUrl;

    // Wait for the image to load
    await new Promise((resolve) => {
      img.onload = resolve;
      setTimeout(resolve, 500); // 添加超时保护
    });

    // Create a canvas to draw the image
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image on the canvas
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (blob) {
        // Create a ClipboardItem and write to clipboard
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Failed to copy image:", error);
    return false;
  }
}
