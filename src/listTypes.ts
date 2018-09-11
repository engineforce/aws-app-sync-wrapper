import { AppSync } from 'aws-sdk';

export interface IListTypes {
  (apiId: string): Promise<AppSync.Type[]>;
}

interface ILoadListTypesOptions {
  appSync: AppSync;
}

export function loadListTypes(options: ILoadListTypesOptions): IListTypes {
  return function listTypes(apiId: string) {
    return _listTypes(options, apiId);
  };
}

async function _listTypes(
  options: ILoadListTypesOptions,
  apiId: string,
  nextToken?
) {
  let result = await options.appSync
    .listTypes({
      apiId,
      format: 'JSON',
      nextToken,
    })
    .promise();

  let types = result.types;

  if (result.nextToken) {
    types = [...types, ...(await _listTypes(options, apiId, result.nextToken))];
  }

  return types;
}
