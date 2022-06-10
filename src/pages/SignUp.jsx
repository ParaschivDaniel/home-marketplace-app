import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formData;

	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;

			updateProfile(auth.currentUser, {
				displayName: name,
			});

			const formDataCopy = { ...formData }; //coping what we have in state
			delete formDataCopy.password; // we don't want to store the password
			formDataCopy.timestamp = serverTimestamp(); // set the Timestamp to server Timestamp

			await setDoc(doc(db, 'users', user.uid), formDataCopy); // set the userData to user collection

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back!</p>
				</header>
				<form onSubmit={onSubmitHandler}>
					<input
						type='text'
						className='nameInput'
						placeholder='Name'
						id='name'
						value={name}
						onChange={onChangeHandler}
					/>
					<input
						type='email'
						className='emailInput'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChangeHandler}
					/>
					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Password'
							id='password'
							value={password}
							onChange={onChangeHandler}
						/>
						<img
							className='showPassword'
							src={visibilityIcon}
							alt='Show password'
							onClick={() => setShowPassword((prevState) => !prevState)}
						/>
					</div>
					<Link to='/forgot-password' className='forgotPasswordLink'>
						Forgot Password?
					</Link>

					<div className='signUpBar'>
						<p className='signUpText'>Sign Up</p>
						<button className='signUpButton'>
							<ArrowRightIcon fill='#fff' width='34px' height='34px' />
						</button>
					</div>
				</form>
				<Link to='/sign-in' className='registerLink'>
					Back to Sign In
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
