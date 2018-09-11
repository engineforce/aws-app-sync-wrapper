import aws from 'aws-sdk';
import { loadFindApis } from './src/findApis';
import { loadListTypes } from './src/listTypes';
import { loadListResolvers } from './src/listResolvers';
import { loadDeleteResolvers } from './src/deleteResolvers';

const appSync = new aws.AppSync();

export const findApis = loadFindApis({ appSync });
export const listTypes = loadListTypes({ appSync });
export const listResolvers = loadListResolvers({ appSync, listTypes });
export const deleteResolvers = loadDeleteResolvers({ appSync, listResolvers });
