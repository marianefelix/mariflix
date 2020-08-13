import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.png';
import Button from '../Button';

import { Nav } from './styles';

function Menu(){
    return(
        <Nav>
            <Link to="/">
                <img className="Logo" src={Logo} alt="MARIFLIX logo"/>
            </Link>
            <Button as={Link} className="ButtonLink" to="/cadastro/video">
                Novo vídeo
            </Button>
        </Nav>
    );
}

export default Menu;