import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { BASE_API_URL } from '../utils/constants'

const Login = () => {
    //for controlling form inputs
    const { register, handleSubmit, formState: { errors } } = useForm();

    //State of Login
    const [successMessage, setSuccessMessage ] = useState(" ")
    const [errorMessage, setErrorMessage ] = useState(" ")
    const [userDetails, setUserDetails ] = useState(" ")

    const onSubmit = async (data) => {
        console.log("data: ", data)
        try {
            //call API
            const response = await axios.post(`${BASE_API_URL}/login`, data)
            console.log("response.data: ", response.data)
            if(!response || response.status !== 200) {
                setErrorMessage('Uncessessful login')
            }
            else {
                setSuccessMessage('User with the provided credentials exists')
                setUserDetails(response.data.data.user)
                setErrorMessage('')
            }
            console.log("errorMessage: ", errorMessage)

        } catch(error) {
            console.log("error in catch: ", error)
            setErrorMessage('Uncessessful login')
            console.log("errorMessage: ", errorMessage)
        }
    }

    return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)} >
        <div className="col-md-6 offset-md-3">
        {errorMessage ? (
            <p className="errorMsg login-error">{errorMessage}</p>
        ): (
            <div>
                 <p className="successMsg">{successMessage}</p>
                 { userDetails && (
                     <div className="user-details">
                         <p> Following are the user details: </p>
                         <div> First name: {userDetails.firstName} </div>
                         <div> Last name: {userDetails.lastName} </div>
                         <div> Email: {userDetails.email} </div>
                     </div>
                 )}
            </div> 
        )
    }
        </div>
        <Form.Group controlId="Email">
            <Form.Label className="label"> Email </Form.Label>
            <Form.Control 
                type="email"
                name="email"
                placeholder="Enter your email address"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email is not valid'
                    }
                })}
                className={`${errors.email ? 'input-error': ''}`}
                />
                {/* if error exists display it */}
                {   
                    errors.email && (
                    <p className="errorMsg">{errors.email.message}</p>
                )}
        </Form.Group>

        <Form.Group controlId="password">
            <Form.Label className="label"> Password </Form.Label>
            <Form.Control 
                type="password"
                name="password"
                placeholder="Enter password"
                {...register("password", {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password should have at-least 6 characters'
                    }
                })}
                className={`${errors.password ? 'input-error': ''}`}
                />
                {/* if error exists display it */}
                { 
                errors.password && (
                    <p className="errorMsg">{errors.password.message}</p>
                )}
        </Form.Group>

        <Button type="submit" variant="primary" className="btn">
            Check Login
        </Button>
    </Form>
)    
    
}

export default Login


