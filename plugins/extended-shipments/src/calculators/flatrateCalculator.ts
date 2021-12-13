/**
 * Simple shipping calculator based on a fixed price and fixed tax rate percentage
 */

import { LanguageCode, ShippingCalculator } from "@vendure/core";

export const flatRateShippingCalculator = new ShippingCalculator({
  code: "flatrate-shipping-calculator",
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Flat-Rate Shipping Calculator (default)",
    },
    {
      languageCode: LanguageCode.it,
      value: "Spedizione a prezzo fisso (default)",
    },
  ],
  args: {
    rate: {
      type: "int",
      config: { inputType: "money" },
      ui: { component: "currency-form-input" },
      label: [
        { languageCode: LanguageCode.en, value: "Shipping price" },
        { languageCode: LanguageCode.it, value: "Prezzo di spedizione" },
      ],
    },
    taxRate: {
      type: "int",
      config: { inputType: "percentage" },
      ui: { component: "number-form-input", min: 0, max: 100, suffix: "%" },
      label: [
        { languageCode: LanguageCode.en, value: "Tax rate" },
        { languageCode: LanguageCode.it, value: "Percentuale tasse" },
      ],
    },
  },
  calculate: (ctx, order, args) => {
    return {
      price: args.rate,
      taxRate: args.taxRate,
      priceIncludesTax: ctx.channel.pricesIncludeTax,
    };
  },
});
