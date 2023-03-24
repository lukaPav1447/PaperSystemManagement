import {
  PAPER_PROFESSOR_MY_LIST_REQUEST,
  PAPER_PROFESSOR_MY_LIST_SUCCESS,
  PAPER_PROFESSOR_MY_LIST_FAIL,
  PAPER_PROFESSOR_MY_LIST_RESET,
  PAPER_PROFESSOR_UPDATE_REQUEST,
  PAPER_PROFESSOR_UPDATE_SUCCESS,
  PAPER_PROFESSOR_UPDATE_FAIL,
  PAPER_PROFESSOR_UPDATE_RESET,
} from '../constants/paperProfessorConstants';

export const paperProfessorListReducer = (state = { papers: [] }, action) => {
  switch (action.type) {
    case PAPER_PROFESSOR_MY_LIST_REQUEST:
      return {
        loading: true,
      };
    case PAPER_PROFESSOR_MY_LIST_SUCCESS:
      return {
        loading: false,
        papers: action.payload,
      };
    case PAPER_PROFESSOR_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAPER_PROFESSOR_MY_LIST_RESET:
      return { papers: [] };
    default:
      return state;
  }
};

export const paperProfessorUpdateReducer = (state = { paper: {} }, action) => {
  switch (action.type) {
    case PAPER_PROFESSOR_UPDATE_REQUEST:
      return { loading: true };
    case PAPER_PROFESSOR_UPDATE_SUCCESS:
      return { loading: false, success: true, paper: action.payload };
    case PAPER_PROFESSOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PAPER_PROFESSOR_UPDATE_RESET:
      return { paper: {} };
    default:
      return state;
  }
};
