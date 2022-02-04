import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../Firebase.config";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import ListingItems from "../component/ListingItems";

function Offers() {
  const [listings, setListings] = useState(null);

  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get refrence
        const listingRef = collection(db, "listings");

        // create a query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // execute query

        const querySnap = await getDocs(q);

        const list = [];

        querySnap.forEach((doc) => {
          return list.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(list);
        setLoading(false);
      } catch (err) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItems
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
}

export default Offers;
