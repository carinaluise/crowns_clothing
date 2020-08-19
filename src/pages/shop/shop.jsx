import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';
import {createStructuredSelector} from 'reselect';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
 
unsubscribeFromSnapShot = null; 

componentDidMount(){

// const {updateCollections} = this.props;

const {fetchCollectionsStartAsync} = this.props;
fetchCollectionsStartAsync();

}

render(){

    const {match, isCollectionFetching, isCollectionsLoaded} = this.props

    return ( 
    <div className="shop-page">
        <Route 
            exact path={`${match.path}`} 
            render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/> }
        ></Route>
        <Route 
            path={`${match.path}/:collectionId`} 
            render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> }
        ></Route>
    </div>
    )
}}

// const mapStateToProps = (state, ownProps) => ({
//     collection : selectCollection(ownProps.match.params.collectionId)(state)    
// });


const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});


const mapDispatchToProps = dispatch => ({

   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())

});
    
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);    