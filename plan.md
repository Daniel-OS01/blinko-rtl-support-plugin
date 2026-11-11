1. Use `replace_with_git_merge_diff` to add proper ARIA roles to the settings tabs and hide decorative emojis in `src/setting.tsx`:
```
<<<<<<< SEARCH
      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('simple')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'simple' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'simple' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Simple
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'advanced' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'advanced' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Advanced
        </button>
        <button
          onClick={() => setActiveTab('uiux')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'uiux' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'uiux' ? '2px solid #28a745' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🎨 UI/UX
        </button>
        <button
          onClick={() => setActiveTab('aipost')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'aipost' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'aipost' ? '2px solid #6f42c1' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🤖 AI Post
        </button>
        <button
          onClick={() => setActiveTab('testing')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'testing' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'testing' ? '2px solid #fd7e14' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🧪 Tools
        </button>
      </div>
=======
      {/* Tabs */}
      <div role="tablist" aria-label="Settings Categories" style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        <button
          role="tab"
          aria-selected={activeTab === 'simple'}
          onClick={() => setActiveTab('simple')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'simple' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'simple' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Simple
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'advanced'}
          onClick={() => setActiveTab('advanced')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'advanced' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'advanced' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Advanced
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'uiux'}
          onClick={() => setActiveTab('uiux')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'uiux' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'uiux' ? '2px solid #28a745' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <span aria-hidden="true">🎨</span> UI/UX
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'aipost'}
          onClick={() => setActiveTab('aipost')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'aipost' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'aipost' ? '2px solid #6f42c1' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <span aria-hidden="true">🤖</span> AI Post
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'testing'}
          onClick={() => setActiveTab('testing')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'testing' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'testing' ? '2px solid #fd7e14' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <span aria-hidden="true">🧪</span> Tools
        </button>
      </div>
>>>>>>> REPLACE
```
2. Verify the changes using `run_in_bash_session` with `sed -n '1055,1150p' src/setting.tsx`.
3. Verify test passes by using `run_in_bash_session` with `bun test`.
4. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
5. Create a pull request using the `submit` tool with title "🎨 Palette: Add proper ARIA roles and hide decorative emojis in settings tabs" and include 💡 What, 🎯 Why, 📸 Before/After, and ♿ Accessibility in the description.
