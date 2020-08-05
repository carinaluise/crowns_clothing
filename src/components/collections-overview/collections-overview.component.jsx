import React from 'react'
import './collections-overview.styles.scss';

import CollectionPreview from '../collection-preview/collection-preview.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selector';

const CollectionsOverview = ({collections}) => (
    <div className='collectionsOverview'>
        {collections.map(({id, ...otherCollectionProps}) => (
             <CollectionPreview 
             key={id}
             {...otherCollectionProps}
             >
             </CollectionPreview>

             ))}  

    </div>

);


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);
