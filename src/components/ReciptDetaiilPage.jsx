import { FiDownload, FiArrowLeft } from "react-icons/fi";
import wwe from "../assets/wwe.png";
// import googleGemini from "./googleGemini.js";

const ReceiptDetailPage = () => {
  // Sample data - replace with actual props/data
  const receiptData = {
    imageUrl: "path/to/uploaded-image.jpg",
    extractedText: `MAATHA AGENCIES  
  H.No. 6-14/32, Sapthagiri Residency, Alwai, Secundarabad - 500 010. Cell : 08268277986  
  
  INVOICE  
  Deta 25 /3 /20  
  
  ---
  
  ### INVOICE
  
  #### M: Ranabad Cake Nag  
  
  ---
  
  ### Date
  | Date No. | PARTICULARS | QTY. | RATE | DISCOUNT | AMOUNT P.S. |
  |---|---|---|---|---|---|
  | 1    | Sao Single my Ok / Hot | 256   | U-ST |    | 1113.40 |
  | 2    | Ira Short Ebe / Shu | 150   | B-30 |    | 1305.40 |
  | 3    | Ira Borla Ch / Fus | 80   | B-30 |    | 676.00 |
  | 4    | Ira Tippur Buter | 90   | B-30 |    | 785.00 |
  | 5    | Sao Spacer Ch / Fus | 60   | B-30 |    | 1000.00 |
  | 6    | Ira Borlcep Ch / Fus | 120   | J3-01 |    | 756.00 |
  | 7    | Sao Sport Ch / Shu | 72   | 06-10 |    | 1879.20 |
  | 8    | Ira Spau Ch / Fus | 20   | 30-80 |    | 835.20 |
  
  ---
  
  ### TIN No:36234070746  
  **TOTAL**  
  **9222**
  
  ---
  
  ### Rupees:
  ---
  
  ### FORMCHECKBOX MAATHA AGENCIES`,
    details: {
      tinNumber: "36234070746",
      totalAmount: "9,222.00",
      date: "March 25, 2020",
      invoiceNumber: "Deta25/3/20",
      authorizedSignatory: "Maatha Agencies",
    },
  };

  //   console.log(googleGemini());
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button className="flex items-center text-blue-600 hover:text-blue-800">
            <FiArrowLeft className="mr-2" /> Back to History
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Receipt Details</h1>
          <div></div> {/* Spacer */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column - Original Bill */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Original Receipt</h2>
            <div className="border-2 border-gray-100 rounded-lg overflow-hidden">
              <img
                src={wwe}
                alt="Uploaded receipt"
                className="w-full h-auto object-contain max-h-96"
              />
            </div>
          </div>

          {/* Right Column - Extracted Text */}
          <div className="bg-white p-4 rounded-xl shadow-md max-h-[500px] overflow-y-auto">
            <div
              className="flex justify-between items-center mb-4 
            gap-10 bg-white w-[590px] h-[50px] z-10 "
            >
              <h2 className="text-lg font-semibold ">Extracted Text</h2>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FiDownload className="mr-2" /> Download Text
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-10">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {receiptData.extractedText}
              </pre>
            </div>
          </div>
        </div>

        {/* Bottom Section - Details */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">TIN Number</p>
              <p className="font-medium">{receiptData.details.tinNumber}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-medium">₹{receiptData.details.totalAmount}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Invoice Date</p>
              <p className="font-medium">{receiptData.details.date}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Invoice Number</p>
              <p className="font-medium">{receiptData.details.invoiceNumber}</p>
            </div>
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Authorized Signatory</p>
            <p className="font-medium">
              {receiptData.details.authorizedSignatory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailPage;
