import { FC } from "react";
import { Sort } from "../../components/filtersPanel";
import { Airlines } from "../../components/filtersPanel/Airlines";
import { Filter } from "../../components/filtersPanel/Filter";
import { Price } from "../../components/filtersPanel/Price";
import { IAirline, IPriceFilter, Styles } from "../../types";

const useStyles = (): Styles => ({
  root: {
    position: "fixed",
    padding: "10px 20px",
    height: "100%",
    width: "25%",
  },
});

interface FiltersPanelProps {
  airlines: IAirline[];
  handleSortFlights: (sortConfig: string) => void;
  sort?: string;
  setSort: (sort: string) => void;
  priceFilter: IPriceFilter;
  setPriceFilter: (priceFilter: IPriceFilter) => void;
  transferFilter: number[];
  setTransferFilter: (tranfers: number[]) => void;
  airlinesFilter: string[];
  setAirlinesFilter: (selectedAirlines: string[]) => void;
}

export const FiltersPanel: FC<FiltersPanelProps> = ({
  handleSortFlights,
  airlines,
  sort,
  setSort,
  priceFilter,
  setPriceFilter,
  transferFilter,
  setTransferFilter,
  airlinesFilter,
  setAirlinesFilter,
}) => {
  const styles = useStyles();

  return (
    <div style={styles.root}>
      <Sort
        sort={sort}
        setSort={setSort}
        handleSortFlights={handleSortFlights}
      />
      <Filter
        transferFilter={transferFilter}
        setTransferFilter={setTransferFilter}
      />
      <Price priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
      <Airlines
        airlines={airlines}
        airlinesFilter={airlinesFilter}
        setAirlinesFilter={setAirlinesFilter}
      />
    </div>
  );
};
