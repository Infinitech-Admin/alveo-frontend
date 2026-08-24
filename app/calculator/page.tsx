"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { jsPDF } from "jspdf";

interface Option {
  key: number;
  value: string;
  label: string;
}

interface Results {
  totalLoan: string;
  monthlyPayment: string;
  totalAmount: string;
}

const LoanCalculator: React.FC = () => {
  const years: Option[] = Array.from({ length: 25 }, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
    label: `${i + 1} Year${i + 1 > 1 ? "s" : ""}`,
  }));

  const months: Option[] = Array.from({ length: 11 }, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
    label: `${i + 1} Month${i + 1 > 1 ? "s" : ""}`,
  }));

  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [selectedYears, setSelectedYears] = useState<number>(0);
  const [selectedMonths, setSelectedMonths] = useState<number>(0);
  const [results, setResults] = useState<Results>({
    totalLoan: "0.00",
    monthlyPayment: "0.00",
    totalAmount: "0.00",
  });
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  useEffect(() => {
    calculate();
  }, [loanAmount, interestRate, selectedYears, selectedMonths]);

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 || 0;
    const termInMonths = selectedYears * 12 + selectedMonths;

    if (principal > 0 && rate >= 0 && termInMonths > 0) {
      const monthlyRate = rate / 12;
      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termInMonths));
      const totalLoan = monthlyPayment * termInMonths;

      setResults({
        totalLoan: totalLoan.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        monthlyPayment: monthlyPayment.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        totalAmount: (principal + totalLoan - principal).toLocaleString(
          undefined,
          { minimumFractionDigits: 2, maximumFractionDigits: 2 },
        ),
      });
    } else {
      setResults({
        totalLoan: "0.00",
        monthlyPayment: "0.00",
        totalAmount: "0.00",
      });
    }
  };

  // Fetches a public asset and converts it to a base64 data URL for jsPDF
  const getImageBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load logo: ${response.status}`);
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const downloadTableAsPDF = async () => {
    try {
      setIsGeneratingPDF(true);

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Add Logo (fetched from public folder)
      const logoURL = await getImageBase64("/icon-144x144.png");
      const logoWidth = 20;
      const logoHeight = 20;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 5;
      doc.addImage(logoURL, "PNG", logoX, logoY, logoWidth, logoHeight);

      // Document Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      const title = "by: Ella Carmela Sarmiento";
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pageWidth - titleWidth) / 2, 30);

      // Address (Centered)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const address =
        "ALVEO Land Corporate Center, 1321 Apolinario Street, Bangkal, Makati City, Metro Manila, PH 1233";
      doc.text(address, pageWidth / 2, 34, { align: "center" });

      const phone = "Phone Number: (+63)9175-4809-99";
      doc.text(phone, pageWidth / 2, 38, { align: "center" });

      const email = "Email: elladmcihomes.ph@gmail.com";
      doc.text(email, pageWidth / 2, 42, { align: "center" });

      // Subtitle (Centered)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const subtitle = "Loan Calculation Results";
      doc.text(subtitle, pageWidth / 2, 50, { align: "center" });

      // Draw Header Line
      doc.line(20, 52, 190, 52);

      // Table Headers
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("LOAN DETAILS", 24, 58);
      doc.text("VALUE", 130, 58);

      // Draw Header Line
      doc.line(20, 62, 190, 62);

      // Format Years and Months
      const formattedYears =
        selectedYears === 1 ? "1 year" : `${selectedYears || 0} years`;
      const formattedMonths =
        selectedMonths === 1 ? "1 month" : `${selectedMonths || 0} months`;

      // Table Rows Data
      const rows = [
        ["Years", formattedYears],
        ["Months", formattedMonths],
        [
          "Loan Amount",
          `PHP ${parseFloat(loanAmount || "0").toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`,
        ],
        [
          "Interest Rate",
          `${parseFloat(interestRate || "0").toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}%`,
        ],
        [
          "Total Loan Amount (w/ interest)",
          "PHP " + (results.totalLoan || "0"),
        ],
        ["Monthly Payment", "PHP " + (results.monthlyPayment || "0")],
        ["Total Amount", "PHP " + (results.totalAmount || "0")],
      ];

      // Table Content
      let yPosition = 72;
      rows.forEach((row) => {
        doc.text(row[0], 24, yPosition);
        doc.text(row[1], 130, yPosition, { align: "left" });
        doc.line(20, yPosition + 2, 190, yPosition + 2); // Draw line after each row
        yPosition += 10;
      });

      // Draw Table Borders
      const startY = 52;
      const endY = yPosition - 8;
      doc.line(20, startY, 20, endY); // Left border
      doc.line(120, startY, 120, endY); // Divider between columns
      doc.line(190, startY, 190, endY); // Right border

      // Save the PDF
      doc.save("loan_calculation_results.pdf");

      // Success handler
      setDownloadSuccess(true);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="mx-auto flex-grow px-4 xl:px-24 w-full flex flex-col gap-4">
      <Card>
        <CardBody>
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <Select
              className="w-full md:max-w-xs"
              label="Select Years"
              size={"sm"}
              onChange={(e) => setSelectedYears(Number(e.target.value))}
            >
              {years.map((year) => (
                <SelectItem key={year.key} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              className="w-full md:max-w-xs"
              label="Select Months"
              size={"sm"}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
            >
              {months.map((month) => (
                <SelectItem key={month.key} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Enter Loan Amount (00.00)"
              size="sm"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <Input
              label="Enter Interest (%)"
              size="sm"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </CardBody>
      </Card>

      <Table aria-label="Loan Calculation Results">
        <TableHeader>
          <TableColumn>LOAN DETAILS</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Selected Years</TableCell>
            <TableCell>
              {selectedYears} Year{selectedYears > 1 ? "s" : ""}
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Selected Months</TableCell>
            <TableCell>
              {selectedMonths} Month{selectedMonths > 1 ? "s" : ""}
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Loan Amount</TableCell>
            <TableCell>
              ₱{" "}
              {parseFloat(loanAmount || "0").toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Interest Rate</TableCell>
            <TableCell>
              {parseFloat(interestRate || "0").toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
              %
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Total Loan Amount (w/ interest)</TableCell>
            <TableCell>₱ {results.totalLoan}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Monthly Payment</TableCell>
            <TableCell>₱ {results.monthlyPayment}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Total Amount</TableCell>
            <TableCell>₱ {results.totalAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p className="text-sm text-default-500">
        * Please note that the results provided by this calculator are estimates
        and may vary. The final loan amount, interest rates, and monthly
        payments will be determined by the bank upon approval.
      </p>

      <Button
        color="primary"
        onPress={downloadTableAsPDF}
        isLoading={isGeneratingPDF}
      >
        {isGeneratingPDF ? "Generating..." : "Download Results"}
      </Button>
    </div>
  );
};

export default LoanCalculator;
