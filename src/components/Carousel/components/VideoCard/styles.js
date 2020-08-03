import styled from 'styled-components';

export const VideoCardContainer = styled.a`
  border: 2px solid;
  border-radius: 2px;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  color: white;
  flex: 0 0 298px;
  width: 298px;
  height: 197px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  transition: opacity .3s;
  transition: transform 500ms;

  &:hover,
  &:focus {
    transform: scale(1.3);
    z-index: 1;
    border: 0;
    opacity: .9;
  }
  
  &:not(:first-child) {
    margin-left: 20px;
  }

`;
