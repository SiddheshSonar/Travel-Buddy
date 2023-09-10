"use client"

import React, { useState } from "react";
import { CircularProgress, useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux';
import { toggleChat } from "@/redux/reducers/chatReducer";

export default function ChatDrawer() {

  const user = useSelector(state => state.chat.user);
  const dispatch = useDispatch();
  const {onOpen, onClose } = useDisclosure()

  const isOpen = useSelector(state => state.chat.isOpen);

  React.useEffect(() => {
      if (isOpen) {
          onOpen();
      }
  }, [isOpen]);


  return (
    <>
      <Drawer onClose={() => {
        dispatch(toggleChat(false));
        onClose();
      }} isOpen={isOpen} size="md" height="100vh">
        <DrawerOverlay />
        <DrawerContent sx={
          {
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(173, 234, 234, 0.3)",
            borderRadius: "20px 0 0 20px",
          }
        }>
          <DrawerCloseButton
            color={"white"}
          />
          {user && user.name && (
            <DrawerHeader sx={
              {
                textAlign: "center",
                color: "white",
              }
            }>{user.name}</DrawerHeader>
          )}
          <DrawerBody>
            <p>
              {/* Chat Drawer */}
              <CircularProgress isIndeterminate color="green.300" sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",

              }} />
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}