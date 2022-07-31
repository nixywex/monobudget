import axios from 'axios';

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

const mccUrl = 'https://raw.githubusercontent.com/Oleksios/Merchant-Category-Codes/main/With%20groups/mcc.json';

const getMcc = async () => (await axios(mccUrl)).data;

const getMccCategory = async (mccCode: number): Promise<string> => {
  const mcc: Promise<mccInterface[]> = await getMcc();
  return (await mcc).filter((mccObj: mccInterface) => Number(mccObj.mcc) === mccCode)[0].shortDescription.uk;
};

export { getMccCategory };
export type { mccInterface };
