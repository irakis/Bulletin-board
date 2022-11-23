import Axios from 'axios';
/* selectors */
export const getAuthors = ({authors}) => authors;
export const getLoggedAuthor = ({authors}) => (authors.find(author => (author.isLogged === true)));

/* action name creator */
const reducerName = 'authors';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const AUTHOR_IN = createActionName('AUTHOR_IN');
const AUTHOR_OUT = createActionName('AUTHOR_OUT');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const loginAuthor = payload => ({ payload, type: AUTHOR_IN });
export const logoutAuthor = payload => ({ payload, type: AUTHOR_OUT });

/* thunk creators */

export const fetchPublishedAuthors = () => {
  return async (dispatch, getState) => {
    dispatch(fetchStarted());

    await Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        console.log('axios res: ',res);
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/*Initial state*/

const initialState = {
  authors: []
};

/* reducer */
export const reducer = (statePart = initialState.authors, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        ...action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case AUTHOR_IN : {
        return {
            ...statePart, ...statePart.map(author => (author.email === (action.payload) ? author.isLogged = true : author))
        }
    }
    case AUTHOR_OUT : {
        return {
            ...statePart, ...statePart.map(author => (author.email === (action.payload) ? author.isLogged = false : author))
        }
    }
    default:
      return statePart;
  }
};
