import axios from "axios";
import { AxiosError } from "axios";
import { useAppSelector } from "../hooks/reduxHook";

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}
