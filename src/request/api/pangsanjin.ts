// 测试实例
import { MethodType } from "@/request/enum/method-type.enum";
import { HeaderType } from "@/request/enum/header-type.enum";
import config from "@/config/api.config";

const pangsanjinTest = config.baseUrl.dev + "/test";
const testController = {
    /** 登录路由 */
    userLogin: {
        url: pangsanjinTest + "/userLogin",
        method: MethodType.POST.code,
        header: HeaderType.AUTH.code
    }
};
export default testController;
