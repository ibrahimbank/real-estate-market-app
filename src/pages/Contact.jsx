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

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>

        {landlord !== null && (
          <main>
            <div className="contactLandlord">
              <p className="landLordName">Contact {landlord?.name}</p>
            </div>

            <form className="messageForm">
              <div className="messageDiv">
                <label htmlFor="message" className="messageLabel">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="textarea"
                  value={message}
                  onChange={onChange}
                ></textarea>
              </div>

              <a
                href={`mailto:${landlord.email}?Subject=${searchParams.get(
                  "listingName"
                )}&body=${message}`}
              >
                <button type="button" className="primaryButton">
                  Send Message
                </button>
              </a>
            </form>
          </main>
        )}
      </header>
    </div>
  );
}

export default Contact;
