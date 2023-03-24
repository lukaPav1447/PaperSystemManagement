import axios from 'axios';
import {
  PAPER_MY_LIST_REQUEST,
  PAPER_MY_LIST_SUCCESS,
  PAPER_MY_LIST_FAIL,
  PAPER_CREATE_REQUEST,
  PAPER_CREATE_SUCCESS,
  PAPER_CREATE_FAIL,
  PAPER_UPDATE_REQUEST,
  PAPER_UPDATE_SUCCESS,
  PAPER_DELETE_REQUEST,
  PAPER_DELETE_SUCCESS,
  PAPER_DELETE_FAIL,
  PAPER_DETAILS_REQUEST,
  PAPER_DETAILS_SUCCESS,
  PAPER_DETAILS_FAIL,
  PAPER_UPDATE_FAIL,
} from '../constants/paperConstants';
import { logout } from './userActions';

export const listMyPapers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAPER_MY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/papers/mypapers`, config);

    dispatch({
      type: PAPER_MY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PAPER_MY_LIST_FAIL,
      payload: message,
    });
  }
};

export const createPaper = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAPER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/papers`, {}, config);

    dispatch({
      type: PAPER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PAPER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deletePaper = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAPER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/papers/${id}`, config);

    dispatch({ type: PAPER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PAPER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const listPaperDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAPER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/papers/${id}`);

    dispatch({
      type: PAPER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAPER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePaper = (paper) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAPER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/papers/${paper._id}`, paper, config);

    dispatch({
      type: PAPER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PAPER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PAPER_UPDATE_FAIL,
      payload: message,
    });
  }
};
