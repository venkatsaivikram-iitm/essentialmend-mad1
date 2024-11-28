class Collector {
    constructor(opts = {}) {
        this.module = opts.module;
        this._models = [];
        this.index = opts.index || "id";
    }

    get models() {
        return this._models;
    }

    set models(models) {
        this._models = models;
    }

    get (index) {
        return this.models.find((model) => model[this.index] === index);
    }

    getAll () {
        return this.models;
    }

    add (...models) {
        if (models.length) {
            this.models.push(...models);
        }
    }

    remove (index) {
        this.models.splice(this.models.findIndex((model) => model[this.index] === index), 1);
    }
}

export { Collector };