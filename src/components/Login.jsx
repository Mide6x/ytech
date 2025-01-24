import Navbar from './Navbar';

function Login() {
    return (
        <>
            <div className="background-animation"></div>
            <Navbar />
            <main className="login-container">
                <div className="login-box">
                    <h2>Welcome Back!</h2>
                    <p className="login-subtitle">Continue your Yorùbá learning journey</p>
                    
                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required />
                        </div>
                        <div className="form-options">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="login-button">Log In</button>
                    </form>
                
                    <p className="signup-link">
                        Don&apos;t have an account? <a href="#">Sign up</a>
                    </p>
                </div>
            </main>
        </>
    );
}

export default Login; 