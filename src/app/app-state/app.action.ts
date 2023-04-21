import { createAction, props } from "@ngrx/store";
import { getDatafromSearch } from "./interfaces";

export const loadApiData = createAction('[API Services] Load API using search parameters');
export const loadApiDataSuccess = createAction('[API Services] Load API using search parameters Success', props<{response: getDatafromSearch[]}>());
export const loadApiDataFailure = createAction('[API Services] Load API using search parameters Failure');
