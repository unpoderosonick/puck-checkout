import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EditorLayout } from './layouts/EditorLayout';
import { PageEditor } from './pages/PageEditor';
import { FlowPreview } from './pages/FlowPreview';
import { migrateLegacyData } from './utils/migrateLegacyData';
import './theme/variables.css';
import '@measured/puck/puck.css';

// Migrate legacy data on app load
migrateLegacyData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to editor */}
        <Route path="/" element={<Navigate to="/editor/checkout" replace />} />

        {/* Editor routes with layout */}
        <Route path="/editor" element={<EditorLayout />}>
          <Route index element={<Navigate to="checkout" replace />} />
          <Route path="checkout" element={<PageEditor pageType="checkout" />} />
          <Route path="order-bump" element={<PageEditor pageType="order-bump" />} />
          <Route path="downsell" element={<PageEditor pageType="downsell" />} />
        </Route>

        {/* Preview route */}
        <Route path="/preview" element={<FlowPreview />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/editor/checkout" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
