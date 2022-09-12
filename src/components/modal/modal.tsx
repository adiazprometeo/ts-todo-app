import React from "react";
import {
  ModalBlock,
  ModalBody,
  ModalClose,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./modal.styles";
import { useLockBodyScroll } from "./use-lock-body-hook";
import { useKeyPress } from "./use-scape-hook";

export const Modal = ({ title, footer, children, active, hideModal }: any) => {
  useLockBodyScroll()
  const close: boolean = useKeyPress("Escape");
  if (close) {
    hideModal()
  }
  return (
    (
      <div>
        {active && (
          <ModalBlock>
            <ModalOverlay onClick={() => hideModal()} />
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <ModalClose onClick={() => hideModal()}>X</ModalClose>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>{footer}</ModalFooter>
            </ModalContainer>
          </ModalBlock>
        )}
      </div>
    )  
  )
}
