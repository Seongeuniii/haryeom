import styled from 'styled-components';
import OpenTeacherCard from './OpenTeacherCard';

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
    padding-top: 1.2em;
    padding-bottom: 3em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
    gap: 2.2em;
    overflow: scroll;
`;

export default OpenTeacherList;
