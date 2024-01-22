import { useState } from 'react';

const useDropdown = () => {
    const [open, setOpen] = useState<boolean>(false);

    const openDropdown = () => {
        setOpen(true);
    };

    const closeDropdown = () => {
        setOpen(false);
    };

    return { open, openDropdown, closeDropdown };
};

export default useDropdown;
