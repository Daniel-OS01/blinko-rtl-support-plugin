# Blinko RTL Language Support Plugin
Automatically detects and applies RTL (Right-to-Left) styling for Hebrew, Arabic, and other RTL languages in Blinko notes.

## Features

- **Automatic Detection**: Intelligently identifies RTL content based on character analysis
- **Configurable Sensitivity**: Adjust detection thresholds for different use cases
- **Real-time Styling**: Applies RTL styling immediately as content is typed
- **Multiple Language Support**: Hebrew, Arabic, Syriac, and Thaana scripts
- **Customizable Selectors**: Define which elements should be processed
- **Performance Optimized**: Minimal impact on application performance
- **Settings Persistence**: Remembers your preferences across sessions

## Supported Languages

- **Hebrew** (עברית) - Primary focus
- **Arabic** (العربية)
- **Syriac** (ܠܫܢܐ ܣܘܪܝܝܐ)
- **Thaana** (ތާނަ)

## Installation

1. Download the plugin from releases or build from source
2. Install the plugin in your Blinko instance
3. Configure settings as needed

## Configuration

### Detection Sensitivity
- **High (10%)**: Triggers RTL styling with minimal RTL characters
- **Medium (20%)**: Balanced detection for mixed content
- **Low (40%)**: Only triggers with predominantly RTL text

### Direction Modes
- **Auto-detect**: Automatically determines text direction
- **Force RTL**: Always applies RTL styling
- **Force LTR**: Always applies LTR styling

### Custom Selectors
Add CSS selectors to target specific elements:
- `.note-content` - Note display areas
- `.note-editor` - Note editing interfaces
- `textarea` - Text input areas
- `.markdown-content` - Markdown rendered content

## Usage Examples

### Hebrew Text
```
שלום עולם - זהו טקסט בעברית
Hello world - this is English mixed with Hebrew טקסט מעורב
```

### Arabic Text
```
مرحبا بالعالم - هذا نص باللغة العربية
Hello world - this is English mixed with Arabic نص مختلط
```

## API

The plugin exposes a global `blinkoRTL` object for programmatic access:

```
// Test RTL detection
window.blinkoRTL.test("שלום עולם"); // Returns true

// Access detector and styler instances
window.blinkoRTL.detector.detectRTL("text");
window.blinkoRTL.styler.applyRTL(element, true);
```

## Development

### Building from Source
```
git clone https://github.com/Daniel-OS01/blinko-rtl-language-support-plugin.git
cd blinko-rtl-language-support-plugin
bun install
```

### Building
```
bun run build
```

### Development Mode
```
bun run dev
```

### Publish
```
bun run release:publish
```

### Publish
```
bun run release:publish
```
docker update --restart=no $(docker ps -a -q)

### Testing
The plugin includes comprehensive test examples for different scenarios:
- Pure RTL text
- Pure LTR text
- Mixed RTL/LTR content
- Edge cases (punctuation, numbers, etc.)

## Troubleshooting

### Common Issues

1. **RTL not detected**: Check sensitivity settings and minimum character thresholds
2. **Wrong direction applied**: Verify CSS selectors target correct elements
3. **Performance issues**: Reduce monitored selectors or disable auto-detection

### Debug Mode
Enable debug logging by setting:
```
localStorage.setItem('blinko-rtl-debug', 'true');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Changelog

### v1.0.0
- Initial release
- Hebrew and Arabic support
- Configurable detection sensitivity
- Real-time content monitoring
- Settings persistence
- Performance optimization

## Support

For issues, feature requests, or questions:
- Create an issue on GitHub
- Check existing documentation
- Test with debug mode enabled
