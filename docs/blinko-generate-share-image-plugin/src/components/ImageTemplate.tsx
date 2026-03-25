import { ComponentChildren } from "preact";
import { useState, useEffect } from "preact/hooks";

export interface TemplateProps {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  dateColor: string;
  tagBackgroundColor: string;
  tagTextColor: string;
  fontFamily?: string;
  borderRadius?: string;
  accentColor?: string;
}

export const predefinedTemplates: TemplateProps[] = [
  {
    id: "dark",
    name: "深色模式",
    backgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    dateColor: "#a0aec0",
    tagBackgroundColor: "#2d3748",
    tagTextColor: "#e2e8f0",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: "15px",
    accentColor: "#3b82f6",
  },
  {
    id: "light",
    name: "浅色模式",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    dateColor: "#4a5568",
    tagBackgroundColor: "#edf2f7",
    tagTextColor: "#2d3748",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: "15px",
    accentColor: "#3b82f6",
  },
  {
    id: "sepia",
    name: "复古风格",
    backgroundColor: "#f8f2e4",
    textColor: "#433422",
    dateColor: "#8c7851",
    tagBackgroundColor: "#e6d7c3",
    tagTextColor: "#5c4935",
    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
    borderRadius: "10px",
    accentColor: "#c59d5f",
  },
  {
    id: "ocean",
    name: "海洋风格",
    backgroundColor: "#e0f7fa",
    textColor: "#006064",
    dateColor: "#0097a7",
    tagBackgroundColor: "#b2ebf2",
    tagTextColor: "#00838f",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: "20px",
    accentColor: "#00acc1",
  },
  {
    id: "forest",
    name: "森林风格",
    backgroundColor: "#e8f5e9",
    textColor: "#1b5e20",
    dateColor: "#388e3c",
    tagBackgroundColor: "#c8e6c9",
    tagTextColor: "#2e7d32",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: "12px",
    accentColor: "#43a047",
  },
];

interface TemplateSelectProps {
  selectedTemplate: TemplateProps;
  onSelectTemplate: (template: TemplateProps) => void;
  className?: string;
  children?: ComponentChildren;
}

export default function TemplateSelect({
  selectedTemplate,
  onSelectTemplate,
  className = "",
  children,
}: TemplateSelectProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Improved mobile detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${className} w-full overflow-x-auto`}>
      {/* Template cards in scrollable container */}
      <div className="flex justify-center">
        <div
          className={`flex ${isMobile ? "gap-3" : "gap-4"}`}
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "10px",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
          }}
        >
          {predefinedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate.id === template.id}
              onClick={() => onSelectTemplate(template)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}

// Template card component
function TemplateCard({
  template,
  isSelected,
  onClick,
  isMobile,
}: {
  template: TemplateProps;
  isSelected: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  // Determine sizes based on device
  const cardSize = isMobile ? 68 : 90;
  const headerHeight = isMobile ? 24 : 30;

  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out select-none ${
        isSelected ? "transform scale-105" : "hover:scale-105"
      }`}
      onClick={onClick}
      style={{
        marginBottom: isMobile ? "4px" : "8px",
        minWidth: `${cardSize}px`,
      }}
    >
      {/* Modern color preview card */}
      <div
        className="relative mb-1 md:mb-2 overflow-hidden"
        style={{
          width: `${cardSize}px`,
          height: `${cardSize}px`,
          borderRadius: "12px",
          boxShadow: isSelected
            ? `0 0 0 2px ${
                template.accentColor || "#3b82f6"
              }, 0 4px 12px rgba(0, 0, 0, 0.15)`
            : "0 2px 6px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
          transform: isSelected ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Selected indicator */}
        {isSelected && (
          <div
            className="absolute top-2 right-2 z-10 rounded-full flex items-center justify-center"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke={template.accentColor || "#3b82f6"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Card header / background preview */}
        <div
          className="w-full rounded-t-xl"
          style={{
            backgroundColor: template.backgroundColor,
            height: `${headerHeight}px`,
            borderBottom: `1px solid rgba(0,0,0,0.05)`,
          }}
        />

        {/* Card content area with lines */}
        <div
          className="w-full h-full p-2"
          style={{
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Text lines with corresponding colors */}
          <div className="flex flex-col gap-1.5 mt-0.5">
            {/* Title line */}
            <div
              className="h-1.5 rounded-sm"
              style={{
                backgroundColor: template.textColor,
                width: "90%",
                opacity: 0.9,
              }}
            />

            {/* Content lines */}
            <div
              className="h-1 rounded-sm"
              style={{
                backgroundColor: template.textColor,
                width: "80%",
                opacity: 0.7,
              }}
            />

            <div
              className="h-1 rounded-sm"
              style={{
                backgroundColor: template.textColor,
                width: "85%",
                opacity: 0.7,
              }}
            />

            {/* Tag pills */}
            <div className="flex gap-1 mt-1">
              <div
                className="h-1.5 rounded-full"
                style={{
                  backgroundColor: template.tagBackgroundColor,
                  width: "24%",
                }}
              />
              <div
                className="h-1.5 rounded-full"
                style={{
                  backgroundColor: template.tagBackgroundColor,
                  width: "18%",
                }}
              />
            </div>

            {/* Date */}
            <div
              className="h-1 rounded-sm self-end mt-0.5"
              style={{
                backgroundColor: template.dateColor,
                width: "30%",
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      </div>

      {/* Template name */}
      <span
        className={`text-xs md:text-sm font-medium text-center transition-colors duration-200 px-1 py-0.5 rounded ${
          isSelected ? "bg-gray-100 text-gray-800" : "text-gray-600"
        }`}
        style={{
          maxWidth: `${cardSize}px`,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {template.name}
      </span>
    </div>
  );
}

function CustomTemplateCreator({
  baseTemplate,
  onSaveTemplate,
}: {
  baseTemplate: TemplateProps;
  onSaveTemplate: (template: TemplateProps) => void;
}) {
  const [template, setTemplate] = useState<TemplateProps>({
    ...baseTemplate,
    name: window.Blinko.i18n.t("customTemplate"),
    id: "custom-" + Date.now(),
  });

  const handleChange = (key: keyof TemplateProps, value: string) => {
    setTemplate((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg mt-4">
      <h3 className="text-lg font-medium">{window.Blinko.i18n.t("createCustomTemplate")}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("templateName")}
          </label>
          <input
            type="text"
            value={template.name}
            onChange={(e) =>
              handleChange("name", (e.target as HTMLInputElement).value)
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("backgroundColor")}
          </label>
          <div className="flex mt-1">
            <input
              type="color"
              value={template.backgroundColor}
              onChange={(e) =>
                handleChange(
                  "backgroundColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="h-10 w-10 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={template.backgroundColor}
              onChange={(e) =>
                handleChange(
                  "backgroundColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("textColor")}
          </label>
          <div className="flex mt-1">
            <input
              type="color"
              value={template.textColor}
              onChange={(e) =>
                handleChange("textColor", (e.target as HTMLInputElement).value)
              }
              className="h-10 w-10 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={template.textColor}
              onChange={(e) =>
                handleChange("textColor", (e.target as HTMLInputElement).value)
              }
              className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("dateColor")}
          </label>
          <div className="flex mt-1">
            <input
              type="color"
              value={template.dateColor}
              onChange={(e) =>
                handleChange("dateColor", (e.target as HTMLInputElement).value)
              }
              className="h-10 w-10 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={template.dateColor}
              onChange={(e) =>
                handleChange("dateColor", (e.target as HTMLInputElement).value)
              }
              className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("tagBackgroundColor")}
          </label>
          <div className="flex mt-1">
            <input
              type="color"
              value={template.tagBackgroundColor}
              onChange={(e) =>
                handleChange(
                  "tagBackgroundColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="h-10 w-10 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={template.tagBackgroundColor}
              onChange={(e) =>
                handleChange(
                  "tagBackgroundColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("tagTextColor")}
          </label>
          <div className="flex mt-1">
            <input
              type="color"
              value={template.tagTextColor}
              onChange={(e) =>
                handleChange(
                  "tagTextColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="h-10 w-10 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={template.tagTextColor}
              onChange={(e) =>
                handleChange(
                  "tagTextColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("accentColor")}
          </label>
          <div className="flex mt-1">
            <input
              type="color"
              value={template.accentColor || "#3b82f6"}
              onChange={(e) =>
                handleChange(
                  "accentColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="h-10 w-10 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={template.accentColor || "#3b82f6"}
              onChange={(e) =>
                handleChange(
                  "accentColor",
                  (e.target as HTMLInputElement).value
                )
              }
              className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("font")}
          </label>
          <select
            value={template.fontFamily}
            onChange={(e) =>
              handleChange("fontFamily", (e.target as HTMLSelectElement).value)
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
              {window.Blinko.i18n.t("systemDefaultFont")}
            </option>
            <option value="Georgia, Cambria, 'Times New Roman', Times, serif">
              {window.Blinko.i18n.t("serifFont")}
            </option>
            <option value="'Courier New', Courier, monospace">
              {window.Blinko.i18n.t("monospaceFont")}
            </option>
            <option value="'Comic Sans MS', cursive, sans-serif">
              {window.Blinko.i18n.t("handwritingFont")}
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {window.Blinko.i18n.t("borderRadius")}
          </label>
          <input
            type="text"
            value={template.borderRadius || "15px"}
            onChange={(e) =>
              handleChange("borderRadius", (e.target as HTMLInputElement).value)
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onSaveTemplate(template)}
        >
          {window.Blinko.i18n.t("saveTemplate")}
        </button>
      </div>
    </div>
  );
}
