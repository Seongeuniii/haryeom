import { useState } from 'react';
import { IFindTeacherFilterers } from '@/apis/matching';

const useFilter = () => {
    const [filterers, setFilterers] = useState<IFindTeacherFilterers>({
        subjectIds: [],
        colleges: [],
        minCareer: 0,
        gender: [],
        maxSalary: 0,
    });

    const handleSelectOption = (name: string, value: string) => {
        const currentValues = [...(filterers[name] as string[])];
        const isValueExists = currentValues.includes(value);
        const updatedValues = isValueExists
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];

        setFilterers((prev) => ({ ...prev, [name]: updatedValues }));
    };

    const handleInput = (name: string, value: string) => {
        setFilterers((prev) => ({ ...prev, [name]: parseInt(value) }));
    };

    const isSelected = (name: string, value: string) => {
        return (filterers[name] as string[]).find((elem) => elem === value) ? true : false;
    };

    return { filterers, setFilterers, handleSelectOption, handleInput, isSelected };
};

export default useFilter;
