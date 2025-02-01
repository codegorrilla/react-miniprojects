import { useState, useEffect } from 'react';
import CurrencyDropDown from './drop-down';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConverter = () => {
	//currencies -> https://api.frankfurter.app/currencies
	//conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

	const [currencies, setCurrencies] = useState([]);
	const [amount, setAmount] = useState(1);

	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('INR');

	const [convertedAmount, setConvertedAmount] = useState(null);
	const [converting, setConverting] = useState(false);

	const fetchCurrencies = async () => {
		try {
			const res = await fetch('https://api.frankfurter.app/currencies');
			const data = await res.json();
			//console.log(`the result is: ${data}`);

			setCurrencies(Object.keys(data));
		} catch (err) {
			console.error('Error fetching currencies', err);
		}
	};

	useEffect(() => {
		fetchCurrencies();
	}, []);

	console.log(currencies);

	const convertCurrency = async () => {
		if (!amount) return;

		setConverting(true);
		try {
			const res = await fetch(
				`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
			);
			const data = await res.json();
			//console.log(`the result is: ${data}`);

			setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
		} catch (err) {
			console.error('Error fetching currencies', err);
		} finally {
			setConverting(false);
		}
	};

	const swapCurrencies = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	};

	return (
		<div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
			<h2 className='mb-5 text-2xl font-smibold text-gray-700'>
				Currency Converter
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
				<CurrencyDropDown
					currencies={currencies}
					currency={fromCurrency}
					setCurrency={setFromCurrency}
					title='From:'
				/>

				{/* swap currency button */}
				<div className='flex justify-center -mb-5 sm:mb-0'>
					<button
						onClick={swapCurrencies}
						className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
						<HiArrowsRightLeft className='text-xl text-gray-700' />
					</button>
				</div>
				<CurrencyDropDown
					currencies={currencies}
					currency={toCurrency}
					setCurrency={setToCurrency}
					title='To:'
				/>
			</div>
			<div className='mt-4'>
				<label
					htmlFor='amount'
					className='block text-sm font-medium text-gray-700'>
					Amount:
				</label>
				<input
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className='w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
				/>

				<div className='flex justify-end mt-6'>
					<button
						onClick={convertCurrency}
						className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                        ${converting ? 'animate-pulse' : ''}`}>
						Convert
					</button>
				</div>

				{convertedAmount && (
					<div className='mt-4 text-lg font-medium text-right text-green-600'>
						Converted amount: {convertedAmount}
					</div>
				)}
			</div>
		</div>
	);
};

export default CurrencyConverter;
