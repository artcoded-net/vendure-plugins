import { LanguageCode, ShippingEligibilityChecker } from "@vendure/core";
import { getOrderWeight } from "../utils";

export const weightShippingEligibilityChecker = new ShippingEligibilityChecker({
  code: "weight-shipping-eligibility-checker",
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Shipping Eligibility Checker based on total parcel weight",
    },
    {
      languageCode: LanguageCode.it,
      value: "Filtra in base al peso totale dell'ordine",
    },
  ],
  args: {
    maximumWeight: {
      type: "int",
      ui: { component: "number-form-input", options: { suffix: "kg" } },
      label: [
        { languageCode: LanguageCode.en, value: "Maximum order weight" },
        { languageCode: LanguageCode.it, value: "Peso massimo dell'ordine" },
      ],
      description: [
        {
          languageCode: LanguageCode.en,
          value:
            "Order is eligible only if its total weight is at most equal to this value",
        },
        {
          languageCode: LanguageCode.it,
          value:
            "L'ordine è adatto a questo metodo di spedizione solo se il suo peso totale è al massimo pari a questo",
        },
      ],
    },
  },
  check: (ctx, order, args) => {
    const { maximumWeight } = args;
    const orderWeight = getOrderWeight(order, "kg");
    return orderWeight <= maximumWeight;
  },
});
