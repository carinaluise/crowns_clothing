import React from 'react';

import SHOP_DATA from './shop_data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
 

class ShopPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            collections: SHOP_DATA
        }
    }

    render(){

        const {collections} = this.state;
        console.log(collections)
        return(

            <div className="shop">
             {collections.map(({id, ...otherCollectionProps}) => (
             <CollectionPreview 
             key={id}
             {...otherCollectionProps}
             >
             </CollectionPreview>

             ))}   
            </div>
        )
    } 
}

export default ShopPage;