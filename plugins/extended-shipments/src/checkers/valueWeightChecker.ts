/**
 * Checks if the total order value is over a certain min threshold AND at the same time the total weight is under a max threshold.
 */

import { LanguageCode, ShippingEligibilityChecker } from "@vendure/core";
import { orderWeightLessThan, orderValueGreaterThan } from "./functions";
import { minimumValue, maximumWeight } from "./args";

export const valueWeightShippingEligibilityChecker =
  new ShippingEligibilityChecker({
    code: "value-shipping-eligibility-checker",
    description: [
      {
        languageCode: LanguageCode.en,
        value: "Shipping Eligibility Checker based on order value and weight",
      },
      {
        languageCode: LanguageCode.it,
        value: "Filtra in base al valore e al peso dell'ordine",
      },
    ],
    args: {
      orderMinimum: minimumValue,
      maximumWeight,
    },
    check: (ctx, order, args) => {
      const { orderMinimum, maximumWeight } = args;
      return (
        orderValueGreaterThan({ order, orderMinimum }) &&
        orderWeightLessThan({ order, maximumWeight })
      );
    },
  });
