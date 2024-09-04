import {
    allRequirements,
    getRequirement,
    greeting,
    postRequirement,
  } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import router from "./user.Routes.js";


router.post(
    "/postRequirement",
    upload.fields([
      { name: "documents", maxCount: 1 },
      { name: "cover_Img", maxCount: 1 },
    ]),
    postRequirement
  );
  
  router.post(
    "/getRequirement",
    upload.fields([
      { name: "documents", maxCount: 1 },
      { name: "cover_Img", maxCount: 1 },
    ]),
    getRequirement
  );
  
  router.get("/allRequirements", allRequirements);
  router.get("/greeting", greeting);

  export default router