import { ChangeEvent } from 'react';

import { UserType, optionalInfos } from './info';
import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import styled from 'styled-components';

interface OptionalInfoFormProps {
    userType: UserType;
    updateUserInfo: (name: string, value: string | number) => void;
}

const OptionalInfoForm = ({ userType, updateUserInfo }: OptionalInfoFormProps) => {
    return (
        <StyledOptionalInfoForm>
            {optionalInfos[userType].map((optionalInfo, index) => {
                if (optionalInfo.type === 'input') {
                    return (
                        <InputForm
                            label={optionalInfo.label}
                            name={optionalInfo.name}
                            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateUserInfo(optionalInfo.name, e.target.value)
                            }
                            key={`inputform_${index}`}
                        />
                    );
                } else {
                    return (
                        <SelectForm
                            label={optionalInfo.label}
                            name={optionalInfo.name}
                            optionList={optionalInfo.value as string[]}
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
