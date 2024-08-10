import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './common/components/Layout/Layout';
import CasesPage from './features/case/AllCases';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from './common/utils/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="cases" element={<CasesPage />} />
            <Route path="/" element={<Navigate to="/cases" />} />
          </Route>
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
