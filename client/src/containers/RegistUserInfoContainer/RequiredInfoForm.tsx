import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { requiredInfos } from './infoForm';
import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import { IUserRole } from '@/apis/user/user';

interface RequiredInfoFormProps {
    userRole: IUserRole;
    updateUserInfo: (name: string, value: string | number) => void;
}

const RequiredInfoForm = ({ userRole, updateUserInfo }: RequiredInfoFormProps) => {
    return (
        <StyledRequiredInfoForm>
            {Object.entries(requiredInfos[userRole]).map(([name, requiredInfo], index) => {
                if (requiredInfo.inputType === 'text') {
                    return (
                        <InputForm
                            label={requiredInfo.label}
                            name={name}
                            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateUserInfo(name, e.target.value)
                            }
                            key={`inputform_${index}`}
                        />
                    );
                } else {
                    return (
                        <SelectForm
                            label={requiredInfo.label}
                            name={name}
                            optionList={requiredInfo.option as string[]}
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
