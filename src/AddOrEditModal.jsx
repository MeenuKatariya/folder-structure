import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";

function AddOrEditModal(props) {
  const { header, onSubmit = () => {}, isOpen, onClose, editPlaceHolder = '' } = props;
  const [input, setInput] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder={editPlaceHolder || "Enter Name"}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(input);
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddOrEditModal;
