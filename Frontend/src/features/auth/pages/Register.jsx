import react from "react"
import '../style/form.scss'
import { Link } from 'react-router'
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <main>
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" id="username" placeholder="Enter Username" />
                    <input type="email" name="email" id="email" placeholder="Enter Your Email" />
                    <input type="password" name="password" id="email" placeholder="Enter Password" />
                    <button className="button primary-button">Register</button>
                                    <p>Already have an account? <Link to={"/login"}>login .</Link> </p>

                </form>
            </div>
        </main>
    )

}

export default Register;