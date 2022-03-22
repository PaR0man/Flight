import { Moment } from "moment";
import { CSSProperties } from "react";

export type Styles = Record<string, CSSProperties>;

export interface IFlightData {
  result: {
    flights: {
      flight: {
        carrier: { caption: string };
        price: {
          total: { amount: string };
          totalFeeAndTaxes: { amount: string };
        };
        legs: {
          duration: number;
          segments: {
            departureAirport: { caption: string; uid: string };
            departureCity: { caption: string };
            departureDate: string;
            arrivalAirport: { caption: string; uid: string };
            arrivalCity: { caption: string };
            arrivalDate: string;
          }[];
        }[];
      };
    }[];
  };
}

export interface IAirline {
  caption: string;
  bestPrice: number;
}

export interface ILeg {
  duration: number;
  departureAirport: string;
  departureAirportUid: string;
  departureCity?: string;
  departureTime: Moment;
  arrivalAirport: string;
  arrivalAirportUid: string;
  arrivalCity?: string;
  arrivalTime: Moment;
  segments: number;
}

export interface IFlight {
  price: number;
  airlineCaption: string;
  legs: ILeg[];
  transfers: number;
}

export interface IPriceFilter {
  min: number;
  max: number;
}
