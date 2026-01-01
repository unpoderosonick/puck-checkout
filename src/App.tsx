import { useState, useCallback, useRef } from 'react';
import { Puck, Render } from '@measured/puck';
import { config } from './puck/config';
import { defaultCheckoutData } from './puck/defaultCheckout';
import type { Data } from '@measured/puck';

function App() {
  // Load from localStorage or use default
  const getInitialData = (): Data => {
    const saved = localStorage.getItem('checkout-config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultCheckoutData;
      }
    }
    return defaultCheckoutData;
  };

  const [isEditing, setIsEditing] = useState(true);
  const [previewData, setPreviewData] = useState<Data>(getInitialData);
  const latestDataRef = useRef<Data>(getInitialData());

  const handlePublish = useCallback((publishData: Data) => {
    console.log('Published:', publishData);
    localStorage.setItem('checkout-config', JSON.stringify(publishData));
    setPreviewData(publishData);
    latestDataRef.current = publishData;
  }, []);

  // Track changes for preview but don't control Puck state
  const handleChange = useCallback((newData: Data) => {
    latestDataRef.current = newData;
  }, []);

  const handleToggle = () => {
    if (isEditing) {
      // Switching to preview - use latest data
      setPreviewData(latestDataRef.current);
    }
    setIsEditing(!isEditing);
  };

  const handleReset = () => {
    localStorage.removeItem('checkout-config');
    window.location.reload();
  };

  return (
    <div className="app">
      {/* Toggle Buttons */}
      <div style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 10000,
        display: 'flex',
        gap: '8px',
      }}>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
            background: '#e74c3c',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <button
          onClick={handleToggle}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
            background: isEditing ? '#008060' : '#1773b0',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </div>

      {/* Editor or Preview */}
      {isEditing ? (
        <Puck
          config={config}
          data={previewData}
          onChange={handleChange}
          onPublish={handlePublish}
          headerTitle="Checkout Builder"
        />
      ) : (
        <div className="checkout-preview">
          <Render config={config} data={previewData} />
        </div>
      )}
    </div>
  );
}

export default App;
