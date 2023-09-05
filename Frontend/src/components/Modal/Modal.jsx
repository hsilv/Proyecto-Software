import { createPortal } from "react-dom";

export default function Modal({show, children}) {

  return (
    <>
        {
            show && createPortal(
                <>{
                    children
                }</>, 
                document.body
            )
        }
    </>
  );
}
