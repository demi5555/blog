import { toast } from "vue3-toastify";
import router from "@/router";

export const nofity = {

    success(text, location){
        return toast.success(text, {
            autoClose: 2000,
            onClose: () => {
                if (location) {
                    router.push(location)
                }
            }
        })
    },

    error(text){
        return toast.error(text, {
            autoClose: 2000
        })
    }

}
