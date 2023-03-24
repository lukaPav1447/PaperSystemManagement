import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { deletePaper } from '../actions/paperActions';
import { listProfessorPapers } from '../actions/paperProfessorActions';

const ProfessorPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paperProfessorList = useSelector((state) => state.paperProfessorList);
  const { loading, error, papers } = paperProfessorList;

  const paperDelete = useSelector((state) => state.paperDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = paperDelete;

  // let filteredPapers = [];

  useEffect(() => {
    if (!userInfo || !(userInfo.role === 'professor')) {
      history.push('/');
    }
    dispatch(listProfessorPapers());
  }, [dispatch, history, userInfo, successDelete]);

  const downloadTableHandler = () => {
    //CREATE PAPER BILO KOD STUDENTA
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
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row className='align-items-center'>
        <Col>
          <h1>Student Papers</h1>
        </Col>
        <Col className='text-center'>
          <h4>{`Welcome Professor ${userInfo.firstName}`}</h4>
        </Col>
        <Col
          className='text-right'
          style={{ display: 'flex', justifyContent: 'right' }}
        >
          <Button className='my-3' onClick={downloadTableHandler}>
            <i className='fas fa-download'></i> Download Table
          </Button>
        </Col>
      </Row>
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
                <th>STUDENT NAME</th>
                <th>STUDENT EMAIL</th>
                <th>FILE PATH</th>
                <th>STATUS</th>
                <th>TIME</th>
                <th>DATE</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper._id}>
                  <td>{paper._id}</td>
                  <td>{paper.subjectName.subjectName}</td>
                  <td>{`${paper.student.firstName} ${paper.student.lastName}`}</td>
                  <td>{paper.student.email}</td>
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
                  <td>{paper.createdAt.split('T')[1].split('.')[0]}</td>
                  <td>{paper.createdAt.split('T')[0]}</td>
                  {paper.status === 'returned' || paper.status === 'pending' ? (
                    <td className='text-center'>
                      <LinkContainer to={`/professor/paper/${paper._id}/edit`}>
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

export default ProfessorPage;
