import { useRef, useEffect, useState } from "preact/hooks";
import Markdown from "preact-markdown";
import type { JSXInternal } from "preact/src/jsx";
import { TemplateProps } from "./ImageTemplate";

interface ImageContentProps {
  content: string;
  createdAt: string;
  tags: string[];
  template: TemplateProps;
  attachments?: Array<{
    path: string;
    type: string;
  }>;
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function ImageContent({
  content,
  createdAt,
  tags,
  template,
  attachments = [],
}: ImageContentProps): JSXInternal.Element {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter image attachments
  const imageAttachments = attachments.filter(
    (attachment) => attachment.type && attachment.type.startsWith("image/")
  );

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: ${template.tagBackgroundColor};
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: ${template.tagTextColor};
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: ${template.dateColor};
    }
  `;

  // Custom markdown styles
  const markdownStyles = `
    .markdown-content {
      font-size: ${isMobile ? "0.9rem" : "1rem"};
      line-height: 1.7;
    }
    
    .markdown-content h1, 
    .markdown-content h2, 
    .markdown-content h3, 
    .markdown-content h4, 
    .markdown-content h5, 
    .markdown-content h6 {
      color: ${template.textColor};
      font-weight: bold;
      margin-top: ${isMobile ? "0.8rem" : "1.2rem"};
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
      line-height: 1.3;
    }
    
    .markdown-content h1 {
      font-size: ${isMobile ? "1.3rem" : "1.7rem"};
    }
    
    .markdown-content h2 {
      font-size: ${isMobile ? "1.15rem" : "1.5rem"};
    }
    
    .markdown-content h3 {
      font-size: ${isMobile ? "1rem" : "1.3rem"};
    }
    
    .markdown-content p {
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
      line-height: 1.7;
    }
    
    .markdown-content ul, 
    .markdown-content ol {
      padding-left: ${isMobile ? "1rem" : "1.2rem"};
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
    }
    
    .markdown-content li {
      margin-bottom: ${isMobile ? "0.3rem" : "0.4rem"};
    }
    
    .markdown-content code {
      background-color: ${template.tagBackgroundColor};
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-size: ${isMobile ? "0.7rem" : "0.85rem"};
      font-family: monospace;
    }
    
    .markdown-content pre {
      background-color: ${template.tagBackgroundColor};
      padding: ${isMobile ? "0.6rem" : "0.8rem"};
      border-radius: 0.4rem;
      overflow: auto;
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
      max-width: 100%;
    }
    
    .markdown-content pre code {
      background-color: transparent;
      padding: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    
    .markdown-content blockquote {
      border-left: 3px solid ${template.tagBackgroundColor};
      padding-left: ${isMobile ? "0.6rem" : "0.8rem"};
      margin-left: 0;
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
      color: ${template.dateColor};
    }
    
    .markdown-content a {
      color: ${template.accentColor || "#3b82f6"};
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .markdown-content a:hover {
      color: ${template.accentColor ? template.accentColor : "#2563eb"};
      text-decoration: underline;
    }
    
    .markdown-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.4rem;
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }
    
    .markdown-content hr {
      border: none;
      border-top: 1px solid ${template.tagBackgroundColor};
      margin: ${isMobile ? "1rem 0" : "1.2rem 0"};
    }
    
    /* Improved table styles */
    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: ${isMobile ? "0.6rem" : "0.8rem"};
      overflow-x: auto;
      display: block;
      border-radius: 0.4rem;
      border: 1px solid ${template.tagBackgroundColor};
    }
    
    .markdown-content th, 
    .markdown-content td {
      border: 1px solid ${template.tagBackgroundColor};
      padding: ${isMobile ? "0.3rem" : "0.6rem"};
      text-align: left;
    }
    
    .markdown-content th {
      background-color: ${template.tagBackgroundColor};
      font-weight: bold;
      color: ${template.tagTextColor};
    }
    
    /* Improved code block styles */
    .markdown-content pre {
      background-color: ${
        template.backgroundColor === "#1a1a1a"
          ? "#2d3748"
          : template.tagBackgroundColor
      };
      border-radius: 0.4rem;
      margin: ${isMobile ? "0.6rem 0" : "0.8rem 0"};
      overflow-x: auto;
      position: relative;
      padding-top: ${isMobile ? "1.5rem" : "2rem"};
    }
    
    .markdown-content pre::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      height: 0.75rem;
      width: 0.75rem;
      border-radius: 50%;
      background: #ff5f56;
      box-shadow: 1.25rem 0 0 #ffbd2e, 2.5rem 0 0 #27c93f;
    }
    
    .markdown-content pre code {
      display: block;
      padding: 0 ${isMobile ? "0.6rem" : "1rem"} ${
    isMobile ? "0.6rem" : "1rem"
  };
      overflow-x: auto;
      background-color: transparent;
      color: ${
        template.backgroundColor === "#1a1a1a" ? "#f8f8f2" : template.textColor
      };
      font-family: 'Fira Code', monospace, 'Courier New', Courier;
      font-size: ${isMobile ? "0.7rem" : "0.8rem"};
      line-height: 1.6;
    }
    
    /* Language banner for code blocks */
    .markdown-content pre[class*="language-"]::after {
      content: attr(class);
      content: attr(data-lang);
      position: absolute;
      top: 0;
      right: 1rem;
      padding: 0 0.5rem;
      text-transform: uppercase;
      font-size: 0.7rem;
      color: ${template.dateColor};
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <style>{markdownStyles}</style>

      <div
        className="right-3 text-xs md:text-base font-medium"
        style={{ color: template.dateColor }}
      >
        {formatDate(createdAt)}
      </div>

      <div className="markdown-content mt-2">
        {/* @ts-ignore */}
        <Markdown markdown={content} />
      </div>

      <div className="mt-2 md:mt-4 custom-scrollbar max-h-full">
        {/* Display image attachments if available */}
        {imageAttachments.length > 0 && (
          <div className="mb-4 md:mb-6 flex flex-wrap gap-2">
            {imageAttachments.map((attachment, index) => (
              <img
                key={index}
                src={attachment.path}
                alt={`Attachment ${index + 1}`}
                className="max-w-full rounded-lg"
                style={{
                  maxHeight: "300px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
