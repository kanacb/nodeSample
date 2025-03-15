// todos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "todos";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const schema = new Schema(
    {
      title: { type: String, required: true, max: 150 },
      task: { type: String },
      decription: { type: String },
      completed: { type: Boolean, default: false },
      status: {
        type: String,
        enum: [
          "new",
          "open",
          "pending",
          "delayed",
          "completed",
          "closed",
          "cancelled",
        ],
        default: "new",
      },
      userId: { type: [Schema.Types.ObjectId], ref: "users", required: true },
      duration: { type: Number, default: 1 },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
