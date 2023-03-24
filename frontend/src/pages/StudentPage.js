import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Header from '../components/Header';
import {
  listMyPapers,
  createPaper,
  deletePaper,
} from '../actions/paperActions';
import { PAPER_CREATE_RESET } from '../constants/paperConstants';

const StudentPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paperMyList = useSelector((state) => state.paperMyList);
  const { loading, error, papers } = paperMyList;

  // let filteredPapers = [];

  const paperDelete = useSelector((state) => state.paperDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = paperDelete;

  const paperCreate = useSelector((state) => state.paperCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    paper: createdPaper,
  } = paperCreate;

  useEffect(() => {
    dispatch({ type: PAPER_CREATE_RESET });

    if (!userInfo || !(userInfo.role === 'student')) {
      history.push('/');
    }

    if (successCreate) {
      history.push(`/student/paper/${createdPaper._id}/edit`);
    } else {
      dispatch(listMyPapers());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdPaper]);

  const createUserHandler = () => {
    dispatch(createPaper());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePaper(id));
    }
  };

  // const filterPapers = ({ professorName }) => {
  //   if (professorName) {
  //     console.log('PAPERS', papers);
  //     filteredPapers = papers.filter(
  //       (p) =>
  //         p.professor.firstName.search(new RegExp(professorName, 'i')) !== -1
  //     );
  //   }
  // };

  return (
    <>
      <Header />
      {/* <Row className='align-items-center'>
        <Col>
          <Form inline>
            <Form.Control
              type='text'
              name='q'
              onChange={(e) => filterPapers({ professorName: e.target.value })}
              placeholder='Search Professor first name...'
              className='mr-sm-2 ml-sm-5'
            ></Form.Control>
          </Form>
        </Col>
      </Row> */}
      <Row className='align-items-center'>
        <Col>
          <h1>My Papers</h1>
        </Col>
        <Col className='text-center'>
          <h4>{`Welcome ${userInfo.firstName}`}</h4>
        </Col>
        <Col
          className='text-right'
          style={{ display: 'flex', justifyContent: 'right' }}
        >
          <Button className='my-3' onClick={createUserHandler}>
            <i className='fas fa-plus'></i> Add New Paper
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
                <th>PAPER ID</th>
                <th>SUBJECT NAME</th>
                <th>PROFESSOR NAME</th>
                <th>PROFESSOR EMAIL</th>
                <th>FILE PATH</th>
                <th>STATUS</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper._id}>
                  <td>{paper._id}</td>
                  <td>{paper.subjectName.subjectName}</td>
                  <td>{`${paper.professor.firstName} ${paper.professor.lastName}`}</td>
                  <td>{paper.professor.email}</td>
                  <td>{paper.filePath}</td>
                  <td>
                    {paper.status}{' '}
                    {paper.status === 'approved' ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : paper.status === 'pending' ? (
                      <i
                        className='fas fa-spinner'
                        style={{ color: '#077E8C' }}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-search'
                        style={{ color: '#F6BE00' }}
                      ></i>
                    )}
                  </td>

                  {paper.status === 'returned' ? (
                    <td className='text-center'>
                      <LinkContainer to={`/student/paper/${paper._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  ) : (
                    <td className='text-center'>
                      <LinkContainer to={`/student/paper/${paper._id}/edit`}>
                        <Button disabled variant='dark' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  )}
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(paper._id)}
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

export default StudentPage;
