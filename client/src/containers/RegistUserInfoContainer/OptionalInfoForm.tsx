import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { optionalInfos } from './infoForm';
import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import { IUserRole } from '@/components/apis/user/user';

interface OptionalInfoFormProps {
    userRole: IUserRole;
    updateUserInfo: (name: string, value: string | number) => void;
}

const OptionalInfoForm = ({ userRole, updateUserInfo }: OptionalInfoFormProps) => {
    return (
        <StyledOptionalInfoForm>
            {Object.entries(optionalInfos[userRole]).map(([name, optionalInfo], index) => {
                if (optionalInfo.inputType === 'text') {
                    return (
                        <InputForm
                            label={optionalInfo.label}
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
                            label={optionalInfo.label}
                            name={name}
                            optionList={optionalInfo.option as string[]}
                            key={`inputform_${index}`}
                            handleSelect={updateUserInfo}
                        />
                    );
                }
            })}
        </StyledOptionalInfoForm>
    );
};

const StyledOptionalInfoForm = styled.div`
    width: 100%;
    height: 420px;
    padding: 1.5em 2.7em;
    display: flex;
    flex-direction: column;
    gap: 1.3em;
`;

export default OptionalInfoForm;
