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

			<div>
				<select>
					{currencies?.map((currency) => {
						<option value={currency} key={currency}>
							{currency}
						</option>;
					})}
				</select>
			</div>
		</div>
	);
};

export default CurrencyDropdown;
