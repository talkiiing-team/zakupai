/**
 * Generated by @openapi-codegen
 *
 * @version 0.1.0
 */
import type * as Fetcher from "./zakupaiFetcher";
import { zakupaiFetch } from "./zakupaiFetcher";
import type * as Schemas from "./zakupaiSchemas";

export type GetAvailableJoinTableDatasourceGetAvailableJoinTablesGetError =
  Fetcher.ErrorWrapper<undefined>;

export const getAvailableJoinTableDatasourceGetAvailableJoinTablesGet = (
  signal?: AbortSignal,
) =>
  zakupaiFetch<
    void,
    GetAvailableJoinTableDatasourceGetAvailableJoinTablesGetError,
    undefined,
    {},
    {},
    {}
  >({ url: "/datasource/get_available_join_tables", method: "get", signal });

export type GetTableListDatasourceTableListGetError =
  Fetcher.ErrorWrapper<undefined>;

export type GetTableListDatasourceTableListGetResponse = string[];

export const getTableListDatasourceTableListGet = (signal?: AbortSignal) =>
  zakupaiFetch<
    GetTableListDatasourceTableListGetResponse,
    GetTableListDatasourceTableListGetError,
    undefined,
    {},
    {},
    {}
  >({ url: "/datasource/table_list", method: "get", signal });

export type GetJoinSequenceListDatasourceDatasourceConstructorPostQueryParams =
  {
    /**
     * @default 100
     */
    limit?: number | null;
  };

export type GetJoinSequenceListDatasourceDatasourceConstructorPostError =
  Fetcher.ErrorWrapper<{
    status: 422;
    payload: Schemas.HTTPValidationError;
  }>;

export type GetJoinSequenceListDatasourceDatasourceConstructorPostResponse =
  Record<string, any>[];

export type GetJoinSequenceListDatasourceDatasourceConstructorPostVariables = {
  body: Schemas.TableJoinDescription;
  queryParams?: GetJoinSequenceListDatasourceDatasourceConstructorPostQueryParams;
};

export const getJoinSequenceListDatasourceDatasourceConstructorPost = (
  variables: GetJoinSequenceListDatasourceDatasourceConstructorPostVariables,
  signal?: AbortSignal,
) =>
  zakupaiFetch<
    GetJoinSequenceListDatasourceDatasourceConstructorPostResponse,
    GetJoinSequenceListDatasourceDatasourceConstructorPostError,
    Schemas.TableJoinDescription,
    {},
    GetJoinSequenceListDatasourceDatasourceConstructorPostQueryParams,
    {}
  >({
    url: "/datasource/datasource_constructor",
    method: "post",
    ...variables,
    signal,
  });

export type GetTableFiltersDatasourceGetTableFiltersPostError =
  Fetcher.ErrorWrapper<{
    status: 422;
    payload: Schemas.HTTPValidationError;
  }>;

export type GetTableFiltersDatasourceGetTableFiltersPostResponse =
  Schemas.TableFilterFrontDto[];

export type GetTableFiltersDatasourceGetTableFiltersPostVariables = {
  body: Schemas.TableJoinDescription;
};

export const getTableFiltersDatasourceGetTableFiltersPost = (
  variables: GetTableFiltersDatasourceGetTableFiltersPostVariables,
  signal?: AbortSignal,
) =>
  zakupaiFetch<
    GetTableFiltersDatasourceGetTableFiltersPostResponse,
    GetTableFiltersDatasourceGetTableFiltersPostError,
    Schemas.TableJoinDescription,
    {},
    {},
    {}
  >({
    url: "/datasource/get_table_filters",
    method: "post",
    ...variables,
    signal,
  });

export type GetNotificationChannelsNotificationChannelsGetError =
  Fetcher.ErrorWrapper<undefined>;

export type GetNotificationChannelsNotificationChannelsGetResponse = (
  | Schemas.TelegramNotificationChannelSchema
  | Schemas.EmailNotificationChannelSchema
)[];

export const getNotificationChannelsNotificationChannelsGet = (
  signal?: AbortSignal,
) =>
  zakupaiFetch<
    GetNotificationChannelsNotificationChannelsGetResponse,
    GetNotificationChannelsNotificationChannelsGetError,
    undefined,
    {},
    {},
    {}
  >({ url: "/notification_channels/", method: "get", signal });

export type GetNotificationChannelsNotificationChannelsEmailPostQueryParams = {
  /**
   * @format email
   */
  email: string;
};

export type GetNotificationChannelsNotificationChannelsEmailPostError =
  Fetcher.ErrorWrapper<{
    status: 422;
    payload: Schemas.HTTPValidationError;
  }>;

export type GetNotificationChannelsNotificationChannelsEmailPostVariables = {
  queryParams: GetNotificationChannelsNotificationChannelsEmailPostQueryParams;
};

export const getNotificationChannelsNotificationChannelsEmailPost = (
  variables: GetNotificationChannelsNotificationChannelsEmailPostVariables,
  signal?: AbortSignal,
) =>
  zakupaiFetch<
    void,
    GetNotificationChannelsNotificationChannelsEmailPostError,
    undefined,
    {},
    GetNotificationChannelsNotificationChannelsEmailPostQueryParams,
    {}
  >({
    url: "/notification_channels/email",
    method: "post",
    ...variables,
    signal,
  });

export type TgWebhookTgWebhookPostError = Fetcher.ErrorWrapper<undefined>;

export const tgWebhookTgWebhookPost = (signal?: AbortSignal) =>
  zakupaiFetch<void, TgWebhookTgWebhookPostError, undefined, {}, {}, {}>({
    url: "/tg/webhook",
    method: "post",
    signal,
  });

export type HealthHealthGetError = Fetcher.ErrorWrapper<undefined>;

export const healthHealthGet = (signal?: AbortSignal) =>
  zakupaiFetch<void, HealthHealthGetError, undefined, {}, {}, {}>({
    url: "/health",
    method: "get",
    signal,
  });
