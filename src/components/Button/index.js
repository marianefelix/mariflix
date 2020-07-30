//import React from 'react';
import styled from "styled-components";

const Button = styled.button `
    color: var(--white);
    border: 1px solid var(--white);
    background-color: var(--black);
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: background-color .3s;

    &:hover, 
    &:focus {
        background-color: var(--primary);
        border: 1px solid var(--primary);
    }

    @media (max-width: 800px) {
        &.ButtonLink {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--grayDarkMedium);
        border-radius: 0;
        border-top: 1px solid var(--primary);
        border: 0;
        text-align: center;
    }
}

`;

export default Button;