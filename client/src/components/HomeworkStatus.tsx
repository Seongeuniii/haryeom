import styled from 'styled-components';

const HomeworkStatus = () => {
    return (
        <StyledHomeworkStatus>
            <Title>숙제 현황 (3/19)</Title>
            <PageButttons>
                <PageButton className="done">1</PageButton>
                <PageButton>3</PageButton>
                <PageButton>5</PageButton>
                <PageButton className="progress">10</PageButton>
                <PageButton>11</PageButton>
                <PageButton>12</PageButton>
                <PageButton>101</PageButton>
            </PageButttons>
        </StyledHomeworkStatus>
    );
};

const StyledHomeworkStatus = styled.div`
    position: absolute;
    width: 150px;
    top: 4.6em;
    right: 3.5em;
    padding: 1em;
    border-radius: 1em;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 2px solid ${({ theme }) => theme.PRIMARY};
    font-size: 14px;

    @media (max-width: 1300px) {
        & {
            display: none;
        }
    }
`;

const Title = styled.div`
    font-weight: 500;
    padding: 0.3em 0.3em 0.8em 0.3em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const PageButttons = styled.div`
    width: 100%;
    padding-top: 0.8em;
    display: grid;
    grid-template-columns: repeat(3, 30px);
    gap: 10px;
    justify-content: center;
    align-content: center;
`;

const PageButton = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    background-color: white;
    border-radius: 100%;

    &.progress {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        border: none;
        color: white;
    }

    &.done {
        background-color: ${({ theme }) => theme.PRIMARY};
        border: none;
        color: white;
    }
`;

export default HomeworkStatus;
