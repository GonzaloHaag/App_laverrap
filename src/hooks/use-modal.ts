import { useCallback, useState } from "react"

export const useModal = () => {
    const [open, setOpen] = useState(false);

    const toggleModal = useCallback(() => {
        setOpen((prevState) => !prevState);
    },[]);

    return {
        open,
        toggleModal
    }
}