import { AppSync } from 'aws-sdk';
import { IListTypes } from './listTypes';
import { asyncReduce } from '@engineforce/async-lib';

export interface IListResolvers {
  (apiId: string): Promise<AppSync.Resolvers>;
}

interface ILoadListResolversOptions {
  appSync: AppSync;
  listTypes: IListTypes;
}

export function loadListResolvers(
  options: ILoadListResolversOptions
): IListResolvers {
  return async function listResolvers(apiId: string) {
    let types = await options.listTypes(apiId);

    return asyncReduce(
      types,
      async (results, type) => {
        let resolvers = await _listResolvers(options, apiId, type.name);
        results.push(...resolvers);
        return results;
      },
      <AppSync.Resolvers>[]
    );
  };
}

async function _listResolvers(
  options: ILoadListResolversOptions,
  apiId: string,
  typeName: string,
  nextToken?
) {
  let result = await options.appSync
    .listResolvers({
      apiId,
      typeName,
      nextToken,
    })
    .promise();

  let resolvers = result.resolvers;

  if (result.nextToken) {
    resolvers = [
      ...resolvers,
      ...(await _listResolvers(options, apiId, typeName, result.nextToken)),
    ];
  }

  return resolvers;
}
