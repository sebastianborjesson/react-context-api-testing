import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/user'
import { storageSave } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const userNameConfig = {
    required: true,
    minLength: 3
}

const LoginForm = () => {
    // Hooks
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    // Local States
    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState(null)

    // Side Effects
    useEffect(() => {
        if(user !== null) {
            navigate('/profile')
        }
    }, [user, navigate]) // Empty deps - Only run once

    // Event Handlers

    const onSubmit = async ({ username }) => {
        setLoading(true)
        const [error, userResponse] = await loginUser(username)
        if(error !== null) {
            setApiError(error)
        }
        if(userResponse !== null) {
            storageSave('coffee-user', userResponse)
            setUser(userResponse)
        }
        setLoading(false)
    }

    // Render Functions
    const errorMessage = (() => {
        if(!errors.username) {
            return null
        }

        if (errors.username.type === 'required') {
            return <span>Username is required!</span>
        }
        
        if (errors.username.type === 'minLength') {
            return <span>Username is to short! (min 2 characters)</span>
        }
    })()

    return (
        <>
            <h2>What's your name?</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <label htmlFor="username">UserName: </label>
                    <input 
                        placeholder='johndoe'
                        type="text" 
                        { ...register("username", userNameConfig) } 
                    />
                    { errorMessage }
                </fieldset>
                <button type="submit" disabled={loading}>Continue</button>
                
                { loading && <p>Logging in...</p>}
                { apiError && <p>{ apiError }</p>}
            </form>
        </>
    )
}
export default LoginForm