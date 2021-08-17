import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'

const FirstStep = (props) => {
    const {user} = props
    //for controlling form inputs
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName
        }
    });

    const onSubmit = async (data) => {
        // user = {
        //     firstName: "",
        //     lastName: ""
        // }
        // updateUsser -> user = {
        //     firstName: "Sara",
        //     lastName: "Sara"
        // }
        //update user with entered values
        props.updateUser(data)
        //redirect to secondStep component
        props.history.push('/second') 
    }

    return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)} >
        <Form.Group controlId="firstName">
            <Form.Label className="label"> First Name </Form.Label>
            <Form.Control 
                type="firstName"
                name="firstName"
                placeholder="Enter your First Name"
                {...register('firstName', {
                    required: 'First Name is required',
                    pattern: {
                        value: /^[a-zA-Z]/,
                        message: 'First Name should contain only caracters'
                    }
                })}
                className={`${errors.firstName ? 'input-error': ''}`}
                />
                {/* if error exists display it */}
                {   
                    errors.firstName && (
                    <p className="errorMsg">{errors.firstName.message}</p>
                )}
        </Form.Group>

        <Form.Group controlId="lastName">
            <Form.Label className="label"> Last Name </Form.Label>
            <Form.Control 
                type="lastName"
                name="lastName"
                placeholder="Enter your Last Name"
                {...register("lastName", {
                    required: 'Last Name is required',
                    pattern: {
                        value: /^[a-zA-Z]/,
                        message: 'Last Name should contain only caracters'
                    }
                })}
                className={`${errors.lastName ? 'input-error': ''}`}
                />
                {/* if error exists display it */}
                { 
                errors.lastName && (
                    <p className="errorMsg">{errors.lastName.message}</p>
                )}
        </Form.Group>

        <Button type="submit" variant="primary" className="btn">
            Next
        </Button>
    </Form>
    )
}

export default FirstStep