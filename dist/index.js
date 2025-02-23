"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
(0, app_1.createApp)().then((app) => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map