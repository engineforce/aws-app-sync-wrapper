import filter from 'lodash/filter';
import { AppSync } from 'aws-sdk';

interface IFindApis {
  (apiName?: string): Promise<AppSync.GraphqlApi[]>;
}

interface ILoadFindApisOptions {
  appSync: AppSync;
}

export function loadFindApis(options: ILoadFindApisOptions): IFindApis {
  return function findApis(apiName?: string) {
    return _findApis(options, apiName);
  };
}

async function _findApis(
  options: ILoadFindApisOptions,
  apiName?: string,
  nextToken?
) {
  let result = await options.appSync
    .listGraphqlApis({
      nextToken,
    })
    .promise();

  let apis = result.graphqlApis;
  if (apiName) {
    apis = filter(apis, (api) => api.name == apiName);
  }

  if (result.nextToken) {
    apis = [...apis, ...(await _findApis(options, apiName, result.nextToken))];
  }

  return apis;
}
