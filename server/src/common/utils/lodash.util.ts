import { pick } from 'lodash';

// Get fields from object
export const getFields = (object: any, fields: string[]): any =>
  pick(object, fields);
