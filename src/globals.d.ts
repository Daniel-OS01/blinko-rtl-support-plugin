// Ambient (non-module) global declarations.
// Named 'globals.d.ts' (not 'types.d.ts') so TypeScript treats this as a
// standalone ambient file. A file named 'types.d.ts' alongside 'types.ts'
// would be seen as the declaration file for that module, not as a global
// ambient extension — causing the Window augmentation to be silently ignored.
// No top-level import/export here; inline import() types are used instead.

declare const __PLUGIN_VERSION__: string;

interface Window {
    blinkoRTL: import('./types').BlinkoRTL;
    Blinko: any;
}
