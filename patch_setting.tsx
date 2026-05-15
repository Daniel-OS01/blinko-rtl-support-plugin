--- src/setting.tsx
+++ src/setting.tsx
@@ -1563,6 +1563,7 @@

             <button
               onClick={deletePreset}
               disabled={!settings.enabled || !selectedPresetId || BUILT_IN_PRESETS.some(p => p.id === selectedPresetId)}
+              aria-label="Delete selected preset"
               style={{
                 background: '#dc3545',
                 color: 'white',
@@ -1571,10 +1572,11 @@
                 borderRadius: '4px',
                 cursor: 'pointer',
                 opacity: (BUILT_IN_PRESETS.some(p => p.id === selectedPresetId)) ? 0.5 : 1
               }}
-              title="Delete selected preset"
+              title={!settings.enabled ? "Plugin is disabled" : !selectedPresetId ? "No preset selected" : BUILT_IN_PRESETS.some(p => p.id === selectedPresetId) ? "Built-in presets cannot be deleted" : "Delete selected preset"}
             >
-              🗑️
+              <span aria-hidden="true">🗑️</span>
             </button>
           </div>
         </div>
