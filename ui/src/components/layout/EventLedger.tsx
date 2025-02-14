import React, { useEffect, useState } from "react";
import { usePath } from '../../data/YatiReactHook';
import getDataStore from "../../data/DataStore";
import { EconomicEventShape } from "../../types/valueflows";
import EventLedgerTableRow from "./EventLedgerTableRow";

export type EventLedgerProps = {};

const EventLedger: React.FC<EventLedgerProps> = ({}) => {
  const [economicEvents, setEconomicEvents] = useState<Array<EconomicEventShape>>([]);

  const store = getDataStore();
  const economicEventObjects = usePath('root.economicEvent', store);

  useEffect(()=>{
    setEconomicEvents(Object.values(economicEventObjects));
  }, [economicEventObjects]);

  const RenderEvents = (): JSX.Element => {
    if (economicEvents.length === 0) {
      return(
        <>
          <div>No Events</div>
        </>
      );
    } else {
      const eventRows: JSX.Element[] = economicEvents.map(econEvent => {
        return(<EventLedgerTableRow key={econEvent.id} economicEvent={econEvent} />)
      });

      return (
        <>
          {eventRows}
        </>
      );
    }
  }

  return (
    <>
      <h1>Event Ledger</h1>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderEvents />
      </div>
    </>
  );
};

export default EventLedger;