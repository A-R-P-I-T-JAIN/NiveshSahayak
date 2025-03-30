import React, { useState } from "react";

const B2BLoan = () => {
  const [userType, setUserType] = useState("borrower");
  const [loanRequest, setLoanRequest] = useState({
    amount: "",
    purpose: "",
    repaymentPeriod: "6",
  });

  const [loanOffer, setLoanOffer] = useState({
    offerAmount: "",
    profitPercentage: "",
    terms: "",
  });

  const [submittedRequest, setSubmittedRequest] = useState([]);
  const [submittedOffer, setSubmittedOffer] = useState(null);
  const [errors, setErrors] = useState({});

  const validateRequest = () => {
    const newErrors = {};
    if (!loanRequest.amount || loanRequest.amount < 10000) {
      newErrors.amount = "Minimum loan amount ₹10,000";
    }
    if (!loanRequest.purpose) {
      newErrors.purpose = "Purpose is required";
    }
    return newErrors;
  };

  const validateOffer = () => {
    const newErrors = {};
    if (!loanOffer.offerAmount || loanOffer.offerAmount < 50000) {
      newErrors.offerAmount = "Minimum investment ₹50,000";
    }
    if (
      !loanOffer.profitPercentage ||
      loanOffer.profitPercentage < 1 ||
      loanOffer.profitPercentage > 30
    ) {
      newErrors.profitPercentage = "Profit share must be between 1-30%";
    }
    return newErrors;
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRequest();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedRequest(loanRequest);
      setLoanRequest({ amount: "", purpose: "", repaymentPeriod: "6" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateOffer();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedOffer(loanOffer);
      setLoanOffer({ offerAmount: "", profitPercentage: "", terms: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setUserType("borrower")}
          className={`px-6 py-3 rounded-lg font-medium ${
            userType === "borrower"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Borrower
        </button>
        <button
          onClick={() => setUserType("lender")}
          className={`px-6 py-3 rounded-lg font-medium ${
            userType === "lender"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Investor
        </button>
      </div>

      {userType === "borrower" ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Loan Request Form</h2>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanRequest.amount}
                onChange={(e) =>
                  setLoanRequest({ ...loanRequest, amount: e.target.value })
                }
                className={`w-full p-2 border rounded-lg ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. 50000"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Purpose of Loan
              </label>
              <textarea
                value={loanRequest.purpose}
                onChange={(e) =>
                  setLoanRequest({ ...loanRequest, purpose: e.target.value })
                }
                className={`w-full p-2 border rounded-lg ${
                  errors.purpose ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Business expansion, inventory purchase..."
                rows="3"
              />
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Repayment Period (Months)
              </label>
              <select
                value={loanRequest.repaymentPeriod}
                onChange={(e) =>
                  setLoanRequest({
                    ...loanRequest,
                    repaymentPeriod: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="18">18 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Request
            </button>
          </form>

          {submittedRequest && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">
                Request Submitted!
              </h3>
              <p>Amount: ₹{submittedRequest.amount}</p>
              <p>Purpose: {submittedRequest.purpose}</p>
              <p>Repayment Period: {submittedRequest.repaymentPeriod} Months</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Investment Offer Form</h2>
          <form onSubmit={handleOfferSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Investment Amount (₹)
              </label>
              <input
                type="number"
                value={loanOffer.offerAmount}
                onChange={(e) =>
                  setLoanOffer({ ...loanOffer, offerAmount: e.target.value })
                }
                className={`w-full p-2 border rounded-lg ${
                  errors.offerAmount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. 100000"
              />
              {errors.offerAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.offerAmount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Expected Profit Share (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={loanOffer.profitPercentage}
                  onChange={(e) =>
                    setLoanOffer({
                      ...loanOffer,
                      profitPercentage: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg pr-12 ${
                    errors.profitPercentage
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="5"
                  step="0.5"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
              {errors.profitPercentage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profitPercentage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Terms
              </label>
              <textarea
                value={loanOffer.terms}
                onChange={(e) =>
                  setLoanOffer({ ...loanOffer, terms: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Monthly reporting requirements, collateral terms..."
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Submit Offer
            </button>
          </form>

          {submittedOffer && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">
                Offer Submitted!
              </h3>
              <p>Amount: ₹{submittedOffer.offerAmount}</p>
              <p>Profit Share: {submittedOffer.profitPercentage}%</p>
              <p>Terms: {submittedOffer.terms || "None specified"}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">How it Works:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-indigo-100">
            <h4 className="font-medium mb-2">For Borrowers</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Submit your loan requirements</li>
              <li>Get matched with verified investors</li>
              <li>Negotiate terms directly</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h4 className="font-medium mb-2">For Investors</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Set your profit percentage</li>
              <li>Review borrower proposals</li>
              <li>Secure contract execution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BLoan;
