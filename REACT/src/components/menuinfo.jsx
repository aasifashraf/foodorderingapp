import { useEffect, useState } from "react";
import ShimmerUI from "../constant/shimmerUI";
import { menuinfoapilink } from "../constant/URL.JSX";
import { useParams } from "react-router-dom";

const InfoMenu = () => {
  const [Apicall, setApicall] = useState(null);
  const [offers, setoffers] = useState(null);
  const [otheroffers, setotheroffers] = useState(null);

  const { resId } = useParams();
  console.log(useParams());

  useEffect(() => {
    infoApi();
  }, []);
  const infoApi = async () => {
    const infofetch = await fetch(menuinfoapilink + resId);
    const infoJson = await infofetch.json();
    console.log(infoJson.data);
    setApicall(infoJson.data);
    setoffers(
      infoJson?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.offers || {}
    );
    setotheroffers(
      infoJson?.data?.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card
        .card.itemCards || {}
    );
    //   console.log(
    //     infoJson?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]
    //       ?.card?.card
    //   );
  };
  if (Apicall == null) return <ShimmerUI />;
  const {
    name,
    cuisines,
    costForTwo,
    areaName,
    avgRating,
    feeDetails,
    sla,
    totalRatingsString,
  } = Apicall?.cards[0]?.card?.card?.info;

  return (
    <div className="topdiv">
      <div className="all">
        <div className="topsec">
          <div className=" infowrap">
            <div className="heading">
              <h1>{name}</h1>
            </div>
            <div>
              <p>{cuisines.join(", ")}</p>
            </div>
            <div className="addressdistance">
              <p>{areaName}</p>
              <p>{sla.lastMileTravel + " km"}</p>
            </div>
          </div>
          <div className="rating">
            <div className="ratingdiv">
              <i className="fa-solid fa-star"></i>
              <p className="ratingnbr">{avgRating}</p>
            </div>
            <p>{totalRatingsString}</p>
          </div>
        </div>
        <div className="middlesec">
          <p>{feeDetails.message}</p>
        </div>
        <div className="timecost">
          <div className="time">
            <i className="fa-solid fa-clock"></i>
            <p>{" " + sla.deliveryTime + " Mins"}</p>
          </div>
          <div className="cost">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <p>{costForTwo / 100}</p>
          </div>
        </div>
        <div className="alloffers">
          {offers.map((offercards) => (
            <div className="offers">
              <div className="offersec">
                <p>{offercards.info?.header}</p>
              </div>
              <div className="offersecbtm">
                <p>{offercards.info?.couponCode}</p>
                <p>{offercards.info?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="otheroffers">
          {otheroffers?.map((offers) => (
            <div className="banner" key={offers?.card?.info?.id}>
              <p>{offers?.card?.info?.name}</p>
              <p>
                {"₹ " +
                  (offers.card?.info?.defaultPrice
                    ? offers.card?.info?.defaultPrice / 100
                    : offers.card?.info?.price / 100)}
              </p>
              {/* {console.log(offers?.card?.info)} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;
