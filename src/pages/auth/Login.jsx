import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../services/userAuthApi'
import { useNavigate } from 'react-router-dom'
import { setUserToken } from '../../features/authSlice'
import { storeToken, getToken } from '../../services/localStoregService'
const Login = () => {
    const [serverError, setServerError] = useState({})
    const dispatch = useDispatch()
    const [loginUser] = useLoginUserMutation()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            phone_number: data.get('phone'),
            password: data.get('password'),
        }
        const res = await loginUser(actualData)
        if (res.error) {
            setServerError(res.error.data)
        }
        if (res.data) {
            storeToken(res.data)
            let { access_token } = getToken()
            dispatch(setUserToken({ access_token: access_token }))
            navigate('/')
        }
    }

    let { access_token } = getToken()
    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])

    return (
        <Form id='login-form' onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="phone" name="phone" placeholder="Enter phone number" />
                {serverError.phone_number ?
                    <Form.Text style={{ "color": "red", "fontSize": 12, "paddingLeft": 10 }}>
                        {serverError.phone_number}
                    </Form.Text>
                    : ""}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" />
                {serverError.password ?
                    <Form.Text style={{ "color": "red", "fontSize": 12, "paddingLeft": 10 }}>
                        {serverError.password}
                    </Form.Text>
                    : ""}
            </Form.Group>

            <div className='d-flex justify-content-between mb-3'>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <a href="/passwordresetemail" className='mt-2'>Forgot Password</a>
            </div>
            {serverError.detail ? <Alert variant='danger'>{serverError.detail}</Alert> : ''}
        </Form>
    )
}

export default Login