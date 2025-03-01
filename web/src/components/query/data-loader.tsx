import { ComponentType } from 'react';

import {
  DataLoader as DataLoaderBase,
  DataLoaderProps as DataLoaderPropsBase,
  ErrorViewProps,
  makePlainQueryDataSource,
  skipContext,
} from '@gravity-ui/data-source';

import { ApiError } from '@/shared/lib/query';

import { LoadingView as LoadingViewBase } from './loading-view';
import { ErrorView as ErrorViewBase } from './error-view';


export interface DataLoaderProps
  extends Omit<DataLoaderPropsBase<ApiError>, 'LoadingView' | 'ErrorView'> {
  LoadingView?: ComponentType;
  ErrorView?: ComponentType<ErrorViewProps<ApiError>>;
}

export const DataLoader: React.FC<DataLoaderProps> = ({
  LoadingView = LoadingViewBase,
  ErrorView = ErrorViewBase,
  ...restProps
}) => {
  return <DataLoaderBase LoadingView={LoadingView} ErrorView={ErrorView} {...restProps} />;
};
