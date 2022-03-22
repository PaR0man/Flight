import data from "../data/flights.json";
import { IAirline, IFlight, IFlightData } from "../types";
import moment from "moment";

const flightsData = data as IFlightData;

export const flights: IFlight[] = flightsData.result.flights.map(
  ({ flight }) => ({
    airlineCaption: flight.carrier.caption,
    price:
      Number(flight.price.total.amount) +
      Number(flight.price.totalFeeAndTaxes.amount),
    transfers: Math.max.apply(
      null,
      flight.legs.map((leg) => leg.segments.length - 1)
    ),
    legs: flight.legs.map((leg) => ({
      duration: leg.duration,

      departureAirport: leg.segments[0].departureAirport.caption,
      departureAirportUid: leg.segments[0].departureAirport.uid,
      departureCity: leg.segments[0].departureCity?.caption,
      departureTime: moment(leg.segments[0].departureDate),

      arrivalAirport:
        leg.segments[leg.segments.length - 1].arrivalAirport.caption,
      arrivalAirportUid:
        leg.segments[leg.segments.length - 1].arrivalAirport.uid,
      arrivalCity: leg.segments[leg.segments.length - 1].arrivalCity?.caption,
      arrivalTime: moment(leg.segments[leg.segments.length - 1].arrivalDate),

      segments: leg.segments.length,
    })),
  })
);
export let airlines: IAirline[] = [];

flights.map((flight) => {
  if (
    airlines.find(
      (airline) =>
        airline.caption === flight.airlineCaption &&
        airline.bestPrice > flight.price
    )
  ) {
    airlines = airlines.map((airline) => {
      if (airline.caption === flight.airlineCaption) {
        return { ...airline, bestPrice: flight.price };
      }
      return airline;
    });
  } else if (
    !airlines.find((airline) => airline.caption === flight.airlineCaption)
  ) {
    airlines.push({
      caption: flight.airlineCaption,
      bestPrice: flight.price,
    });
  }
});
