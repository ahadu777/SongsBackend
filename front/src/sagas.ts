import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from './slices/songSlice';


const API_URL = 'https://songsbackend-dwx6.onrender.com/songs';

function* fetchSongs(): any {
    try {
      const response = yield call(fetch, API_URL);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = yield response.json(); 
      yield put(fetchSongsSuccess(data));
    } catch (error) {
      yield put(fetchSongsFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  }
  
  
//   function* fetchSongs() : any {
//     try {
//       const response = yield call(fetch, API_URL);
//       yield put(fetchSongsSuccess(response[0].json()));
//     } catch (error) {
//       yield put(fetchSongsFailure('error.message'));
//     }
//   }
  
  function* rootSaga() {
    yield takeLatest(fetchSongsRequest.type, fetchSongs);
  }
  
  export default rootSaga;