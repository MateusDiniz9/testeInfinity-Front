import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import TasksPage from './Pages/TasksPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
