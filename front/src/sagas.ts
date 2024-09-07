import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  Song
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
  

  function* addSong(action: { payload: Song }): Generator<unknown, void, unknown> {
    try {
      // yield put(addSongRequest(action.payload));
      
      const response: any = yield call(fetch, API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      }) as unknown as Response; // Assert the type here
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data: any = yield response.json(); // Assert the type here
      yield put(addSongSuccess(data));
    } catch (error) {
      yield put(addSongFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  }


  function* deleteSong(action: { payload: string }): Generator<unknown, void, unknown> {
    try {
      // yield put(deleteSongRequest(action.payload));
  
      const response: any = yield call(fetch, `${API_URL}/${action.payload}`, {
        method: 'DELETE',
      });
  console.log(action.payload);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      yield put(deleteSongSuccess(action.payload));
    } catch (error) {
      yield put(deleteSongFailure(error instanceof Error ? error.message : 'Unknown error'));
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
    yield takeEvery(addSongRequest, addSong);
    yield takeEvery(deleteSongRequest, deleteSong);


  }
  
  export default rootSaga;