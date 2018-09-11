import { AppSync } from 'aws-sdk';
import _ from 'lodash';
import { loadFindApis } from '../src/findApis';

test('find all apis', async () => {
  let listGraphqlApisMock = jest.fn();

  let findApis = loadFindApis({
    appSync: <AppSync>(<any>{
      listGraphqlApis: listGraphqlApisMock,
    }),
  });

  let allApis: AppSync.GraphqlApi[] = [
    { name: 'test1', apiId: 'test1_id' },
    { name: 'test2', apiId: 'test2_id' },
  ];
  listGraphqlApisMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<AppSync.ListGraphqlApisResponse>({
          graphqlApis: allApis,
        });
      },
    };
  });

  let apis = await findApis();

  expect(listGraphqlApisMock).toHaveBeenCalledTimes(1);
  expect(apis).toEqual(allApis);
});

test('find some apis', async () => {
  let listGraphqlApisMock = jest.fn();

  let findApis = loadFindApis({
    appSync: <AppSync>(<any>{
      listGraphqlApis: listGraphqlApisMock,
    }),
  });

  let allApis: AppSync.GraphqlApi[] = [
    { name: 'test1', apiId: 'test1_id' },
    { name: 'test2', apiId: 'test2_id' },
    { name: 'test3', apiId: 'test3_id' },
    { name: 'test3', apiId: 'test4_id' }, // AppSync allows the name to be duplicated
    { name: 'test5', apiId: 'test5_id' },
  ];
  listGraphqlApisMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<AppSync.ListGraphqlApisResponse>({
          graphqlApis: allApis,
        });
      },
    };
  });

  let apiName = 'test3';
  let apis = await findApis(apiName);

  expect(listGraphqlApisMock).toHaveBeenCalledTimes(1);
  expect(apis).toEqual(_.filter(allApis, (api) => api.name == apiName));
});

test('find all apis with next token 1', async () => {
  await testPaging(1);
});

test('find all apis with next token 2', async () => {
  await testPaging(2);
});

test('find all apis with next token 3', async () => {
  await testPaging(3);
});

test('find all apis with next token 4', async () => {
  await testPaging(4);
});

test('find all apis with next token 5', async () => {
  await testPaging(5);
});

test('find all apis with next token 6', async () => {
  await testPaging(6);
});

test('find all apis with next token 7', async () => {
  await testPaging(7);
});

async function testPaging(apisCount: number) {
  let listGraphqlApisMock = jest.fn();

  let findApis = loadFindApis({
    appSync: <AppSync>(<any>{
      listGraphqlApis: listGraphqlApisMock,
    }),
  });

  let allApis: AppSync.GraphqlApi[] = _.take(
    [
      { name: 'test1', apiId: 'test1_id' },
      { name: 'test2', apiId: 'test2_id' },
      { name: 'test3', apiId: 'test3_id' },
      { name: 'test3', apiId: 'test4_id' }, // name can be duplicated
      { name: 'test5', apiId: 'test5_id' },
      { name: 'test6', apiId: 'test6_id' },
      { name: 'test7', apiId: 'test7_id' },
    ],
    apisCount
  );

  let pageSize = 3;

  listGraphqlApisMock.mockImplementation(
    (options: AppSync.ListGraphqlApisRequest) => {
      let startIndex = options.nextToken ? parseInt(options.nextToken) : 0;
      let endIndex = startIndex + pageSize;
      let nextToken = endIndex < allApis.length ? endIndex : undefined;

      return {
        promise: () => {
          return Promise.resolve<AppSync.ListGraphqlApisResponse>({
            graphqlApis: allApis.slice(startIndex, endIndex),
            nextToken: nextToken ? nextToken.toString() : undefined,
          });
        },
      };
    }
  );

  let apis = await findApis();

  expect(listGraphqlApisMock).toHaveBeenCalledTimes(
    Math.ceil(allApis.length / pageSize)
  );
  expect(apis).toEqual(allApis);
}
