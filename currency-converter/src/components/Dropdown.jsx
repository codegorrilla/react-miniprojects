const CurrencyDropdown = ({
	currencies,
	currency,
	setCurrency,
	favourites,
	handleFavourite,
	title,
}) => {
	return (
		<div>
			<label htmlFor={title}>{title}</label>
		</div>
	);
};

export default CurrencyDropdown;
