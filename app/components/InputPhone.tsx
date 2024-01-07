import countryCodes from "@/app/country-codes.json";

export const InputPhone = () => {
	return (
		<div>
			<input />
			<div>
				{countryCodes.map((item) => (
					<div key={item.name}>
						<h1>{item.name}</h1>
					</div>
				))}
			</div>
		</div>
	);
};
