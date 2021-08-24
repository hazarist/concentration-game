import { useEffect, useState } from "react";

export default function useFlipped(closeList, order) {
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        if (closeList?.some(x => x === order))
            setFlipped(false);
    }, [closeList, order])

    return [flipped, setFlipped];
}