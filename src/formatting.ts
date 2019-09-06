import { Moment } from "moment";

export const formatDateTime = (source: Moment): string => {
  return source.format("YYYY-MM-DD HH:mm");
};
