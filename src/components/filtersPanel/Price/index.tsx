import { FC } from "react";
import { IPriceFilter, Styles } from "../../../types";

const useStyles = (): Styles => ({
  root: {
    marginBottom: 15,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
  },
  options: {
    fontSize: 14,
    margin: "15px 0 0",
  },
});

interface PriceProps {
  priceFilter: IPriceFilter;
  setPriceFilter: (priceFilter: IPriceFilter) => void;
}

export const Price: FC<PriceProps> = ({ priceFilter, setPriceFilter }) => {
  const styles = useStyles();
  return (
    <div style={styles.root}>
      <p style={styles.title}>Цена</p>
      <div style={styles.options}>
        От
        <input
          type='number'
          value={priceFilter.min}
          onChange={(event) =>
            setPriceFilter({ ...priceFilter, min: Number(event.target.value) })
          }
        />
      </div>
      <div style={styles.options}>
        До
        <input
          value={priceFilter.max}
          type='number'
          onChange={(event) =>
            setPriceFilter({ ...priceFilter, max: Number(event.target.value) })
          }
        />
      </div>
    </div>
  );
};
