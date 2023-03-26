import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
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
  const { error: errorUpdate, success: successUpdate } = paperProfessorUpdate;

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
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              <Container style={{ overflow: 'auto', height: '530px' }}>
                <Worker
                  workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.js`}
                >
                  <Viewer
                    fileUrl={paper.filePath}
                    // defaultScale={SpecialZoomLevel.PageFit}
                  />
                </Worker>
              </Container>
            </Col>
            <Col>
              {paper.student && (
                <>
                  <h2>Student Name:</h2>
                  <h4>{`${paper.student.firstName} ${paper.student.lastName}`}</h4>
                  <h2>Subject:</h2>{' '}
                  <h4>{`${paper.subjectName.subjectName}`}</h4>
                </>
              )}
              <hr />
              <h2>Last comments you wrote:</h2>
              <Card className='card border-primary mb-3'>
                {paper.comment &&
                  paper.comment.map((comment, index) => (
                    <ListGroup.Item key={index}>
                      <strong>
                        {index + 1} {`.${comment}`}
                      </strong>
                    </ListGroup.Item>
                  ))}
              </Card>
              <hr />

              <Form onSubmit={submitHandler}>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment on paper:</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='py-3' controlId='status'>
                  <Form.Label>Change paper status: </Form.Label>
                  <Form.Control
                    as='select'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value='approved'>Approved</option>
                    <option value='pending'>Pending</option>
                    <option value='returned'>Returned</option>
                  </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Send review
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
