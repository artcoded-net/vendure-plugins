import {
  PluginCommonModule,
  VendurePlugin,
  RuntimeVendureConfig,
} from "@vendure/core";
import ProductVariantCustomFields from "./custom-fields";
import path from "path";
import { orderGeoChecker } from "./checkers/geoChecker";
import { AdminUiExtension } from "@vendure/ui-devkit/compiler";
import { valueShippingEligibilityChecker } from "./checkers/valueEligibility";
import { flatRateShippingCalculator } from "./calculators/flatrateCalculator";
import { weightShippingCalculator } from "./calculators/weightCalculator";
import { weightShippingEligibilityChecker } from "./checkers/weightEligibility";

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => ExtendedShipmentsPlugin.configure(config),
})
export class ExtendedShipmentsPlugin {
  constructor() {}

  static async configure(
    config: RuntimeVendureConfig
  ): Promise<RuntimeVendureConfig> {
    config.customFields.ProductVariant.push(...ProductVariantCustomFields!);
    config!.shippingOptions!.shippingEligibilityCheckers!.push(
      valueShippingEligibilityChecker
    );
    config!.shippingOptions!.shippingEligibilityCheckers!.push(orderGeoChecker);
    config!.shippingOptions!.shippingEligibilityCheckers!.push(
      weightShippingEligibilityChecker
    );
    config!.shippingOptions!.shippingCalculators!.push(
      weightShippingCalculator
    );
    config!.shippingOptions!.shippingCalculators!.push(
      flatRateShippingCalculator
    );
    return config;
  }

  // Note: we need to point to source files, as ui extension ts files are not compiled by the plugin, but by the Angular CLI (via compile script)
  static uiExtension: AdminUiExtension = {
    extensionPath: path.join(__dirname, "../src/ui"),
    ngModules: [
      {
        type: "shared",
        ngModuleFileName: "geo-selector.module.ts",
        ngModuleName: "GeoSelectorModule",
      },
    ],
  };
}
