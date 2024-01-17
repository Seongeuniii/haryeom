import { ChangeEvent } from 'react';

import { UserType, requiredInfos } from './info';
import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import styled from 'styled-components';

interface RequiredInfoFormProps {
    userType: UserType;
    updateUserInfo: (name: string, value: string | number) => void;
}

const RequiredInfoForm = ({ userType, updateUserInfo }: RequiredInfoFormProps) => {
    return (
        <StyledRequiredInfoForm>
            {requiredInfos[userType].map((requiredInfo, index) => {
                if (requiredInfo.type === 'input') {
                    return (
                        <InputForm
                            label={requiredInfo.label}
                            name={requiredInfo.name}
                            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateUserInfo(requiredInfo.name, e.target.value)
                            }
                            key={`inputform_${index}`}
                        />
                    );
                } else {
                    return (
                        <SelectForm
                            label={requiredInfo.label}
                            name={requiredInfo.name}
                            optionList={requiredInfo.value as string[]}
                            key={`inputform_${index}`}
                            handleSelect={updateUserInfo}
                        />
                    );
                }
            })}
        </StyledRequiredInfoForm>
    );
};

const StyledRequiredInfoForm = styled.div`
    width: 100%;
    height: 390px;
    padding: 1.5em 2.7em;
    display: flex;
    flex-direction: column;
    gap: 1.3em;
`;

export default RequiredInfoForm;
