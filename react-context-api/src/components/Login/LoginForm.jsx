import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/user'

const userNameConfig = {
    required: true,
    minLength: 3
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async ({ username }) => {
        const [error, user] = await loginUser(username)
        console.log(error)
        console.log(user)
     }
    
    //console.log(errors);

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
                <button type="submit">Continue</button>

            </form>
        </>
    )
}
export default LoginForm