import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection';
import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
// import withSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container'
// const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({fetchCollectionsStart, match}) => {
 

useEffect(()=> {
    fetchCollectionsStart()
}, [fetchCollectionsStart])


// unsubscribeFromSnapShot = null; 

// componentDidMount(){

// // const {updateCollections} = this.props;

// const {fetchCollectionsStart} = this.props;
// fetchCollectionsStart();

// }

// const {match} = this.props

return ( 
    <div className="shop-page">
        <Route 
            exact path={`${match.path}`} 
            component={CollectionsOverviewContainer} 
        ></Route>
        <Route 
            path={`${match.path}/:collectionId`} 
            component={CollectionPageContainer} 
        ></Route>
    </div>
    )
}

// const mapStateToProps = (state, ownProps) => ({
//     collection : selectCollection(ownProps.match.params.collectionId)(state)    
// });




const mapDispatchToProps = dispatch => ({

   fetchCollectionsStart: () => dispatch(fetchCollectionsStart())

});
    
export default connect(null, mapDispatchToProps)(ShopPage);    