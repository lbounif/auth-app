import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { BASE_API_URL } from '../utils/constants'

const Login = () => {
    const { register, handleSubmit, errors } = useForm()
    return (
        <Form className="input-form" /*onSubmit={} */>
            <div>

            </div>
            <Form.Group controlId="Email">
                <Form.Label> Email </Form.Label>
                <Form.Control 
                    type="email"
                    name="userEmail"
                    placeholder="Enter your email address"
                    ref={register({
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Email is not valid'
                        }
                    })}
                    className={`${errors.userEmail ? 'input-error': ''}`}
                    />
                    {/* if error exists display it */}
                    { errors.userEmail && (
                        <p className="errorMsg">{errors.userEmail.message}</p>
                    )}
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label> Password </Form.Label>
                <Form.Control 
                    type="password"
                    name="userPassword"
                    placeholder="Enter password"
                    ref={register({
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password should have at-least 6 characters'
                        }
                    })}
                    className={`${errors.userPassword ? 'input-error': ''}`}
                    />
                    {/* if error exists display it */}
                    { errors.userPassword && (
                        <p className="errorMsg">{errors.userPassword.message}</p>
                    )}
            </Form.Group>

            <Button type="submit" variant="primary">
                Check Login
            </Button>
        </Form>
    )
}

export default Login