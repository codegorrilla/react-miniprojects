import './App.css';
import { useState } from 'react';
import usePasswordGenerator from './hooks/use-password-generator';

function App() {
	const [length, setLength] = useState(4);

	const [checkboxData, setCheckboxData] = useState([
		{ title: 'Include Uppercase Letters', state: false },
		{ title: 'Include Lowercase Letters', state: false },
		{ title: 'Include Numbers', state: false },
		{ title: 'Include Symbols', state: false },
	]);

	const handleCheckboxChange = (i) => {
		const updatedChckboxData = [...checkboxData];
		updatedChckboxData[i].state = !updatedChckboxData[i].state;

		setCheckboxData(updatedChckboxData);
	};

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(password);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	const { password, errorMessage, generatedPassword } = usePasswordGenerator();

	return (
		<div className='container'>
			{/* Password text and copy */}
			{password && (
				<div className='header'>
					<div className='title'>{password}</div>
					<button
						className='copyBtn'
						onClick={handleCopy}
					>
						{copied ? 'Copied' : 'Copy'}
					</button>
				</div>
			)}
			{/* Character length */}
			<div className='charlength'>
				<span>
					<label>Character length</label>
					<label>{length}</label>
				</span>
				<input
					type='range'
					min='4'
					max='20'
					value={length}
					onChange={(e) => setLength(e.target.value)}
				/>
			</div>

			{/* Checkboxes*/}
			<div className='checkboxes'>
				{checkboxData.map((checkbox, index) => {
					return (
						<div key={index}>
							<input
								type='checkbox'
								checked={checkbox.state}
								onChange={() => handleCheckboxChange(index)}
							/>
							<label>{checkbox.title}</label>
						</div>
					);
				})}
			</div>
			{/* Strength */}

			{/* Error handling */}
			{errorMessage && <div className='errorMessage'>{errorMessage}</div>}

			{/* Generate button */}
			<button
				className='generateBtn'
				onClick={() => generatedPassword(checkboxData, length)}
			>
				Generate Password
			</button>
		</div>
	);
}

export default App;
