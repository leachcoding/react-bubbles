import React, {useState, useEffect} from "react";
import api from '../utils/api'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    api().post('/api/login', form)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubbles');
      })
      .catch(error => console.error('error', error))
  }

  return (
    <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <input
                type='text'
                name='username'
                placeholder='User Name'
                value={form.name}
                onChange={handleChange}
            />
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
            />
           <button type='submit'>Login</button>
        </form>
  );
};

export default Login;
