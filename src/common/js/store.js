export function saveToLocal(id, key, value) {
let seller = window.localStorage.__seller__;
if (!seller) {
seller = {};
seller[id] = {};
} else {
seller = JSON.parse(seller);// 将一个 JSON 字符串转换为对象。
if (!seller[id]) {
seller[id] = {};
}
}
seller[id][key] = value;
window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {// def是默认的意思
let seller = window.localStorage.__seller__;
if (!seller) {
return def;
}
seller = JSON.parse(seller)[id];
if (!seller) { // seller无id，即为空时
return def;
}
let ret = seller[key];
return ret || def;
};
