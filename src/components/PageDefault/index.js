import React from 'react';
import Menu from '../Menu';
import Footer from '../Footer';

import { Main } from './styles';

function PageDefault({ children, paddingAll }){

    return(
        //react fragment
        <>
            <Menu />
                <Main paddingAll= {paddingAll}>
                    {children}
                </Main>
            <Footer />
        </>
        
    );
}

export default PageDefault;