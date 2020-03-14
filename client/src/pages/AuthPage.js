import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';


export const AuthPage = () => {
   const auth = useContext(AuthContext);
   const message = useMessage();
   const { loading, error, request, clearError } = useHttp();

   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   useEffect(() => {
      message(error);
      clearError();
   }, [error, message, clearError]);

   useEffect(()=>{
      window.M.updateTextFields();
   }, []);

   const changeHandler = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', { ...form });
         message(data.message);
      } catch (error) {

      }
   };

   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', { ...form });
         auth.login(data.token, data.userId);
      } catch (error) {

      }
   }

   return (
      <div className='row'>
         <div className="col s6 offset-s3">
            <h1>Сократи ссылку</h1>
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Авторизация</span>
                  <div>
                     <div className="input-field">
                        <input
                           placeholder="Введите email"
                           id="email"
                           name="email"
                           type="text"
                           value={form.email}
                           onChange={changeHandler}
                           className="yellow-input" />
                        <label htmlFor="email">Email</label>
                     </div>
                     <div className="input-field">
                        <input
                           placeholder="Введите пароль"
                           id="password"
                           name="password"
                           type="password"
                           value={form.password}
                           onChange={changeHandler}
                           className="yellow-input" />
                        <label htmlFor="password">Password</label>
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  <button
                     className="btn yellow darken-4"
                     style={{ marginRight: 10 }}
                     disabled={loading}
                     onClick={loginHandler}
                  >
                     Войти
                  </button>
                  <button
                     className="btn grey darken-1 white-text"
                     onClick={registerHandler}
                     disabled={loading}
                  >
                     Регистрация
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
