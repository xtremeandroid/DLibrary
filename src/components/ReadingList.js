import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReadingList = ({
  Book_CIDs = [],
  openPDF,
  selected_CID,
  return_this_book,
  is_borrowed_Book,
}) => {
  console.log("PDF_LINK", `https://gateway.pinata.cloud/ipfs/${selected_CID}`);

  const handleOpenPDF = (pinata_CID) => {
    const pdfUrl = `https://gateway.pinata.cloud/ipfs/${pinata_CID}`;
    window.open(pdfUrl, "_blank"); // Open URL in a new tab
  };

  return (
    <div>
      <h2> Reading List</h2>
      {is_borrowed_Book?.map((Book_ID, index) => {
        const book_CID = Book_CIDs.find((book) => book.Book_ID === Book_ID);
        return (
          <div key={index}>
            <button onClick={() => handleOpenPDF(book_CID.pinata_CID)}>
              Open Book {Book_ID}
            </button>
            <button onClick={() => return_this_book(Book_ID)}>
              Return Book {Book_ID}
            </button>
          </div>
        );
      })}
      {selected_CID && (
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Document file={`https://gateway.pinata.cloud/ipfs/${selected_CID}`}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};
export default ReadingList;
