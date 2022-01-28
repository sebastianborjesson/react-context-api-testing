import UserProvider from "./UserContext"

const AppContext = (props) => {
    
    
    return (
        <UserProvider>
            {props.children}
        </UserProvider>
    )
}
export default AppContext