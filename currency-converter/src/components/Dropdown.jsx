import PropTypes from 'prop-types';

export default function CurrencyDropdown({
	currencies,
	currency,
	setCurrency,
	favourites,
	handleFavourite,
	title = '',
}) {
	return (
		<div>
			<label htmlFor={title} className=''>
				{title}
			</label>
			<div>
				<select value={currency} onChange={e => setCurrency(e.target.value)}>
					{currencies.map(currency => (
						<option key={currency} value={currency}></option>
					))}
				</select>
			</div>
		</div>
	);
}

CurrencyDropdown.propTypes = {
	currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
	currency: PropTypes.string.isRequired,
	setCurrency: PropTypes.func.isRequired,
	favourites: PropTypes.arrayOf(PropTypes.string),
	handleFavourite: PropTypes.func,
	title: PropTypes.string,
};
