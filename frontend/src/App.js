import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';
import UserEditPage from './pages/UserEditPage';

const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route path='/admin/list' component={AdminPage} />
          <Route path='/register' component={RegisterPage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
