
import {all, call, put, takeLatest} from 'redux-saga/effects';
import { auth, googleProvider, createUserProfile, getCurrentUser} from '../../firebase/firebase.utils' 
import {signInSuccess, signInFailure} from './user.actions';
import { userActionTypes } from './user.types';

export function* getSnapShotFromUserAuth(userAuth){
    try {
    
    const userRef = yield call (createUserProfile, userAuth)
    const userSnapshot = yield userRef.get();

    yield put (signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(error){
    yield put(signInFailure(error))
    }
    
}


export function* signInWithGoogle(){

    try {

        const {user} = yield auth.signInWithPopup(googleProvider);
        getSnapShotFromUserAuth(user);
       

    } catch (error) {
    yield put(signInFailure(error))
    }

}

export function* onGoogleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail) // SECOND PARAMETER RECEIVES PAYLAD FROM EMAIL_SIG_IN_START_ACTION
}

export function* signInWithEmail({payload: {email, password}}){ // GETS WHOLE ACTION THAT WE TAKE FROM TAKE LATEST ON ONEMAILSIGINSTART PASSED INTO THE FUNCTION

    try {

        const {user} = yield auth.signInWithEmailAndPassword(email , password)
        getSnapShotFromUserAuth(user);

    } catch(error) {
       yield put (signInFailure(error))
    }


}

export function* onCheckUserSession () {

    yield takeLatest (userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
    
}
    
export function* isUserAuthenticated () {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth) 

    } catch(error) {

    yield put(signInFailure(error));
    
    }
}


export function* userSagas(){
    yield all ([call(onGoogleSignInStart) , call(onEmailSignInStart), call(onCheckUserSession)])
}

