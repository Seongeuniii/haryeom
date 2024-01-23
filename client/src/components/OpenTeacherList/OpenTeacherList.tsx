import styled from 'styled-components';

const OpenTeacherList = () => {
    return (
        <StyledOpenTeacherList>
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
            <OpenTeacherCard />
        </StyledOpenTeacherList>
    );
};

const StyledOpenTeacherList = styled.div`
    width: 100%;
    padding-bottom: 3em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
    gap: 1.7em;
`;

const OpenTeacherCard = styled.div`
    min-width: 14em;
    height: 20em;
    background-color: pink;
`;

export default OpenTeacherList;
