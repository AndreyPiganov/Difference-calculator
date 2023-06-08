import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  const tree = keys.map((key) => {
    if (!_.has(object2, key)) {
      return { name: key, status: 'deleted', value: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { name: key, status: 'added', value: object2[key] };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { name: key, status: 'nested', children: buildTree(object1[key], object2[key]) };
    }
    if (_.isEqual(object1[key], object2[key]) === true) {
      return { name: key, status: 'unchanged', value: object1[key] };
    }
    return {
      name: key, status: 'changed', value1: object1[key], value2: object2[key],
    };
  });
  return tree;
};
export default buildTree;
