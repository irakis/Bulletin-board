import shortid from 'shortid';
import Axios from 'axios';
/* selectors */

export const getAll = ({posts}) => (posts.data.filter(post => post.status === 'published'));
export const getOnePost = (id) => ({posts}) => (posts.data.find(post => (post._id.toString() === id)));
export const getOneAuthorPosts = (email) => ({posts}) => (posts.data.filter(post => (post.author === email)));

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({payload, type: ADD_POST});
export const editPost = payload => ({payload, type: EDIT_POST})

/* thunk creators */
export const fetchPublished = () => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'FETCH_START' }));

   await Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchSinglePost = (id) => {
  return async (dispatch) => {
    dispatch(fetchStarted({name: 'EDIT_POST'}));

   await Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        console.log('single post axios:',res.data);
        dispatch(addPost(res.data));
        dispatch(fetchPublished());
      })
      .catch(err => {
        dispatch(fetchError({ name: 'EDIT_POST', error: err.message || true }));
      });
  };
};

export const addPostRequest = (post) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'ADD_POST' }));

   await Axios
      .post('http://localhost:8000/api/posts/add', post)
      .then(res => {
        dispatch(addPost(res.data));
        dispatch(fetchPublished());
      })
      .catch(err => {
        dispatch(fetchError({ name: 'ADD_POST', error: err.message || true }));
      });
  };
};

/*Initial state*/

const initialState = {
  data: []
};

/* reducer */
export const reducer = (statePart = initialState, action={}) => {
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
        data: [...action.payload]
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
    case EDIT_POST: {
      return (statePart.map(post =>(post.id === action.payload.id ? {...post, ...action.payload} : post)))
    }
    case ADD_POST: {
      return { 
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload]
      };
    }

    default:
      return statePart;
  }
};
