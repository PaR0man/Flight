import React, { FC } from "react";
import { FlightItem } from "../../components";
import { IFlight, Styles } from "../../types";

const useStyles = (): Styles => ({
  root: {
    marginLeft: "25%",
    padding: "20px 50px",
    height: "100%",
    width: "75%",
  },
});

interface FlightListProps {
  flights: IFlight[];
}

export const FlightList: FC<FlightListProps> = ({ flights }) => {
  const styles = useStyles();

  return (
    <div style={styles.root}>
      {flights.map((flight, index) => (
        <FlightItem key={index} flight={flight} />
      ))}
    </div>
  );
};
