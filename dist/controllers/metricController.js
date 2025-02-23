"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricController = void 0;
class MetricController {
    constructor(metricService) {
        this.metricService = metricService;
    }
    getMetrics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const metrics = yield this.metricService.getMetrics();
                return res.json(metrics);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    ;
}
exports.MetricController = MetricController;
//# sourceMappingURL=metricController.js.map