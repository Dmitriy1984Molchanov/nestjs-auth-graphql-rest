import ormconfig from "../../ormconfig";

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth: {
    jwtKey: process.env.JWT_KEY,
  },
  ormconfig: {
    ...ormconfig,
    synchronize: Boolean(Number(process.env.TYPEORM_SYNCHRONIZE)) || false,
  },
});
