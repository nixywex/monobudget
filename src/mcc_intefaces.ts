interface mccInterface {
	mcc: string;
	group: {
		type: string;
		description: {
			uk: string;
			en: string;
			ru: string;
		};
	};
	fullDescription: {
		uk: string;
		en: string;
		ru: string;
	};
	shortDescription: {
		uk: string;
		en: string;
		ru: string;
	};
}

export type { mccInterface };
