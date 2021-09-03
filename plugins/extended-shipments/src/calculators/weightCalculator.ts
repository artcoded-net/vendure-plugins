import {
  LanguageCode,
  CalculateShippingFn,
  ShippingCalculator,
  OrderLine,
} from "@vendure/core";
import { ConfigArgs } from "@vendure/core/dist/common/configurable-operation";
import { WeightUnit } from "../types";
import { getOrderWeight } from "../utils";

type WeightShippingCalculatorArgs = {
  weightUoM: {
    type: "string";
    ui: {
      component: string;
      options: {
        value: string;
      }[];
    };
    label: (
      | {
          languageCode: LanguageCode;
          value: string;
        }
      | {
          languageCode: LanguageCode;
          value: string;
        }
    )[];
  };
  minWeights: {
    type: "float";
    list: boolean;
    ui: {
      component: string;
    };
    label: (
      | {
          languageCode: LanguageCode;
          value: string;
        }
      | {
          languageCode: LanguageCode;
          value: string;
        }
    )[];
  };
  correspondingPrices: {
    type: "float";
    list: boolean;
    ui: {
      component: string;
    };
    label: (
      | {
          languageCode: LanguageCode;
          value: string;
        }
      | {
          languageCode: LanguageCode;
          value: string;
        }
    )[];
  };
  defaultPrice: {
    type: "float";
    ui: {
      component: string;
    };
    label: (
      | {
          languageCode: LanguageCode;
          value: string;
        }
      | {
          languageCode: LanguageCode;
          value: string;
        }
    )[];
  };
  taxRate: {
    type: "float";
    ui: {
      component: string;
      suffix: string;
    };
    label: (
      | {
          languageCode: LanguageCode.en;
          value: string;
        }
      | {
          languageCode: LanguageCode.it;
          value: string;
        }
    )[];
  };
};

const calculateWeightBasedShippingCost: CalculateShippingFn<WeightShippingCalculatorArgs> =
  async (ctx, order, args) => {
    const {
      weightUoM,
      minWeights,
      correspondingPrices,
      defaultPrice,
      taxRate,
    } = args;
    // get products' custom fields (weight ecc.) from order and calculate total
    const totalWeight = getOrderWeight(order, weightUoM as WeightUnit);
    const sortedWeights = (minWeights as any as number[]).sort(
      (a: number, b: number) => a - b
    ); //ordino i pesi in ordine crescente
    const sortedPrices = (correspondingPrices as any as number[]).sort(
      (a: number, b: number) => a - b
    ); //ordino i prezzi in ordine crescente
    let shipmentPrice: number | undefined = undefined;
    for (let i = sortedWeights.length - 1; i >= 0; i--) {
      const currentWeight = Number.isNaN(sortedWeights[i])
        ? 0
        : sortedWeights[i];
      // comincio dal peso più alto
      if (totalWeight >= currentWeight) {
        shipmentPrice = sortedPrices[i];
        break; //esci dal ciclo for
      }
    }

    const price = shipmentPrice ? shipmentPrice : defaultPrice;

    return {
      price,
      taxRate,
      priceIncludesTax: ctx.channel.pricesIncludeTax,
      metadata: {
        // penso nulla
      },
    };
  };

export const weightShippingCalculator = new ShippingCalculator({
  code: "weight-shipping-calculator",
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Based on parcel weight",
    },
    {
      languageCode: LanguageCode.it,
      value: "Peso della spedizione",
    },
  ],
  args: {
    weightUoM: {
      type: "string",
      ui: {
        component: "select-form-input",
        options: [{ value: "g" }, { value: "kg" }],
      },
      label: [
        {
          languageCode: LanguageCode.en,
          value: "The weight unit of measure",
        },
        {
          languageCode: LanguageCode.it,
          value: "Unità di misura per il peso",
        },
      ],
    },
    minWeights: {
      //Il minimo peso a partire da cui è applicato il relativo prezzo
      type: "float",
      list: true,
      ui: { component: "number-form-input", min: 0 },
      label: [
        {
          languageCode: LanguageCode.en,
          value:
            "The minimum weight thresholds that determine which price to apply to the shipment",
        },
        {
          languageCode: LanguageCode.it,
          value:
            "Le soglie di peso minimo che determinano le fasce di prezzo da applicare alla spedizione",
        },
      ],
    },
    correspondingPrices: {
      //Applico il prezzo i se il peso è almeno pari a i e non c'è una fascia più prossima
      type: "float",
      list: true,
      ui: { component: "currency-form-input" },
      label: [
        {
          languageCode: LanguageCode.en,
          value:
            "The shipment prices to apply (for example price number 1 is applied if the parcel weight is at least equal to the weight threshold number 1, but less than the threshold number 2. Please note all values are sorted in ascending order!",
        },
        {
          languageCode: LanguageCode.it,
          value:
            "I valori di prezzo da applicare (ad esempio il prezzo numero 1 è applicato se il peso della spedizione è almeno pari alla soglia di peso numero 1 ma inferiore alla numero 2. Nota bene: tutti i valori sono ordinati in ordine crescente!",
        },
      ],
    },
    defaultPrice: {
      type: "float",
      ui: { component: "currency-form-input" },
      label: [
        {
          languageCode: LanguageCode.en,
          value:
            "The shipment price to apply if the weight doesn't fit in any weight threshold",
        },
        {
          languageCode: LanguageCode.it,
          value:
            "Il valore di prezzo da applicare se il peso non ricade in nessuna fascia di peso specificata",
        },
      ],
    },
    taxRate: {
      type: "float",
      ui: { component: "number-form-input", min: 0, max: 100, suffix: "%" },
      label: [
        {
          languageCode: LanguageCode.en,
          value: "The shipment price tax rate to apply (optional)",
        },
        {
          languageCode: LanguageCode.it,
          value:
            "Il valore percentuale delle tasse da imporre sul prezzo di spedizione (opzionale)",
        },
      ],
    },
  },
  calculate: calculateWeightBasedShippingCost,
});
