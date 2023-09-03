import React, { useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import APIRequests from '@/api';
import "./modal.css"

const RegisterModal = ({ modal, setModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerUser = async (data) => {
    console.log(data)
    const response = await APIRequests.signUp(data);
    console.log(response)
    if (response.status == 201) {
      toast.error(response.data.error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }
    else if (response.status == 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
      }
      toggle();
  }

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
    registerUser(data);
    // You can send the data to your server or perform other actions
    // toggle(); // Close the modal after submission
  };

  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} toggle={toggle} style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
    }}>
      <ModalHeader toggle={toggle}>Registration Details</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center justify-evenly gap-4 mb-2'>
            <div>
              <input type="text" placeholder="Name " {...register("name", { required: true, maxLength: 80 })} />
            </div>
            <div>
              <input type="email" placeholder="Email" {...register("email", { required: true, maxLength: 80 })} />
            </div>        
            <div>
              <input type="password" placeholder="Password" {...register("password", { required: true })} />
            </div>
            <div>
              <input type="number" placeholder="Graduation Year" {...register("graduation", { required: true })} />
            </div>
            <div>
              <label> Branch:
              <select className='ml-2 border-1 rounded' {...register("branch", { required: true })}>
                <option value="Comps">Comps</option>
                <option value=" IT"> IT</option>
                <option value=" CSE"> CSE</option>
                <option value=" DS"> DS</option>
                <option value=" AIML"> AIML</option>
                <option value=" EXTC"> EXTC</option>
              </select>
              </label>
            </div>
          </div>
          <ModalFooter>
            <Button color="primary" type="submit">
              Register
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default RegisterModal;
