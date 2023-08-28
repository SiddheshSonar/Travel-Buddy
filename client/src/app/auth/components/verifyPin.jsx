"use client";

import {
    Button,
    Center,
    Flex,
    FormControl,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import APIRequests from "@/api";
import { useRouter } from 'next/navigation'


//   import { ActionTypes, auth } from "../reducers/auth";
//   import { useAppDispatch } from "../store";

export default function VerifyEmailForm({ open, handleClose, email }) {
    const [pin, setPin] = useState("");
    const router = useRouter()

    // const dispatch = useAppDispatch();




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: email,
                otp: pin,
            };
            console.log("send", data);
            const res = await APIRequests.verifyOTP(data);
            console.log(res.data);
            if (res.status == 200) {
                console.log("success");
                localStorage.setItem("isIn", 'true');
                router.push('/')

                // console.log("from verify otp", {
                //   name: res.data.name || "",
                //   email: email || "",
                //   token: res.data.token || "",
                //   privilege: res.data.privilege || 0,
                //   uid: res.data.uid || "",
                //   user_role: res.data.user_role || "",
                // });
                //   dispatch(
                //     auth({
                //       result: {
                //         name: res.data.name || "",
                //         email: email || "",
                //         token: res.data.token || "",
                //         privilege: res.data.privilege || 0,
                //         uid: res.data.uid || "",
                //         user_role: res.data.user_role || "",
                //       },
                //       type: ActionTypes.AUTH,
                //     })
                //   );

                //   if (res.data.user_role && res.data.user_role === "investigator") {
                //     navigate("/dashboard");
                //   } else {
                //     navigate("/blogs");
                //   }


            }
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Invalid OTP')
        }
    };

    return (
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent mx={5} my={{ base: 10, md: 20 }} p={5}>
                <ModalHeader fontSize="xl">Verify your Email</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column" align="center" justify="center">
                        <Text color={useColorModeValue("gray.700", "gray.300")} mb={2}>
                            We have sent a code to your email:
                        </Text>
                        <Text fontWeight="bold" mb={5} color={useColorModeValue("gray.800", "gray.300")}>
                            {email}
                        </Text>
                        <FormControl mb={5}>
                            <Center>
                                <Stack direction="row">
                                    <PinInput onChange={(value) => setPin(value)}>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </Stack>
                            </Center>
                        </FormControl>
                        <Button
                            w="100%"
                            bg={"blue.500"}
                            color={"black"}
                            // add outlined border
                            border="2px"
                            _hover={{
                                bg: "black",
                                color: "white",
                            }}
                            onClick={handleSubmit}
                        >
                            Verify
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}