//import React from 'react';
import styled from "styled-components";

const Button = styled.a `
    color: var(--white);
    border: 1px solid var(--white);
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

`;

export default Button;