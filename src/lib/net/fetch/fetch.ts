import urlJoin from "url-join";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import { APIError } from "./APIError";

type Params = {
  body?: BodyInit | null;
  headers?: HeadersInit;
};

const logger = process.env.NODE_ENV === "production" ? _.noop : console.debug;

export const fetchServer = async (
  path: string,
  params: Params = {},
  method = "GET"
) => {
  if (!path.startsWith("http")) {
    path = urlJoin(process.env.EXPRESS_PUBLIC_API_BASE_URL!, path);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  Object.assign(headers, params.headers);

  const options = { body: params.body, method, headers }
  logger(`${method}`, path, options);

  const response = await fetch(path, options);
  const { status } = response;

  if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
    logger(`${method} ${status} error`, path, "->", "response:", response);
    throw new APIError(response);
  }

  const data = await response.json();
  logger(`${method} ${status} JSON response`, path, "->", data);

  if(!response.ok) {
    logger(`${method} ${status} error`, path, "->", "response:", response);
    throw new APIError(response, data);
  }

  return data;

};

export const putServer = (
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>,
  method = "PUT"
) => fetchServer(path, { body: JSON.stringify(body), ...params }, method);

export const postServer = (
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>
) => putServer(path, body, params, "POST");

export const deleteServer = (
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>
) => putServer(path, body, params, "DELETE");