import { useState } from "react";


export default function useToggle({ initialToggle = false}) {
    const [toggle, setToggle] = useState(initialToggle);

    const handleToggle = () => {
        setToggle((prev) => {
            return !prev;
        });
    }

    return [toggle, handleToggle];
};
