import { createReducer, on } from "@ngrx/store";
import { loadApiDataSuccess } from "./app.action";
import { getDatafromSearch } from "./interfaces";

export interface responseState {
  response:getDatafromSearch[];
};

export const initialState: responseState  = {
  response: []
};

export const appReducer = createReducer(
  on(loadApiDataSuccess, (state, {response}) => response.reduce((acc, resp) => ({
    ...acc,
    [resp.q]: resp
  }), {}))
)
