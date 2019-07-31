import React from 'react';

import MenuItem from '../menu-item/menu-item.component'

import './directory.styles.scss';

class Directory extends React.Component{
    constructor(){
        super();


    };

    render(){
        return(
            <div className='directory-menu'>
                {
                    this.state.collections.map(({ id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))   
                }                    
            </div>
        );
    }

}

export default Directory;
