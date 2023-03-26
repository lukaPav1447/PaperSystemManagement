import axios from 'axios';
import { PAPER_DETAILS_SUCCESS } from '../constants/paperConstants';
import {
  PAPER_PROFESSOR_MY_LIST_REQUEST,
  PAPER_PROFESSOR_MY_LIST_SUCCESS,
  PAPER_PROFESSOR_MY_LIST_FAIL,
  PAPER_PROFESSOR_UPDATE_REQUEST,
  PAPER_PROFESSOR_UPDATE_SUCCESS,
  PAPER_PROFESSOR_UPDATE_FAIL,
} from '../constants/paperProfessorConstants';
import { logout } from './userActions';

export const listProfessorPapers =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PAPER_PROFESSOR_MY_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/professor/professorpapers?keyword=${keyword}`,
        config
      );

      dispatch({
        type: PAPER_PROFESSOR_MY_LIST_SUCCESS,
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
        type: PAPER_PROFESSOR_MY_LIST_FAIL,
        payload: message,
      });
    }
  };

export const updateProfessorPaper = (paper) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAPER_PROFESSOR_UPDATE_REQUEST,
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

    const { data } = await axios.patch(
      `/api/professor/${paper._id}`,
      paper,
      config
    );

    dispatch({
      type: PAPER_PROFESSOR_UPDATE_SUCCESS,
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
      type: PAPER_PROFESSOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
