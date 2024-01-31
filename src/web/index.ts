import { Application } from "@hotwired/stimulus";
import BezzyController from "./controllers/bezzy_controller";
import "./monaco_environment";
import "./index.css";

const application = Application.start();
application.register("bezzy", BezzyController);
application.debug = true;
