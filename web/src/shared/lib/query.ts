import {makePlainQueryDataSource as makePlainQueryDataSourceBase, PlainQueryDataSource} from '@gravity-ui/data-source';

import { HTTPValidationError, ValidationError } from '../api/zakupaiSchemas';

export type ApiError = HTTPValidationError | ValidationError;

export const makePlainQueryDataSource = <TParams, TRequest, TResponse, TData, TError = ApiError>(
  config: Omit<PlainQueryDataSource<TParams, TRequest, TResponse, TData, TError>, 'type'>,
): PlainQueryDataSource<TParams, TRequest, TResponse, TData, TError> => {
  return makePlainQueryDataSourceBase(config);
};