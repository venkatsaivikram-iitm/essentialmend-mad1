import { $ } from "../utils/common-utils";

const MODULES_ID_CONSTANTS = {
    DASHBOARD: "dashboard",
    EXPLORE: "explore",
    COLLECTION: "collection",
    LIBRARY: "library",
    ACCOUNT: "account",
}

const MODULES_ID_LIST = ["dashboard", "explore", "collection", "library", "account"];

const MODULES_ID_COMPONENT_MAP = {};
const MODULES_COMPONENT_LIST = [];

[...MODULES_ID_LIST].forEach((module, index) => {
    const moduleComponent = $(`#bookshelf-${module}`);
    if (moduleComponent) {
        MODULES_ID_COMPONENT_MAP[module] = moduleComponent;
        MODULES_COMPONENT_LIST.push(moduleComponent);
    } else {
        MODULES_ID_LIST.splice(index, 1);
    }
})

export { MODULES_ID_CONSTANTS, MODULES_ID_LIST, MODULES_ID_COMPONENT_MAP, MODULES_COMPONENT_LIST };