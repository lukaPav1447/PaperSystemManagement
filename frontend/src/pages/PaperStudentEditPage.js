import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listPaperDetails, updatePaper } from '../actions/paperActions';
import { listUsers } from '../actions/userActions';
import { listSubjects } from '../actions/subjectActions';
import { PAPER_UPDATE_RESET } from '../constants/paperConstants';

const PaperStudentEditPage = ({ match, history }) => {
  const paperId = match.params.id;

  const [professor, setProfessor] = useState({});
  const [subjectName, setSubjectName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const paperDetails = useSelector((state) => state.paperDetails);
  const { loading, error, paper } = paperDetails;

  const paperUpdate = useSelector((state) => state.paperUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = paperUpdate;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const subjectList = useSelector((state) => state.subjectList);
  const { subjects } = subjectList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PAPER_UPDATE_RESET });
      history.push('/student/list');
    } else {
      if (!paper.status || paper._id !== paperId) {
        dispatch(listPaperDetails(paperId));
        dispatch(listUsers());
        dispatch(listSubjects());
      } else {
        setProfessor(paper.professor);
        setSubjectName(paper.subjectName);
        setFilePath(paper.filePath);
      }
    }
  }, [dispatch, history, paperId, paper, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('pdf', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setFilePath(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePaper({
        _id: paperId,
        professor,
        subjectName,
        filePath,
      })
    );
  };

  return (
    <>
      <Row>
        <Col>
          <Link to='/student/list' className='btn btn-light my-3'>
            Go Back
          </Link>
        </Col>
        <Col>
          <h1>Edit Paper</h1>
        </Col>
      </Row>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col>
            <h2>Professor review on paper:</h2>
            <Card className='card border-primary mb-3'>
              {paper.comment &&
                paper.comment.map((comment, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{comment}</strong>
                    {console.log('Poslije petlje: ', paper.comment)}
                  </ListGroup.Item>
                ))}
            </Card>
          </Col>
          <Col>
            <Form onSubmit={submitHandler}>
              <Form.Group className='py-3' controlId='role'>
                <Form.Label>Professor </Form.Label>
                <Form.Control
                  as='select'
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                >
                  {users.map((user) => {
                    if (
                      user.role === 'professor' &&
                      user.status === 'approved'
                    ) {
                      return (
                        <option
                          key={user._id}
                          value={user._id}
                        >{`${user.firstName}  ${user.lastName}`}</option>
                      );
                    }
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group className='py-3' controlId='subjectName'>
                <Form.Label>Subject Name </Form.Label>
                <Form.Control
                  as='select'
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  {subjects.map((subject) => {
                    return (
                      <option
                        key={subject._id}
                        value={subject._id}
                      >{`${subject.subjectName}`}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='filePath'>
                <Form.Label>File Path</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter file url'
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                ></Form.Control>
                <Form.File
                  className='py-3'
                  id='pdf-file'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Button type='submit' variant='primary'>
                Send Paper
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PaperStudentEditPage;
