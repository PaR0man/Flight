import moment from "moment";
import { FC } from "react";
import { IFlight, Styles } from "../../../types";

moment.updateLocale("ru", null);

const useStyles = (): Styles => ({
  root: { marginBottom: 20 },
  head: {
    padding: 10,
    backgroundColor: "#0087c9",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prisePosition: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  spans: {
    color: "#00b8ed",
  },
  price: {
    fontSize: 21,
  },
  adult: {
    fontSize: 14,
  },
  locations: {
    fontSize: 18,
    padding: "5px 20px",
  },
  locationDivider: {
    marginTop: 0,
    width: "97%",
  },
  time: {
    margin: 5,
    display: "flex",
    justifyContent: "space-between",
  },
  transfer: {
    display: "flex",
    justifyContent: "center",
  },

  transferCounter: {
    color: "#ffb168",
    position: "absolute",
    alignSelf: "center",
    zIndex: 99999,
    backgroundColor: "white",
    padding: 5,
  },
  transferDivider: {
    width: "95%",
  },
  legDivider: {
    margin: "10px 0px",
  },
  select: {
    marginTop: 5,
    fontSize: 21,
    width: "100%",
    color: "white",
    padding: 10,
    backgroundColor: "#ffb168",
    border: "none",
  },
});

interface FlightItemProps {
  flight: IFlight;
}

export const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const styles = useStyles();

  return (
    <div style={styles.root}>
      <div style={styles.head}>
        <img src='' alt='logo' />
        <div style={styles.prisePosition}>
          <p style={styles.price}>{flight.price}р</p>
          <p style={styles.adult}>Стоимость для одного взрослого пассажира</p>
        </div>
      </div>

      {flight.legs.map((leg, index) => (
        <div key={index}>
          <p style={styles.locations}>
            {`${leg.departureCity}, ${leg.departureAirport} `}
            <span style={styles.spans}>({leg.departureAirportUid}) </span>
            ==&gt; {`${leg.arrivalCity}, ${leg.arrivalAirport} `}
            <span style={styles.spans}>({leg.arrivalAirportUid})</span>
          </p>
          <hr style={styles.locationDivider} />

          <div style={styles.time}>
            <p>
              {moment(leg.departureTime).format("HH:mm")}
              <span style={styles.spans}>
                {moment(leg.departureTime).format(" D MMM. dd")}
              </span>
            </p>
            <p>
              {moment
                .utc(leg.arrivalTime.diff(leg.departureTime))
                .format("H ч, mm мин")}
            </p>
            <p>
              <span style={styles.spans}>
                {moment(leg.arrivalTime).format("D MMM. dd ")}
              </span>
              {moment(leg.arrivalTime).format("HH:mm")}
            </p>
          </div>

          <div style={styles.transfer}>
            {leg.segments > 1 && (
              <p style={styles.transferCounter}>{leg.segments - 1} пересадка</p>
            )}
            <hr style={styles.transferDivider} />
          </div>
          {index !== flight.legs.length - 1 && (
            <hr color='blue' style={styles.legDivider} />
          )}
        </div>
      ))}
      <p>Рейс выполняет: {flight.airlineCaption}</p>
      <button style={styles.select}>Выбрать</button>
    </div>
  );
};
