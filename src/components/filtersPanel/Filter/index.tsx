import React, { FC } from "react";
import { Styles } from "../../../types";

const useStyles = (): Styles => ({
  root: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 14,
  },
  checkbox: {
    margin: 0,
  },
  option: {
    fontSize: 14,
  },
});

interface FilterProps {
  transferFilter: number[];
  setTransferFilter: (tranfers: number[]) => void;
}

export const Filter: FC<FilterProps> = ({
  transferFilter,
  setTransferFilter,
}) => {
  const styles = useStyles();
  const transfers = ["- 1 пересадка", "- без пересадки"];

  const handleTransfer = (selectedTransferCount: number) => {
    if (selectedTransferCount === transfers.length) {
      selectedTransferCount = 0;
    }
    if (transferFilter.includes(selectedTransferCount)) {
      return setTransferFilter(
        transferFilter.filter(
          (tranferCount) => tranferCount !== selectedTransferCount
        )
      );
    }
    setTransferFilter([...transferFilter, selectedTransferCount]);
  };
  return (
    <div style={styles.root}>
      <p style={styles.title}>Фильтровать</p>
      {transfers.map((transfer, index) => (
        <div key={index} style={styles.option}>
          <input
            type='checkbox'
            style={styles.checkbox}
            onChange={() => handleTransfer(index + 1)}
          />
          {transfer}
        </div>
      ))}
    </div>
  );
};
