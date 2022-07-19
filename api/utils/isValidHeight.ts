
import getCurrMaxBlock from "./getCurrMaxHeight";

const isValidHeight = async (height: number): Promise<boolean> => {
  let maxHeight = await getCurrMaxBlock();
  let maxHeightNum = Number(maxHeight[0]['height'])
  return height >= 0 && height <= maxHeightNum;
}

export default isValidHeight;
