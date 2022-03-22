import { useEffect, useState } from "react";
import "./App.css";
import { FiltersPanel, FlightList } from "./containers";
import { IFlight, IPriceFilter } from "./types";
import { airlines, flights } from "./utils/servise";

function App() {
  const [sort, setSort] = useState<string>();
  const [transferFilter, setTransferFilter] = useState<number[]>([]);
  const [priceFilter, setPriceFilter] = useState<IPriceFilter>({
    min: 0,
    max: 1000000,
  });
  const [airlinesFilter, setAirlinesFilter] = useState<string[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<IFlight[]>(flights);

  const handleSortFlights = (sortConfig: string) => {
    switch (sortConfig) {
      case " - по убыванию цены":
        return setFilteredFlights(
          flights.sort((a, b) => (a.price < b.price ? 1 : -1))
        );

      case " - по возрастанию цены":
        return setFilteredFlights(
          flights.sort((a, b) => (a.price > b.price ? 1 : -1))
        );

      case " - по времени в пути":
        return setFilteredFlights(
          flights.sort((a, b) =>
            a.legs[0].duration + a.legs[1].duration >
            b.legs[0].duration + b.legs[1].duration
              ? 1
              : -1
          )
        );
      default:
        return flights;
    }
  };

  const handleFilterFlights = () => {
    if (airlinesFilter.length > 0 && transferFilter.length > 0) {
      return setFilteredFlights(
        flights.filter(
          (flight) =>
            airlinesFilter.includes(flight.airlineCaption) &&
            priceFilter.min <= flight.price &&
            flight.price <= priceFilter.max &&
            transferFilter.includes(flight.transfers)
        )
      );
    }
    if (airlinesFilter.length > 0) {
      return setFilteredFlights(
        flights.filter(
          (flight) =>
            airlinesFilter.includes(flight.airlineCaption) &&
            priceFilter.min <= flight.price &&
            flight.price <= priceFilter.max
        )
      );
    }
    if (transferFilter.length > 0) {
      return setFilteredFlights(
        flights.filter(
          (flight) =>
            flight.price <= priceFilter.max &&
            flight.price >= priceFilter.min &&
            transferFilter.includes(flight.transfers)
        )
      );
    }
    setFilteredFlights(
      flights.filter(
        (flight) =>
          flight.price <= priceFilter.max && flight.price >= priceFilter.min
      )
    );
  };

  useEffect(() => {
    handleFilterFlights();
  }, [airlinesFilter, transferFilter, priceFilter]);

  return (
    <div className='App'>
      <FiltersPanel
        handleSortFlights={handleSortFlights}
        airlines={airlines}
        sort={sort}
        setSort={setSort}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        transferFilter={transferFilter}
        setTransferFilter={setTransferFilter}
        airlinesFilter={airlinesFilter}
        setAirlinesFilter={setAirlinesFilter}
      />
      <FlightList flights={filteredFlights} />
    </div>
  );
}

export default App;
