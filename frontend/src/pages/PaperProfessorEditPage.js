import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { updateProfessorPaper } from '../actions/paperProfessorActions';
import { listPaperDetails } from '../actions/paperActions';
import { PAPER_PROFESSOR_UPDATE_RESET } from '../constants/paperProfessorConstants';

const PaperStudentEditPage = ({ match, history }) => {
  const paperId = match.params.id;

  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  const paperDetails = useSelector((state) => state.paperDetails);
  const { loading, error, paper } = paperDetails;

  const paperProfessorUpdate = useSelector(
    (state) => state.paperProfessorUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = paperProfessorUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PAPER_PROFESSOR_UPDATE_RESET });
      history.push('/professor/list');
    } else {
      if (!paper.status || paper._id !== paperId) {
        dispatch(listPaperDetails(paperId));
      } else {
        setComment(paper.comment);
        setStatus(paper.status);
      }
    }
  }, [dispatch, history, paperId, paper, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfessorPaper({
        _id: paperId,
        comment,
        status,
      })
    );
    setComment('');
  };

  return (
    <>
      <Row className='py-3'>
        <Col>
          <Link to='/professor/list' className='btn btn-light my-3'>
            Go Back
          </Link>
        </Col>
        <Col>
          <h1>Review Paper</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              {paper.student && (
                <>
                  <h2>Student Name:</h2>
                  <h4>{`${paper.student.firstName} ${paper.student.lastName}`}</h4>
                  <h2>Subject:</h2>{' '}
                  <h4>{`${paper.subjectName.subjectName}`}</h4>
                </>
              )}
            </Col>
            <Col>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment on Paper</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='py-3' controlId='status'>
                  <Form.Label>Status: </Form.Label>
                  <Form.Control
                    as='select'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value=''>Choose status</option>
                    <option value='approved'>Approved</option>
                    <option value='pending'>Pending</option>
                    <option value='returned'>Returned</option>
                  </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PaperStudentEditPage;
