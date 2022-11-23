import shortid from 'shortid';
import Axios from 'axios';
/* selectors */

export const getAll = (state) => {console.log('gatAll datas:',state.datas); return (state.datas)};
//.filter(post => post.status === 'published');
export const getOnePost = ({datas}, id) => datas.find(post => (post.id === id));

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
    dispatch(fetchStarted());
    console.log('axiost starts!!:');

   await Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        console.log('axios res:', res.data);
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/*Initial state*/

const initialState = [];


/* reducer */
export const reducer = (statePart = initialState, action={}) => {
  console.log('action.payload1:', action.payload);
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
        ...action.payload
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
      return [ ...statePart, {...action.payload, id: shortid.generate() } ];
    }
    default:
      return statePart;
  }
};
