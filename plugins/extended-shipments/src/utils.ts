import { Order, OrderLine } from "@vendure/core";
import { WeightUnit } from "./types";

export const getOrderWeight: (order: Order, resultUnit: WeightUnit) => number =
  (order, resultUnit) =>
    order.lines
      .map((line: OrderLine) => {
        const lineWeightUoM = (line.productVariant.customFields as any)
          .weightUoM;
        const lineWeight =
          (line.productVariant.customFields as any).weight ?? 0;
        if (lineWeightUoM === resultUnit) return lineWeight * line.quantity;
        else {
          if (lineWeightUoM === "g") return (lineWeight / 1000) * line.quantity;
          else if (lineWeightUoM === "kg")
            return lineWeight * 1000 * line.quantity;
        }
        return 0;
      })
      .reduce((total, lineWeight) => total + lineWeight, 0);
