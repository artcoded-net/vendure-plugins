import { LanguageCode, ShippingEligibilityChecker } from "@vendure/core";
import { getOrderWeight } from "../utils";

export const valueWeightShippingEligibilityChecker =
  new ShippingEligibilityChecker({
    code: "value-shipping-eligibility-checker",
    description: [
      {
        languageCode: LanguageCode.en,
        value: "Value Based Shipping Eligibility Checker",
      },
      {
        languageCode: LanguageCode.it,
        value: "Filtra in base al valore dell'ordine",
      },
    ],
    args: {
      orderMinimum: {
        required: false,
        type: "int",
        config: { inputType: "money" },
        ui: { component: "currency-form-input" },
        label: [
          { languageCode: LanguageCode.en, value: "Minimum order value" },
          { languageCode: LanguageCode.it, value: "Valore minimo dell'ordine" },
        ],
        description: [
          {
            languageCode: LanguageCode.en,
            value:
              "Order is eligible only if its total is greater or equal to this value",
          },
          {
            languageCode: LanguageCode.it,
            value:
              "L'ordine è adatto a questo metodo di spedizione solo se il suo valore è almeno pari a questo",
          },
        ],
      },
      maximumWeight: {
        required: false,
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
      const { orderMinimum, maximumWeight } = args;
      const orderWeight = getOrderWeight(order, "kg");
      const valueCheck = orderMinimum
        ? order.totalWithTax >= orderMinimum
        : true;
      const weightCheck = maximumWeight ? orderWeight <= maximumWeight : true;
      return valueCheck && weightCheck;
    },
  });
