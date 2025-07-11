import React, { useState } from "react";
import { jsPDF } from "jspdf";
import logo from './assets/image.png';


const App = () => {
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    linkedin: "",
    github: "",
    skills: "",
    education: "",
    objective: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("userData", JSON.stringify(formData));
    alert("Data saved to sessionStorage.");
  };


  const generatePDF = () => {

    const MARGIN = 55; 
    const PAGE_WIDTH = 595; 
    const PAGE_HEIGHT = 842;
    const LINE_HEIGHT = 16; 
    const TITLE_SIZE = 20;
    const BODY_SIZE = 11;
    const FOOTER_SIZE = 10;
  

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
  

    let y = MARGIN + 20;
  

    const addFooter = () => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(FOOTER_SIZE);
        doc.setTextColor(100);
        doc.text(
          'UserProfile - Assignment Give By Line Code',
          MARGIN,
          PAGE_HEIGHT - MARGIN + 15
        );
      }
    };
  
    const addNewPage = () => {
      doc.addPage();
      y = MARGIN;
    };
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(TITLE_SIZE);
    doc.text("User Profile", MARGIN, y);
    y += 30;
  

    const data = [
      { label: "Full Name", value: formData.fullName || "-" },
      { label: "Email", value: formData.email || "-" },
      { label: "Phone", value: formData.phone || "-" },
      { label: "Date of Birth", value: formData.dob || "-" },
      { label: "Address", value: formData.address || "-" },
      { label: "LinkedIn", value: formData.linkedin || "-" },
      { label: "GitHub", value: formData.github || "-" },
      { label: "Skills", value: formData.skills || "-" },
      { label: "Education", value: formData.education || "-" },
      { label: "Objective", value: formData.objective || "-" },
    ];
  

    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    const labelWidth = 100; 
  
    data.forEach(item => {

      const estimatedHeight = (item.value.split('\n').length * LINE_HEIGHT) + 20;
      if (y + estimatedHeight > PAGE_HEIGHT - MARGIN - 30) {
        addNewPage();
      }
  

      doc.setFont("helvetica", "bold");
      doc.text(item.label + ":", MARGIN, y + 4); 
  

      const valueX = MARGIN + labelWidth;
      const availableWidth = PAGE_WIDTH - MARGIN - valueX - 10;
  

      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(item.value, availableWidth);
      doc.text(splitText, valueX, y, { maxWidth: availableWidth });
  
      const textHeight = splitText.length * LINE_HEIGHT;
      y += Math.max(20, textHeight) + 10; 
    });
  

    addFooter();

    doc.save("user-profile.pdf");
  };


  const clearForm = () => {
    setFormData(initialState);
    sessionStorage.clear();
  };

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  return (
    
    <div className="min-h-screen bg-gray-50 sm:px-6 lg:px-8">
       <header className="logo bg-zinc-900 w-full px-10 py-4 rounded-2xl mt-2">
        <img src={logo} alt="Logo" className="h-7" />
        </header>
      <div className="max-w-4xl mx-auto mt-10">
       
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          <div className="px-6 py-5 bg-gradient-to-r from-zinc-800 to-blue-700">
            <h1 className="text-2xl font-bold text-white">User Profile Form</h1>
            <p className="mt-1 text-blue-100">Fill in your details below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-4">
                {[
                  { label: "Full Name", name: "fullName", type: "text", required: true },
                  { label: "Email Address", name: "email", type: "email", required: true },
                  { label: "Phone Number", name: "phone", type: "tel" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "LinkedIn Profile", name: "linkedin", type: "url" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                ))}
              </div>


              <div className="space-y-4">
                {[
                  { label: "GitHub Profile", name: "github", type: "url" },
                  { label: "Skills (comma-separated)", name: "skills", type: "text" },
                  { label: "Educational Details", name: "education", type: "textarea" },
                  { label: "Career Objective", name: "objective", type: "textarea" },
                  { label: "Address", name: "address", type: "textarea" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        rows={field.name === 'address' ? 2 : 3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>


            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="button"
                onClick={generatePDF}
                className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Generate PDF
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
