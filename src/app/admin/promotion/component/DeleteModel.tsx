"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
type DeleteModelProps = {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  handleDelete: () => void;
};

const DeleteModel: React.FC<DeleteModelProps> = ({
  isOpen,
  onOpen,
  onClose,
  handleDelete
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#0046BB" }}>
          <ModalBody style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                width: "200px",

                fontWeight: "800",
                fontSize: "20px",
                padding: "2px",
                color: "white",
              }}
            >
              Confirm Delete
            </Text>
            <div className="mt-4 w- flex items-center justify-end gap-4">
              <Button colorScheme="red" onClick={handleDelete}>
                Confirm
              </Button>
              <Button colorScheme="green" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModel;
