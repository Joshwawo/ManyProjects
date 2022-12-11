import { Router } from "express";
import {
  agua,
  root,
  salsaServies,
  lecheServices,
  panCtrl,
  manzanaCtrl,
  peraCtrl,
  platanoCtrl,
  uvaCtrl,
  papaCtrl,
  papaFilesCtrl,
} from "../controllers/aguaCtrl";

const router = Router();

router.get("/", root);
router.get("/agua", agua);
router.get("/salsa", salsaServies);
router.get("/leche", lecheServices);
router.get("/pan", panCtrl);
router.get("/webp/:imagen", manzanaCtrl);
router.get("/urls", peraCtrl);
router.get("/platano", platanoCtrl);
router.get("/uva", uvaCtrl);
//ciberdrop
router.get("/papa", papaCtrl);
router.get("/papa/:imagen", papaFilesCtrl);

export { router };
