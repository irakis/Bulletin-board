import Axios from 'axios';
import { API_URL } from '../config';
/* selectors */

export const getAll = ({posts}) => (posts.data.filter(post => post.status === 'published'));
export const getOnePost = (id) => ({posts}) => (posts.data.find(post => (post._id === id)));
export const getOneAuthorPosts = (email) => ({posts}) => (posts.data.filter(post => (post.author === email)));

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST')
const DELETE_POST = createActionName('DELETE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({payload, type: ADD_POST});
export const editPost = payload => ({payload, type: EDIT_POST})
//export const deleteSinglePost = payload => ({payload, type: DELETE_POST})

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch) => {
    dispatch(fetchStarted({ name: 'FETCH_START' }));

   Axios
      .get(`${API_URL}/posts`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted({name: 'DELETE_POST'}));

    Axios
      .delete(`${API_URL}/posts/${id}`)
      .then(() => {
        dispatch(fetchPublished());
      })
      .catch(err => {
        dispatch(fetchError({ name: 'DELETE_POST', error: err.message || true }));
      });
  };
};

export const addPostRequest = (serializedFormData) => {
  console.log('co dostaje axios w serializedFormData:', serializedFormData);
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'ADD_POST' }));
    try {
      const res = await Axios
      .post(`${ API_URL}/posts/add`,
        serializedFormData
      )
      await dispatch(addPost(res.data))
      console.log('axios res.data after add:', res)
      await dispatch(fetchPublished());
    } catch (err) {
      dispatch(fetchError({ name: 'ADD_POST', error: err.message || true }));
    }
  }
};

export const editPostRequest = (serializedFormData, id) => {
  console.log('co dostaje axios do edit:', serializedFormData, id );
  return async (dispatch) => {
    dispatch(fetchStarted({name: 'EDIT_POST'}))
  try{
    const res = await Axios 
      .put(`${API_URL}/posts/${id}/edit`, serializedFormData, id);
      console.log('axios did edit post?:', res)

    await dispatch(editPost(res.config.data));
    await dispatch(fetchPublished());

  } catch(err) {
      dispatch(fetchError({name: 'EDIT_POST', error: err.message || true}))
    }
  }
}

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
    case EDIT_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [statePart.data.map(post => 
          post._id === action.payload._id ? { ...post, ...action.payload } : post )]
      }
    }
    default:
      return statePart;
  }
};
