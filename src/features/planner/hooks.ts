import { buildGraph, Status, Strategies } from "./algorithm/build-graph";
import { useContext } from "react";
import { PlanItem } from "#/types/plans";
import { PlannerContext } from "./context";
import { Task, UserLocation } from "../data";

export type UsePlanOptions = {
  location: UserLocation;
}

export type UsePlan = [
  (start?: Date) => Promise<any>,
  { 
    result?: { agenda: PlanItem[], impossible: Task[] };
    status?: Status;
    loading: boolean;
    error?: any;
  }
]

export const usePlanOptions = () => {
  const { data } = useContext(PlannerContext);
  return data;
}

export const useSetPlanOptions = () => {
  const { setData } = useContext(PlannerContext);
  return setData;
}

export const usePlan = () => {
  
}

