const x = 3;
const y = 2;
const z = 1;
const gData = [];
const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;
    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({
            label: key + '-label',
            value: key + '-value',
            key
        });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const __level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(__level, key, tns[index].children);
    });
};
generateData(z);

let generateTreeNodes = (treeNode) => {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({ label: `${key}-${i}-label`, value: `${key}-${i}-value`, key: `${key}-${i}` });
    }
    return arr;
};

let setLeaf = (treeData, curKey, level) => {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
                curKey.indexOf(item.key) !== 0) {
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
};

let getNewTreeData = (treeData, curKey, child, level) => {
    const loop = (data) => {
        if (level < 1 || curKey.length - 3 > level * 2) {
            return;
        }
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
    setLeaf(treeData, curKey, level);
};

let loopData = (data, callback) => {
    const loop = (d, level = 0) => {
        d.forEach((item, index) => {
            const pos = `${level}-${index}`;
            if (item.children) {
                loop(item.children, pos);
            }
            callback(item, index, pos);
        });
    };
    loop(data);
};

let isInclude = (smallArray, bigArray) => {
    return smallArray.every((ii, i) => {
        return ii === bigArray[i];
    });
};

let getFilterValue = (val, sVal, delVal) => {
    const allPos = [];
    const delPos = [];
    loopData(gData, (item, index, pos) => {
        if (sVal.indexOf(item.value) > -1) {
            allPos.push(pos);
        }
        if (delVal.indexOf(item.value) > -1) {
            delPos.push(pos);
        }
    });
    const newPos = [];
    delPos.forEach((item) => {
        const nArr = item.split('-');
        allPos.forEach((i) => {
            const iArr = i.split('-');
            if (item === i ||
                nArr.length > iArr.length && isInclude(iArr, nArr) ||
                nArr.length < iArr.length && isInclude(nArr, iArr)) {

                return;
            }
            newPos.push(i);
        });
    });
    const newVal = [];
    if (newPos.length) {
        loopData(gData, (item, index, pos) => {
            if (newPos.indexOf(pos) > -1) {
                newVal.push(item.value);
            }
        });
    }
    return newVal;
};

export { gData, getNewTreeData, generateTreeNodes, getFilterValue };
