import ShopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';


export const updateCollections = (collectionsMap) => ({

type: ShopActionTypes.UPDATE_COLLECTIONS,
payload: collectionsMap
})

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {

        const collectionRef = firestore.collection('collections')

        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  
            dispatch(fetchCollectionSuccess(collectionsMap))
            .catch(error => dispatch(fetchCollectionsFailure(error)))
        })      
    }

}

export const fetchCollectionSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap 
})

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})


