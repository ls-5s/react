import instance from "../utils/http";

export const test = () => {
  return instance.get("/data");
};
