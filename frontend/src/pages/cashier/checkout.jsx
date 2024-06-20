import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, alert } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";

axios.defaults.baseURL = "http://localhost:8010";

function Checkout() {
  const [editSection, seteditSection] = useState(false);

  const calcTotal = (qty, price) => {
    return qty * price;
  };

  const calcChange = (tendered, total) => {
    return tendered - total;
  };

  const calcFinalTotal = (data) => {
    let total = 0;
    data.forEach((el) => {
      total += calcTotal(el.quantity, el.unitPrice);
    });
    return total;
  };

  const [total, setTotal] = useState(0);
  const [tendered, setTendered] = useState(0);
  const [change, setChange] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [nettotal, setNettotal] = useState(0);
  const [Status, setStatus] = useState("");
  const [ordertype, setOrdertype] = useState("");
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({
    cusname: "",
    telephone: 0,
    email: "",
    grosstotal: 0,
    tendered: 0,
    change: 0,
    discount: 0,
    nettotal: 0,
  });

  const getFetchData = async () => {
    const data = await axios.get("/mainorder/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
    setTotal(calcFinalTotal(dataList));
   
      setOrdertype("Completed");
    
  }, [dataList]);

  useEffect(() => {
    const calculatedChange = calcChange(tendered, nettotal);
    setChange(calculatedChange);
  }, [nettotal, tendered]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    let updatedFormData = { ...formData };

    if (name === "tendered") {
      const tenderedValue = parseFloat(value);
      setTendered(tenderedValue);
      updatedFormData.tendered = tenderedValue;
    } else if (name === "discount") {
      const discountValue = parseFloat(value);
      const grossTotal = parseFloat(total);
      const discountAmount = (discountValue * grossTotal) / 100;
      const netTotal = grossTotal - discountAmount;
      setDiscount(discountValue);
      setNettotal(netTotal);
      updatedFormData.discount = discountValue;
      updatedFormData.nettotal = netTotal;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  // Delete all items
  const handleDelete = async (id) => {
    const data = await axios.delete("mainorder/delete/" + id);
    if (data.data.success) {
      getFetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const grossTotal = parseFloat(total);
    const discountAmount = parseFloat(discount) * (grossTotal/100);
    const netTotal = grossTotal - discountAmount;
    const changeValue = parseFloat(tendered) - netTotal;

    const updatedFormData = {
      ...formData,
      grosstotal: grossTotal,
      change: changeValue,
      discount: discount,
      nettotal: netTotal,
      ordertype:"Completed"
      
      
    };

    try {
      console.log("Submitting form data:", updatedFormData);

      const data = await axios.post("/placeorder/create/", updatedFormData);

      console.log("Response from backend:", data);

      if (data.data.success) {
        alert(data.data.message);
        getFetchData();
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  const GoBack = () => {
    window.location.href = "/cashier/addneworder";
  };

  const handlecancelorder = () => {
    window.location.href = "/cashier/ordermain";
  };

  return (
    <div className="main bg-kblack bg-opacity-50 text-kwhite">
      <form className="lg:mt-12" onSubmit={handleSubmit}>
        <div className="mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
              <div className="text-center max-lg:hidden">
                <h2 className="text-3xl font-extrabold inline-block border-b-4 border-[#333] pb-1">
                  Checkout
                </h2>
              </div>

              {/*customer info section */}
              <div>
                <h2 className="text-3xl font-extrabold text-kwhite">
                  Customer info
                </h2>
                <div className="grid grid-cols-4 gap-6 mt-8 text-lg">
                  <h1 className="text-xl m-2">Customer Name :</h1>
                  <input
                    type="text"
                    placeholder="Name"
                    id="cusname"
                    name="cusname"
                    className="ring-1 bg-kgray col-span-3 py-3 rounded-md"
                    onChange={handleOnChange}
                    required
                  />
                  <h1 className="text-xl m-2">Telephone :</h1>
                  <input
                    type="tel"
                    placeholder="Telephone"
                    id="telephone"
                    name="telephone"
                    className="ring-1 bg-kgray col-span-3 py-3 rounded-md"
                    title="Please enter a 10-digit phone number"
                    pattern="[0-9]{10}"
                    onChange={handleOnChange}
                    required
                  />
                  <h1 className="text-xl m-2">Email Address :</h1>
                  <input
                    type="email"
                    placeholder="Email address"
                    id="email"
                    name="email"
                    pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                    title="Enter a valid email address (e.g., user@example.com)"
                    className="ring-1 bg-kgray col-span-3 py-3 rounded-md"
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-12">
                <div className="grid gap-6 mt-8">
                  <div className="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden"></div>
                </div>
                <br />
              </div>
              <h2 className="col-span-4 text-3xl font-extrabold text-kwhite">
                Creator info
              </h2>
              <br />
              <br />
              {/* creator info section */}
              <div className="grid grid-cols-4">
                <h1 className="col-span-1 text-xl m-2">Edit Cost:</h1>
                <input
                  type="tel"
                  placeholder="Edits"
                  id="Edits"
                  name="Edits"
                  className="col-span-3 bg-kgray ring-1 py-3 rounded-md"
                  onChange={handleOnChange}
                />
              </div>

              <div className="grid gap-2 mt-8">
                <div className="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden"></div>
              </div>
              <br />
            </div>
            <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 ring-kwhite ring-opacity-45">
              <div className="relative h-full">
                <div ref={componentPDF}>
                  <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                    <div className="grid grid-cols-3">
                      <h2 className="text-2xl font-extrabold col-span-2 text-center">
                        Order Summary
                      </h2>

                      <button
                        type="button"
                        className="min-w-[150px] px-6 py-3.5 text-lg bg-kred hover:bg-opacity-50 transition-transform rounded-full"
                        onClick={GoBack}
                      >
                        Add Item
                      </button>
                    </div>

                    <div className="m-1 rounded-lg bg-kblack text-kwhite">
                      <table className="m-5 text-lg justify-items-center">
                        <thead>
                          <tr className="bg-kwhite text-kblack">
                            <th className="w-1/4">Name</th>
                            <th className="w-1/4">Qty</th>
                            <th className="w-1/4">Unit Price</th>
                            <th className="w-1/4">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-kgray bg-opacity-30 rounded-lg text-xl text-center">
                          {dataList.map((el) => {
                            const total = calcTotal(el.quantity, el.unitPrice);

                            return (
                              <tr>
                                <td>{el.name}</td>
                                <td>{el.quantity}</td>
                                <td>{el.unitPrice}</td>
                                <td>{total}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-5 gap-4">
                      <h1 className="text-2xl">Gross Total :</h1>
                      <input
                        className="ring-1 col-span-2 ring-kwhite bg-kgray ring-opacity-10 px-6 py-2 rounded-xl"
                        type="number"
                        id="grosstotal"
                        name="grosstotal"
                        value={total}
                        readOnly
                      />
                      <h1 className="text-2xl">Discount :</h1>
                      <input
                        className="ring-1 col-span-2 ring-kwhite bg-kgray ring-opacity-10 px-6 py-2 rounded-xl"
                        type="number"
                        id="discount"
                        name="discount"
                        onChange={handleOnChange}
                      />
                      <h1 className="text-2xl">Net total :</h1>
                      <input
                        className="ring-1 col-span-2 ring-kwhite bg-kgray ring-opacity-10 px-6 py-2 rounded-xl"
                        type="number"
                        id="nettotal"
                        name="nettotal"
                        value={nettotal}
                        readOnly
                      />
                      <h1 className="text-2xl">Tendered :</h1>
                      <input
                        className="ring-1 col-span-2 ring-kwhite bg-kgray ring-opacity-10 px-6 py-2 rounded-xl"
                        type="number"
                        id="tendered"
                        name="tendered"
                        value={tendered}
                        onChange={handleOnChange}
                      />
                      <h1 className="text-2xl">Change :</h1>
                      <input
                        className="ring-1 col-span-2 ring-kwhite bg-kgray ring-opacity-10 px-6 py-2 rounded-xl"
                        type="number"
                        id="change"
                        name="change"
                        value={change}
                        readOnly
                      />

                      <Button
                        className="bg-kgreen text-kwhite text-2xl text-center col-span-3 hover:scale-105 transition-transform hover:bg-kwhite hover:text-kgreen disabled:bg-opacity-20"
                        type="submit"
                        onClick={() => setOrdertype("Completed")}
                      >
                        {"Confirm Payment"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
