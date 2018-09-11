import { AppSync } from 'aws-sdk';
import { IListResolvers } from './listResolvers';
import { asyncMap } from '@engineforce/async-lib';

interface IDeleteResolvers {
  (apiId: string): Promise<void>;
}

interface ILoadDeleteResolversOptions {
  appSync: AppSync;
  listResolvers: IListResolvers;
}

export function loadDeleteResolvers(
  options: ILoadDeleteResolversOptions
): IDeleteResolvers {
  return function deleteResolvers(apiId: string, typeName?: string) {
    return _deleteResolvers(options, apiId);
  };
}

async function _deleteResolvers(
  options: ILoadDeleteResolversOptions,
  apiId: string
) {
  let resolvers = await options.listResolvers(apiId);

  await asyncMap(resolvers, async (resolver) => {
    await options.appSync
      .deleteResolver({
        apiId,
        typeName: resolver.typeName,
        fieldName: resolver.fieldName,
      })
      .promise();
  });
}
