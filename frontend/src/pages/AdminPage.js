import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { listUsers, deleteUser, createUser } from '../actions/userActions';
import { USER_CREATE_RESET } from '../constants/userConstants';

const AdminPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    user: createdUser,
  } = userCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: USER_CREATE_RESET });

    if (!userInfo || !(userInfo.role === 'admin')) {
      history.push('/');
    }

    if (successCreate) {
      history.push(`/admin/user/${createdUser._id}/edit`);
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdUser]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  const createUserHandler = () => {
    dispatch(createUser());
  };

  return (
    <>
      <Header />
      <Row className='align-items-center'>
        <Col>
          <h1>List of Users</h1>
        </Col>
        <Col className='text-center'>
          <h4>{`Welcome ${userInfo.firstName}`}</h4>
        </Col>
        <Col
          className='text-right'
          style={{ display: 'flex', justifyContent: 'right' }}
        >
          <Button className='my-3' onClick={createUserHandler}>
            <i className='fas fa-plus'></i> Create User
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>#</th>
                <th>FULL NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.status}{' '}
                    {user.status === 'approved' ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : user.status === 'pending' ? (
                      <i
                        className='fas fa-spinner'
                        style={{ color: '#077E8C' }}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-ban'
                        style={{ color: '#E83845' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AdminPage;
