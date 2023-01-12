import React from "react";
import { createPortal } from "react-dom";
import { useModal } from "../context";
const Modal = ({ children }: { children: React.ReactNode }) => {
  const { modalView } = useModal();
  let elementReference;
  if (typeof window !== "undefined") {
    elementReference = document.getElementById("modal-root");
  }
  return modalView ? (
    <>
      <div
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        {children}
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;

  // return modalView
  //   ? elementReference
  //     ? createPortal(
  //         <>
  //           <div
  //             className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
  //           >
  //             {children}
  //           </div>
  //           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  //         </>,
  //         elementReference
  //       )
  //     : <></>
  //   : null;
};
export { Modal };
