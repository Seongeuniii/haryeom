import styled from 'styled-components';

interface Tab {
    name: string;
    selected: boolean;
    changeTab: () => void;
}

interface TabsProps {
    tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
    return (
        <StyledTabs>
            {tabs.map((tab, index) => (
                <Tab selected={tab.selected} onClick={tab.changeTab} key={`tab_${index}`}>
                    {tab.name}
                </Tab>
            ))}
        </StyledTabs>
    );
};

const StyledTabs = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.5em;
`;

const Tab = styled.span<{ selected: boolean }>`
    padding: 6px 8px;
    border-radius: 0.5em;
    font-size: 16px;
    font-weight: ${({ theme, selected }) => (selected ? 600 : 400)};
    background-color: ${({ theme, selected }) => (selected ? theme.PRIMARY : 'white')};
    color: ${({ theme, selected }) => (selected ? 'white' : theme.LIGHT_BLACK)};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme, selected }) =>
            selected ? theme.PRIMARY : theme.PRIMARY_LIGHT};
        color: white;
        transition: all 0.5s;
    }
`;

export default Tabs;
