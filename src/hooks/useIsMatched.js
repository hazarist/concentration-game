import { useEffect, useState } from "react";

export default function useIsMatch(matchedList, id) {
    const [isMatched, setIsMatched] = useState(false)

    useEffect(() => {
        if (Array.isArray(matchedList))
            setIsMatched(matchedList?.some(x => x === id));
    }, [matchedList,id])

    return [isMatched];
}