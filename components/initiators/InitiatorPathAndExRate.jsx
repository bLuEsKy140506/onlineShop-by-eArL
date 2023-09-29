import InitiatorAndConvertList from "./InitiatorAndConvertList";

export default async function InitiatorPathAndExchangeRate() {
  //THIS DATA IS STATIC BECAUSE THE API HAS LIMITED USAGE/CONSUMPTION FOR FREE USERS
  //SO I DECIDED TO TAKE THE LATEST DATA THEN MANUALLY INPUT HERE
  /*
  {
  "success": true,
  "timestamp": 1695996184,
  "base": "EUR",
  "date": "2023-09-29",
  "rates": {
    "USD": 1.057692,
    "AUD": 1.635395,
    "CAD": 1.425806,
    "PLN": 4.624794,
    "MXN": 18.378749,
    "PHP": 59.828868
  }
}
  
  */
  const presetCurrency = {
    AUD: 1.635395,
    CAD: 1.425806,
    EUR: 1,
    MXN: 18.378749,
    PHP: 59.828868,
    PLN: 4.624794,
    USD: 1.057692,
  };

  // const presetCurrency = data.rates;

  return (
    <>
      <div className="filter-section">
        <InitiatorAndConvertList data={presetCurrency} />
        {/* <ConvertList1 data={presetCurrency} /> */}
      </div>
    </>
  );
}

// async function getData() {
//   const res = await fetch(
//     "http://data.fixer.io/api/latest?access_key=705ba7415f31dde1c5a4e82c1bc453e9&symbols=USD,PHP,AUD,CAD,PLN,MXN,EUR&format=1"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }
