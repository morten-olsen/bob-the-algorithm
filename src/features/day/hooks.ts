import { useContext } from "react"
import { DateContext } from "./context"

export const useDate = () => {
  const { date } = useContext(DateContext);
  return date;
}

export const useSetDate = () => {
  const { setDate } = useContext(DateContext);
  return setDate;
}
