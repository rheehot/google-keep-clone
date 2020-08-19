import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
    width: 100%;
`;

export const InputForm = styled.form`
    position: relative;
    width: 40%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 3rem auto;
    box-shadow: 0 1px 5px rgb(138, 137, 137);
    padding: 12px 16px;
    background: ${props => props.bgColor};
    transition: background-color .3s ease-in; 
    
    @media (max-width: 768px) { width: 60%; }
    @media (max-width: 500px) { width: 80%; }
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-family: inherit;
    font-weight: 500;
    font-size: 1.6rem;
    background: inherit;
`;

export const InputTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-family: inherit;
    font-weight: 500;
    resize: none;
    ${'' /* padding: 2rem 0; */}
    background: inherit;
    margin-top: 1.2rem;

    ${'' /* NOTE */}
    ${({ isChecked }) => isChecked && css `
        line-height: 4ch;
        background-image: linear-gradient(transparent, transparent calc(4ch - 1px), #ccc 0px);
        background-size: 100% 4ch;
    `};
`;


