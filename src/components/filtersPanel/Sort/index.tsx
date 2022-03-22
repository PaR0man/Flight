import React, { FC } from "react";
import { Styles } from "../../../types";

const useStyles = (): Styles => ({
  root: {
    marginBottom: 35,
  },
  title: {
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 14,
  },
  option: {
    fontSize: 14,
  },
  radio: {
    margin: 0,
  },
});

interface SortProps {
  sort?: string;
  setSort: (sort: string) => void;
  handleSortFlights: (sortConfig: string) => void;
}

export const Sort: FC<SortProps> = ({ sort, setSort, handleSortFlights }) => {
  const styles = useStyles();

  const sortButtons = [
    " - по возрастанию цены",
    " - по убыванию цены",
    " - по времени в пути",
  ];

  return (
    <div style={styles.root}>
      <p style={styles.title}>Сортировать</p>
      {sortButtons.map((button, index) => (
        <div key={index} style={styles.option}>
          <input
            style={styles.radio}
            type='radio'
            onChange={() => {
              handleSortFlights(button);
              setSort(button);
            }}
            checked={button === sort}
          />
          {button}
        </div>
      ))}
    </div>
  );
};
