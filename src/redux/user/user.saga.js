
import {all, call, put, takeLatest} from 'redux-saga/effects';
import { auth, googleProvider, createUserProfile, getCurrentUser} from '../../firebase/firebase.utils' 
import {signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure} from './user.actions';
import { userActionTypes } from './user.types';

export function* getSnapShotFromUserAuth(userAuth, additionalData){
    try {
    
    const userRef = yield call (createUserProfile, userAuth, additionalData)
    const userSnapshot = yield userRef.get();
    yield put (signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(error){
    yield put(signInFailure(error))
    }
    
}

export function* signInWithGoogle(){

    try {

        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
       

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
        yield getSnapShotFromUserAuth(user);

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

export function* onSignOutStart() {
	yield takeLatest (userActionTypes.SIGN_OUT_START, signOut)
}

export function* signOut() {
	try {
        yield auth.signOut();
        yield put(signOutSuccess())
}   catch(error) {
    yield put(signOutFailure(error))}
}    

export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* signUp ({payload : {displayName, email, password, confirmPassword}}){

    if(password !== confirmPassword){
        alert("passwords don't match")
        return; 
    }
      
   try {

        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
       
        yield createUserProfile(user, {displayName})

        yield put(signUpSuccess({user, additionalData: displayName}));


   } catch (error) {
        
        yield put(signUpFailure(error))

    }
}



export function* userSagas(){
    yield all ([call(onGoogleSignInStart) , call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart)])
}

