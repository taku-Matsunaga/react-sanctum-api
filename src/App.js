import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const http = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });


  const login = () => {
    http.get('/sanctum/csrf-cookie').then((res) => {
      http.post('/api/login', { email, password }).then((res) => {
        console.log(res);
      })
    })
  }
  
  const logout = () => {
    http.post('/api/logout').then((res) => {
      console.log(res);
    })
  }
  
  const getUsers = () => {
    http.get('http://localhost/api/users').then((res) => {
      setUsers(res.data);
    })
  }
  const reset = () => { setUsers([]) }
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className="App">
      <nav>
        <button onClick={login}>ログイン</button>
        <button onClick={logout}>ログアウト</button>
        <button onClick={getUsers}>User 一覧</button>
        <button onClick={reset}>リセット</button>
      </nav>
      <br />
      <div>
        <label>email</label>
        <input type="text" value={email} onChange={onChangeEmail} />
        <label>password</label>
        <input type="password" value={password} onChange={onChangePassword} />
      </div>
      <div>
        {
          users.map((user) => {
            return (
              <p key={user.email}>{user.name}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
