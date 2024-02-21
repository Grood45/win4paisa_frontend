import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from "@chakra-ui/react";
  
  function ReferAndEarnModel() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <div  onClick={onOpen} className="p-2 flex items-center cursor-pointer gap-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="27"
          viewBox="0 0 28 27"
          fill="none"
        >
          <path
            opacity="0.4"
            d="M20.0262 8.37974C19.9661 8.36974 19.896 8.36974 19.8359 8.37974C18.4535 8.32974 17.3516 7.1999 17.3516 5.8001C17.3516 4.3703 18.5036 3.22046 19.9361 3.22046C21.3686 3.22046 22.5206 4.3803 22.5206 5.8001C22.5106 7.1999 21.4087 8.32974 20.0262 8.37974Z"
            stroke="#818899"
            stroke-width="6.12836"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M18.9939 15.6589C20.3663 15.8889 21.879 15.6489 22.9408 14.939C24.3533 13.9991 24.3533 12.4594 22.9408 11.5195C21.869 10.8095 20.3363 10.5696 18.9639 10.8095"
            stroke="#818899"
            stroke-width="6.12836"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M7.97337 8.37974C8.03347 8.36974 8.1036 8.36974 8.1637 8.37974C9.54612 8.32974 10.6481 7.1999 10.6481 5.8001C10.6481 4.3703 9.49603 3.22046 8.06353 3.22046C6.63102 3.22046 5.479 4.3803 5.479 5.8001C5.48902 7.1999 6.59095 8.32974 7.97337 8.37974Z"
            stroke="#818899"
            stroke-width="6.12836"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M9.00626 15.6589C7.63386 15.8889 6.12121 15.6489 5.05935 14.939C3.64688 13.9991 3.64688 12.4594 5.05935 11.5195C6.13123 10.8095 7.66391 10.5696 9.03631 10.8095"
            stroke="#818899"
            stroke-width="6.12836"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.0175 15.8489C13.9574 15.8389 13.8872 15.8389 13.8271 15.8489C12.4447 15.7989 11.3428 14.6691 11.3428 13.2693C11.3428 11.8395 12.4948 10.6896 13.9273 10.6896C15.3598 10.6896 16.5118 11.8494 16.5118 13.2693C16.5018 14.6691 15.3999 15.8089 14.0175 15.8489Z"
            stroke="#818899"
            stroke-width="6.12836"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.1033 18.9987C9.69083 19.9385 9.69083 21.4782 11.1033 22.4181C12.7061 23.4879 15.3307 23.4879 16.9335 22.4181C18.346 21.4782 18.346 19.9385 16.9335 18.9987C15.3407 17.9388 12.7061 17.9388 11.1033 18.9987Z"
            stroke="#818899"
            stroke-width="6.12836"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
            <p className="text-xs text-[#FFF] font-medium">Refer and Earn</p>
          </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>hello Refer mmodal</ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default ReferAndEarnModel;
  