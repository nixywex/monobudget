import axios from "axios";
import { mccInterface } from "./mcc_intefaces";
import mcc from "./mcc.json";

const getMccCategory = (mccCode: number): string | null => {
  try {
    return mcc.filter(
      (mccObj: mccInterface) => Number(mccObj.mcc) === mccCode
    )[0].shortDescription.uk;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Something went wrong: " + e.message);
    } else {
      console.error("unexpected category error");
    }
    return null;
  }
};

export { getMccCategory };
