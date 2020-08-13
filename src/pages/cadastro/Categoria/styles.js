import styled from 'styled-components';

export const TableCategories = styled.div`
    max-width: 100%;
    margin-top: 45px;
    /* --color-primary-medium */
    border: 3px solid var(--blackLighter);
    display: flex;
    flex-direction: column;
    
`;
export const TableTitle = styled.div`
    height: 55px;
    display: flex;
    align-items: center;
    background-color: var(--blackLighter);
    
    font-size: 22px;
    font-weight: 400;
    color: var(--black);
    
    
    p:first-child{
        width: 50%;
        margin-left: 100px;
    }
    p:last-child{
        width: 50%;
    }
`;

export const CategoriesInfos = styled.div`
    display: flex;   
    align-items: center;
    border-top: 1px solid var(--blackLighter);
    p{
        width: calc(100% - 50%);
    }
    p:first-child{
        margin-left: 100px;
    }
    
`;