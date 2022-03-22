import { FC } from "react";
import { IAirline, Styles } from "../../../types";

const useStyles = (): Styles => ({
  title: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 15,
  },
  airlines: {
    display: "flex",
  },
  checkbox: {
    margin: 0,
  },
  caption: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "70%",
  },
  price: {
    justifySelf: "end",
  },
});

interface AirlinesProps {
  airlines: IAirline[];
  airlinesFilter: string[];
  setAirlinesFilter: (selectedAirlines: string[]) => void;
}

export const Airlines: FC<AirlinesProps> = ({
  airlines,
  airlinesFilter,
  setAirlinesFilter,
}) => {
  const styles = useStyles();

  const handleAirlines = (selectedAirline: string) => {
    if (airlinesFilter.find((airline) => selectedAirline === airline)) {
      return setAirlinesFilter(
        airlinesFilter.filter((airline) => airline !== selectedAirline)
      );
    }
    setAirlinesFilter([...airlinesFilter, selectedAirline]);
  };

  return (
    <div>
      <p style={styles.title}>Авиакомпании</p>
      {airlines.map((airline) => (
        <div key={airline.caption} style={styles.airlines}>
          <input
            style={styles.checkbox}
            type='checkbox'
            onChange={() => handleAirlines(airline.caption)}
          />
          <p style={styles.caption}>{` - ${airline.caption}`}</p>
          <p style={styles.price}>от {airline.bestPrice}</p>
        </div>
      ))}
    </div>
  );
};
