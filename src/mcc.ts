import axios from "axios";
import { mccInterface } from "./mcc_intefaces";

const mccUrl =
  "https://raw.githubusercontent.com/Oleksios/Merchant-Category-Codes/main/With%20groups/mcc.json";

const getMcc = async (): Promise<mccInterface[]> => {
  return (await axios(mccUrl)).data;
};

const getMccCategory = async (mccCode: number): Promise<string | null> => {
  try {
    const mcc = await getMcc();
    return mcc.filter(
      (mccObj: mccInterface) => Number(mccObj.mcc) === mccCode
    )[0].shortDescription.uk;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Something went wrong: " + e.message);
    } else {
      console.error("unexpected error");
    }
    return null;
  }
};

export { getMccCategory };
