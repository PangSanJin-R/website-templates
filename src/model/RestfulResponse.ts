export class RestfulResponse<T = any> {
    code: any;
    msg: string;
    data: T;
    recordsTotal?: number;
    recordsFiltered?: number;
    validator?: any;
    constructor(
        options: {
            code?: any;
            msg?: string;
            recordsTotal?: number;
            recordsFiltered?: number;
            data?: T;
            validator?: any;
        } = {}
    ) {
        this.code = options.code;
        this.msg = options.msg || "";
        this.data = options.data as any;
        this.recordsTotal = options.recordsTotal || 0;
        this.recordsFiltered = options.recordsFiltered || 0;
        this.validator = options.validator || {};
    }
}
