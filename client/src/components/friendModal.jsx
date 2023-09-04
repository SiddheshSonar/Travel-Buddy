import React, { useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { toast } from 'react-toastify';
import APIRequests from '@/api';
import Friends from './friends';
import Requests from './requests';
import Sent from './sent';

const FriendModal = ({ modal, setModal }) => {

    const toggle = () => setModal(!modal);

    return (
        <Modal isOpen={modal} toggle={toggle} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
        }}>
            <ModalHeader toggle={toggle}>Friends Details</ModalHeader>
            <ModalBody>
                <div>
                    <Tabs isFitted variant='soft-rounded' colorScheme='blue'>
                        <TabList>
                            <Tab>Friend Requests</Tab>
                            <Tab>Friend List</Tab>
                            <Tab>Follow Requests Sent</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Requests />
                            </TabPanel>
                            <TabPanel>
                                <Friends />
                            </TabPanel>
                            <TabPanel>
                                <Sent />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    );
};

export default FriendModal;
