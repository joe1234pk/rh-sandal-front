export const catalogTaxonomy = {
	tier1: {
		sandals: {
			label: 'Sandals',
			visible: true,
			collections: ['dior', 'hermes', 'lv', 'zara'],
		}
		// clogs: {
		// 	label: 'Clogs',
		// 	visible: false,
		// 	collections: ['heritage', 'luxe'],
		// },
		// slides: {
		// 	label: 'Slides',
		// 	visible: false,
		// 	collections: ['dune', 'zest'],
		// },
		// closedShoes: {
		// 	label: 'Closed Shoes',
		// 	visible: false,
		// 	collections: ['heritage', 'luxe'],
		// },
	},
	tier2: {
		dior: { label: 'Dior' },
		hermes: { label: 'Hermes' },
		lv: { label: 'LV' },
		zara: { label: 'Zara' }
		// heritage: { label: 'Heritage' },
		// luxe: { label: 'Luxe' },
		// dune: { label: 'Dune' },
		// zest: { label: 'Zest' },
	},
};

export function getTierLabel(tier, key) {
	return catalogTaxonomy[tier][key]?.label || key;
}

export function getTier2Keys(tier1Key) {
	return catalogTaxonomy.tier1[tier1Key]?.collections || [];
}
