import useAuth from "./hooks/useAuth";

const Signin = () => {
  const {loginUser, error} = useAuth()

  return (                                       
    <div className="App">
        <form  onSubmit={loginUser}>
        <p>{error}</p>
      <h1>SignIn</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input 
        type='text'
        id = 'username'
        name="username"
        // onChange={(e) => setName(e.target.value)}
        required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
        type='text'
        id = 'password'
        name="password"
        // onChange={(e) => setPassword(e.target.value)}
        required
        />
      </div>
      <button >Submit</button>
        </form>
    </div>
  )
}

export default Signin