import PropTypes from 'prop-types';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';

export default function CurrencyDropDown({
	currencies,
	currency,
	setCurrency,
	favourites,
	handleFavourite,
	title = '',
}) {
	const isFavourite = (curr) => favourites.includes(curr);
	return (
		<div>
			<label
				htmlFor={title}
				className='block text-sm font-medium text-gray-700'
			>
				{title}
			</label>
			<div className='mt-1 relative'>
				<select
					value={currency}
					onChange={(e) => setCurrency(e.target.value)}
					className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
				>
					{favourites.map((currency) => {
						return (
							<option
								className='bg-gray-200'
								value={currency}
								key={currency}
							>
								{currency}
							</option>
						);
					})}
					{/* render favourties */}
					<hr />
					{currencies
						.filter((c) => !favourites.includes(c))
						.map((currency) => (
							<option
								value={currency}
								key={currency}
							>
								{currency}
							</option>
						))}
				</select>
				<button
					onClick={() => handleFavourite(currency)}
					className='absolute inset-y-0 right-0 pt-5 pr-4 flex items-center text-sm leading-5'
				>
					{isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}
				</button>
			</div>
		</div>
	);
}

CurrencyDropDown.propTypes = {
	currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
	currency: PropTypes.string.isRequired,
	setCurrency: PropTypes.func.isRequired,
	favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleFavourite: PropTypes.func.isRequired,
	title: PropTypes.string,
};
