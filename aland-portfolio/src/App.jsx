import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TypingTestPage from './tools/TypingTestPage';
import McCheckerPage from './tools/McCheckerPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tools/typing-test" element={<TypingTestPage />} />
      <Route path="/tools/mc-checker" element={<McCheckerPage />} />
    </Routes>
  );
}
