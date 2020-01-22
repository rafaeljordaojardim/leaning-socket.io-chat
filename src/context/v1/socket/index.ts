import router from "../../../routes";
import Controller from "./controller";
const controller = new Controller();

router.get("/veirfyUserExists", async (req, res, next) => {
   // controller.veirfyUserExists(req, res, next);
});

export default router;