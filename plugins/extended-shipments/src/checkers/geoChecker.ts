import {
  ShippingEligibilityChecker,
  LanguageCode,
  Zone,
  TransactionalConnection,
  Injector,
  Country,
} from "@vendure/core";
import { orderWeightLessThan, orderValueGreaterThan } from "./functions";
import { minimumValue, maximumWeight } from "./args";

let connection: TransactionalConnection;

const getZoneMembers = (zoneName: string) => {
  return connection
    .getRepository(Zone)
    .findOne(
      { name: zoneName },
      {
        relations: ["members"],
      }
    )
    .then((zone) => {
      if (zone) return zone.members;
    });
};

export const orderGeoChecker = new ShippingEligibilityChecker({
  init: async (injector: Injector) => {
    connection = injector.get(TransactionalConnection);
  },
  code: "order-geo-checker",
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Location based",
    },
    {
      languageCode: LanguageCode.it,
      value: "Criterio geografico",
    },
  ],
  args: {
    zones: {
      type: "string",
      ui: { component: "zone-selector" },
      list: true,
      label: [
        {
          languageCode: LanguageCode.en,
          value: "Applicable Zone",
        },
        {
          languageCode: LanguageCode.it,
          value: "Zona applicabile",
        },
      ],
    },
    countries: {
      type: "string",
      ui: { component: "country-selector" },
      list: true,
      label: [
        {
          languageCode: LanguageCode.en,
          value: "Country name",
        },
        {
          languageCode: LanguageCode.it,
          value: "Nome nazione",
        },
      ],
    },
    orderMinimum: minimumValue,
    maximumWeight,
  },
  check: async (ctx, order, args) => {
    const { orderMinimum, maximumWeight, zones, countries } = args;
    if (
      !orderValueGreaterThan({ order, orderMinimum }) ||
      !orderWeightLessThan({ order, maximumWeight })
    )
      return false;
    const argZones = zones.filter((zone) => zone !== ""); // zone names
    const argCountries = countries.filter((country) => country !== ""); // country codes
    const orderCountry = order.shippingAddress.countryCode; // order countrycode
    if (!orderCountry) return false;

    //check if (at least one) selected zone contains the order country
    if (argZones && argZones.length > 0) {
      // Create an array containing countries in args zones
      for (let zone of argZones) {
        const zoneMembers = (await getZoneMembers(zone))?.filter(
          (country) => country.enabled
        );
        const zoneMembersCodes =
          zoneMembers?.map((country: Country) => country.code) || [];
        const matchingCountry = zoneMembersCodes.find(
          (country) => orderCountry === country
        );
        if (matchingCountry) {
          return true;
        }
      }
    }

    //TODO: filtrare le argCountries togliendo quelle disabilitate

    // zones condition is not satisfied... now checking country conditions
    if (argCountries && argCountries.length > 0) {
      const matchingCountry = argCountries.find(
        (country) => orderCountry === country
      );
      if (matchingCountry) {
        return true;
      }
    }
    if (!argZones && !argCountries) return true;
    // Didn't find any matching area
    return false;
  },
});
