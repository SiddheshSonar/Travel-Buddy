"use client"

import React, { useState } from "react";
import { CircularProgress, useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

export default function ChatDrawer({ isOpen, onClose, user }) {


  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size="md">
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