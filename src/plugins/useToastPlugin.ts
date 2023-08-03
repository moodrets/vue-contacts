import { RDToast } from "@/libs/toast";
import { Plugin } from "vue";
import { getCurrentInstance } from "vue";

export const toastPlugin: Plugin = {
    install(app) {
        app.config.globalProperties.$toast =  new RDToast({
            hideOnClick: true,
            position: 'bottom-right'
        })
    }
}

export const useToast = (): RDToast | null => {
    const app = getCurrentInstance();
    return app?.appContext.config.globalProperties.$toast
}