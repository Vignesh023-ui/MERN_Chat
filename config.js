import path from "path";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";

const configEnv = () => {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
};

const configMorgan = () => {
  return morgan("dev");
};

const configHelmet = () => {
  return helmet.contentSecurityPolicy({
    directives: {
      // * Allow resources only from the same domain
      defaultSrc: ["'self'"],

      // * Allow scripts and styles
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],

      // * Allow images from Cloudinary
      imgSrc: ["'self'", "https://res.cloudinary.com"],

      // * Allow API connections
      connectSrc: ["'self'"],
      upgradeInsecureRequests: [],
    },
  });
};

export { configEnv, configMorgan, configHelmet };
