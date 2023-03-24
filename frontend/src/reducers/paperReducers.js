import {
  PAPER_MY_LIST_REQUEST,
  PAPER_MY_LIST_SUCCESS,
  PAPER_MY_LIST_FAIL,
  PAPER_MY_LIST_RESET,
  PAPER_CREATE_REQUEST,
  PAPER_CREATE_SUCCESS,
  PAPER_CREATE_FAIL,
  PAPER_CREATE_RESET,
  PAPER_DELETE_REQUEST,
  PAPER_DELETE_SUCCESS,
  PAPER_DELETE_FAIL,
  PAPER_DETAILS_REQUEST,
  PAPER_DETAILS_SUCCESS,
  PAPER_DETAILS_FAIL,
  PAPER_UPDATE_REQUEST,
  PAPER_UPDATE_SUCCESS,
  PAPER_UPDATE_FAIL,
  PAPER_UPDATE_RESET,
} from '../constants/paperConstants';

export const paperMyListReducer = (state = { papers: [] }, action) => {
  switch (action.type) {
    case PAPER_MY_LIST_REQUEST:
      return {
        loading: true,
      };
    case PAPER_MY_LIST_SUCCESS:
      return {
        loading: false,
        papers: action.payload,
      };
    case PAPER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAPER_MY_LIST_RESET:
      return { papers: [] };
    default:
      return state;
  }
};

export const paperCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAPER_CREATE_REQUEST:
      return { loading: true };
    case PAPER_CREATE_SUCCESS:
      return { loading: false, success: true, paper: action.payload };
    case PAPER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PAPER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const paperUpdateReducer = (state = { paper: {} }, action) => {
  switch (action.type) {
    case PAPER_UPDATE_REQUEST:
      return { loading: true };
    case PAPER_UPDATE_SUCCESS:
      return { loading: false, success: true, paper: action.payload };
    case PAPER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PAPER_UPDATE_RESET:
      return { paper: {} };
    default:
      return state;
  }
};

export const paperDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAPER_DELETE_REQUEST:
      return { loading: true };
    case PAPER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PAPER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const paperDetailsReducer = (state = { paper: {} }, action) => {
  switch (action.type) {
    case PAPER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PAPER_DETAILS_SUCCESS:
      return { loading: false, paper: action.payload };
    case PAPER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
