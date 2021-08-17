import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'

const SecondStep = (props) => {
    const {user} = props
    //for controlling form inputs
    const { register, handleSubmit, formState: { errors } } = useForm({
        // defaultValues: {
        //     email: user.email,
        //     password: user.password
        // }
    });

    const onSubmit = async (data) => {
        //update user with entered values
        props.updateUser(data)
        //redirect to thirdStep component
        props.history.push('/third') 
    }

    return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)} >
  
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
            Next
        </Button>
    </Form>
    )
}

export default SecondStep