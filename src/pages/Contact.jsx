import { useState, useEffect } from "react";
import { useParams, useSearchParamas, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandLord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setLandLord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.landlordId]);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>

        {landlord !== null && (
          <main>
            <div className="contactLandlord">
              <p className="landLordName">Contact {landlord?.name}</p>
            </div>
          </main>
        )}
      </header>
    </div>
  );
}

export default Contact;
