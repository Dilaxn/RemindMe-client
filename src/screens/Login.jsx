import React, { useState } from 'react';
import authSvg from '../assests/login.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { auth } from '../context/UserContext';
import log from '../assests/log.png';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import FacebookLogin from 'react-facebook-login';
const Login = ({ history }) => {

    const [formData, setFormData] = useState({
        email: '',
        password1: '',
        textChange: 'Sign In'
    });
    const { email, password1, textChange } = formData;
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const sendGoogleToken = tokenId => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
                idToken: tokenId
            })
            .then(res => {
                console.log(res.data);
                informParent(res);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin'
                ? history.push('/admin')
                : history.push('/private');
        });
    };

    const sendFacebookToken = (userID, accessToken) => {
        console.log('heee');
        axios
            .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
                userID,
                accessToken
            })
            .then(res => {
                console.log(res.data);
                informParent(res);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    const responseGoogle = response => {
        console.log(response);
        sendGoogleToken(response.tokenId);
    };

    const responseFacebook = response => {
        console.log('response');
        sendFacebookToken(response.userID, response.accessToken);
    };

    const handleSubmit = e => {
        console.log(process.env.REACT_APP_API_URL);
        e.preventDefault();
        if (email && password1) {
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
                .post(`${process.env.REACT_APP_API_URL}/login`, {
                    email,
                    password: password1
                })
                .then(res => {
                    console.log('res' + res);
                    // toast.success(`Hey ${res.data.user.name}, Welcome back!`);
                    return res;
                })
                .then(res => {


                    localStorage.setItem('id_token', res.data.token);
                    auth().then(r => console.log(r));
                    authenticate(res, () => {
                        setFormData({
                            ...formData,
                            email: '',
                            password1: '',
                            textChange: 'Submitted'
                        });
                        console.log(isAuth());

                        // isAuth() && isAuth().role === 'admin'
                        //   ? history.push('/admin')
                        //   : history.push('/private');
                        localStorage.setItem('isLoggedIn', true);
                        console.log('res token:' + res.data.token);


                    });
                })
                .catch(e => {
                    setFormData({
                        ...formData,
                        email: '',
                        password1: '',
                        textChange: 'Sign In'
                    });
                    if (e.response && e.response.data) {
                        console.log(e.response.data.errors);
                        toast.error(e.response.data.errors);// some reason error message
                    }
                    // console.log(e);

                });
        } else {
            toast.error('Please fill all fields');
        }
    };
    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign In for RemindMe
                        </h1>
                        <div className='w-full flex-1 mt-8 text-indigo-500'>
                            <div className='flex flex-col items-center'>
                            {/*    <GoogleLogin*/}
                            {/*        clientId="638497308613-q271620jn91mjhmc936svg2upp80e1mk.apps.googleusercontent.com"*/}
                            {/*        onSuccess={responseGoogle}*/}
                            {/*        onFailure={responseGoogle}*/}
                            {/*        cookiePolicy={'single_host_origin'}*/}
                            {/*        render={renderProps => (*/}
                            {/*            <button*/}
                            {/*                onClick={renderProps.onClick}*/}
                            {/*                disabled={renderProps.disabled}*/}
                            {/*                className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'*/}
                            {/*            >*/}
                            {/*                <div className=' p-2 rounded-full '>*/}
                            {/*                    <i className='fab fa-google ' />*/}
                            {/*                </div>*/}
                            {/*                <span className='ml-4'>Sign In with Google</span>*/}
                            {/*            </button>*/}
                            {/*        )}*/}
                            {/*    />*/}

                            {/*    <FacebookLogin*/}
                            {/*        appId="594634371926159"*/}
                            {/*        autoLoad={true}*/}
                            {/*        fields="name,email"*/}
                            {/*        callback={responseFacebook}*/}
                            {/*        render={renderProps => (*/}
                            {/*            <button*/}
                            {/*                onClick={renderProps.onClick}*/}
                            {/*                className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'*/}
                            {/*            >*/}
                            {/*                <div className=' p-2 rounded-full '>*/}
                            {/*                    <i className='fab fa-facebook' />*/}
                            {/*                </div>*/}
                            {/*                <span className='ml-4'>Sign In with Facebook</span>*/}
                            {/*            </button>*/}
                            {/*        )}*/}
                            {/*    />*/}

                                {/*<FacebookLogin*/}
                                {/*    appId="594634371926159"*/}
                                {/*    autoLoad={true}*/}
                                {/*    fields="name,email"*/}
                                {/*    callback={responseFacebook} />*/}

                                <a
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    href='/register'
                                    target='_self'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Sign Up</span>
                                </a>
                            </div>
                            <div className='my-12 border-b text-center'>
                                <div
                                    className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign In with e-mail
                                </div>
                            </div>
                            <form
                                className='mx-auto max-w-xs relative '
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='email'
                                    placeholder='Email'
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='Password'
                                    onChange={handleChange('password1')}
                                    value={password1}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                                    <span className='ml-3'>Sign In</span>
                                </button>
                                <Link
                                    to='/users/password/forget'
                                    className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                                >
                                    Forget password?
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='flex-1 bg-contain bg-full h-full text-center bg-no-repeat hidden lg:flex'
                >
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${log})`, width: '100%' }}
                    ></div>
                </div>
            </div>
            ;
        </div>
    );
};

export default Login;
