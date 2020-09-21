
import {all , call} from 'redux-saga/effects'
import {userSagas} from './user/user.saga';
import {fetchCollectionsStart } from '../redux/shop/shop.saga';

export default function* rootSaga() {

	yield all ([ call (fetchCollectionsStart), call(userSagas)]);
}

