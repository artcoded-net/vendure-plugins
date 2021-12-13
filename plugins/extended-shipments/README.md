# Extended shipments plugin for Vendure

This plugin introduces new checkers and calculators, mostly to add geographic based filtering and pricing thresholds based on products' (and total parcels') weights, which are introduced as product custom fields.
This plugin supports by default translations in English and Italian, but of course can be easily adapted to other and more languages.
This is also a good example on how to customize Vendure's shipments logic through a plugin.

# Documentation

This plugin introduces new shipping checkers and calculators, as described below.

## Shipping price calculators

The calculators are under the ./calculators folder and are:

- a flat rate calculator
- a calculator based on the total order weight

### Flat rate calculator

This is a very simple fixed price calculation based on fixed price and fixed tax rate

### Order weight-based calculator

This custom shipping price calculator takes a weight unit of measure (weightUoM), a list of minimum weight thresholds and a corresponding list of prices to apply to each price range, plus a default pricing. So if for example:

- the weight unit is 'kg',
- the weight thresholds are [1, 3, 6],
- the corresponding prices are [10, 20, 30] and
- the default price is 5

the shipping price will be calculated as follows:

- if the order weight is 1 to 2.9 Kg, the price will be 10€,
- if the weight is 3 to 5.9 Kg the price will be 20,
- from 6 Kg and more it will be 30
- if the weight doesn't fall into any range (e.g. in this example it is under 1 Kg) the default price will be applied.

## Shipping eligibility checkers

The checkers are under the ./checkers folder with their helper functions.

### The geo checker: based on geography

Checks if the order shipping destination is among the selected zones or countries.
It's enough that the destination country is either inside one of the selected zones or corresponds to one of the selected countries: in other words, geographic conditions are evaluated with an 'or' approach.

### The checker based on order value and weight

The ValueWeightShippingEligibility checker checks if the total order value is over a certain min threshold AND at the same time the total weight is under a max threshold.

## Ui extension: the geo-selector module

In order to take the zone/country inputs from the user, the geo-checker needs the ui extension "geo-selector" located under the ./ui folder.

## Custom fields

We need to add weight and weight unit of measure to the variants as custom fields. Please not it is _not_ required that all variants use the same unit of measure: unit conversion is performed when evaluating the total order weight (see the relevant helper function in utils.ts)
