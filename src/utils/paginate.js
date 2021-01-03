import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const itemArr = [...items];
    return itemArr.splice((pageNumber - 1)*pageSize, pageSize);
}