import { useState } from "react";

function useNav(){
    const [show, setShow] = useState(false);
    return {show, setShow};
}

export default useNav;