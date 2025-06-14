import React from "react";
import CondominiumInformationFooter from "./condominium-information-footer";
import CondominiumInformationItems from "./condominium-information-items";

export default function CondominiumInformation() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="my-10">
        <h2 className="text-3xl font-semibold">Condominiums information</h2>
        <CondominiumInformationItems />
      </div>
      <CondominiumInformationFooter />
    </div>
  );
}
