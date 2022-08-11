import { mccInterface } from "./mcc_intefaces";
import mcc from "./mcc.json";

const getMccCategory = (mccCode: number): string => {
  return mcc.filter((mccObj: mccInterface) => Number(mccObj.mcc) === mccCode)[0].shortDescription
    .uk;
};

export { getMccCategory };
