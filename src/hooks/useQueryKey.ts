import CONSTS from "../consts/const";

const useQuerykey = () => {
  const keys = CONSTS.QUERY_KEYS;

  const builder = (key: string, ...params: any[]) => {
    return [key, ...params];
  };

  return {
    keys,
    builder,
  };
};

export default useQuerykey;
