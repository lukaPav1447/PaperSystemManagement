import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';
import UserEditPage from './pages/UserEditPage';
import StudentPage from './pages/StudentPage';
import PaperStudentEditPage from './pages/PaperStudentEditPage';
import ProfessorPage from './pages/ProfessorPage';
import PaperProfessorEditPage from './pages/PaperProfessorEditPage';

const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route path='/admin/list' component={AdminPage} />
          <Route path='/student/list' component={StudentPage} />
          <Route path='/search/:keyword' component={ProfessorPage} />
          <Route path='/professor/list' component={ProfessorPage} exact />
          <Route
            path='/student/paper/:id/edit'
            component={PaperStudentEditPage}
          />
          <Route
            path='/professor/paper/:id/edit'
            component={PaperProfessorEditPage}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
