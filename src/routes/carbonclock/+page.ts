import { csv } from 'd3';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const dataConverter = (d) => ({
		date: parseFloat(d.Date),
		co2: parseFloat(d.CO2),
		seasonally_adjusted: parseFloat(d.seasonally_adjusted)
	});

	const res = await csv('http://127.0.0.1:4173/monthly_in_situ_co2_mlo.csv', dataConverter);
	const data = res.filter((d) => d.co2 >= 0);

	return {
		array: data
	};
}
