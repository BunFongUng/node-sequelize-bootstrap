import authenticationRoutes from "../app/api/authentication/authentication.route";

export default (app) => {
  app.use("/v1/authentication", authenticationRoutes);
};
