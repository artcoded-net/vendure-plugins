import { Order } from "@vendure/core";
import { getOrderWeight } from "../utils";

export const orderValueGreaterThan = ({
  order,
  orderMinimum,
}: {
  order: Order;
  orderMinimum?: number;
}) => (orderMinimum ? order.totalWithTax >= orderMinimum : true);

export const orderWeightLessThan = ({
  order,
  maximumWeight,
}: {
  order: Order;
  maximumWeight?: number;
}) => {
  const orderWeight = getOrderWeight(order, "kg");
  return maximumWeight ? orderWeight <= maximumWeight : true;
};
